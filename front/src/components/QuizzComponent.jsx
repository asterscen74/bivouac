import { Model } from "survey-core";
import "survey-core/i18n/french";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import * as SurveyTheme from "survey-core/themes";
import "../styles/QuizzComponent.css";
import store from "../store";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateResults } from "../stores/Results";

export default function QuizzComponent() {
    let infos = "";
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    let quizzData = store.getState().quizz[i18n.resolvedLanguage];

    const survey = new Model(quizzData);
    survey.locale = i18n.resolvedLanguage;
    survey.applyTheme(SurveyTheme.FlatLightPanelless);
    const correctStr = "Correct";
    const incorrectStr = "Incorrect";

    // Save results until reservation is confirmed
    function saveSurveyData (survey) {
        const data = survey.data;
        dispatch(
            updateResults({
                part: "quizz",
                data: data,
            })
        );
    }
    survey.onValueChanged.add(saveSurveyData);

    // Restore survey results
    const prevData = store.getState().results.quizz;
    if (Object.keys(prevData).length > 0) {
        survey.data = prevData;
    }

    // Builds an HTML string to display in a question title
    function getTextHtml (text, str, isCorrect) {
        if (text.indexOf(str) < 0)
            return undefined;

        return text.substring(0, text.indexOf(str)) +
            "<span class='" +  (isCorrect ? "correctAnswer" : "incorrectAnswer" ) + "'>" +
                str +
            "</span>" +"<div class='infos'>" + infos + "</div>"
            ;
    }

    // Adds "Correct" or "Incorrect" to a question title
    function changeTitle (q) {
        if (!q) return;

        if(q.jsonObj.infos !== undefined) {
            infos = q.jsonObj.infos;
        }
        const isCorrect = q.isAnswerCorrect();
        if (!q.prevTitle) {
            q.prevTitle = q.title;
        }
        if (isCorrect === undefined) {
            q.title = q.prevTitle;
        }

        // Don't display for the last question
        if (q.title !== t("Last question quiz")) {
            q.title =  q.prevTitle + ' ' + (isCorrect ? correctStr : incorrectStr);
        }
    }

    survey.onValueChanged.add((_, options) => {
        // Change the question title when the question value is changed
        changeTitle(options.question);
    });

    // Prevent going to the next question until the correct answer has been ticked
    survey.onCurrentPageChanging.add(function(survey, options) {
        const currentPage = survey.currentPage;
        const currentQuestion = currentPage.questions[0];
        if (options.isGoingBackward === false && currentQuestion.value !== currentQuestion.correctAnswer) {
            options.allow = false;
            currentQuestion.addError(t("Select the correct answer"));
        } else {
            currentQuestion.clearErrors();
        }
    });

    survey.onTextMarkdown.add((_, options) => {
        const text = options.text;
        let html = getTextHtml(text, correctStr, true);
        if (!html) {
            html = getTextHtml(text, incorrectStr, false);
        }
        if (html) {
            // Set an HTML string with the "Correct" or "Incorrect" suffix for display
            options.html = html;
        }
    });
    return (<Survey model={survey} />);
}
