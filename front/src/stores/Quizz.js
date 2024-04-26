import { createSlice } from "@reduxjs/toolkit";

export const quizz = createSlice({
    name: "quizz",
    initialState: {
        fr: {
            "title": "Le quiz des bonnes pratiques",
            "showProgressBar": "bottom",
            "startSurveyText": "Commencer le quiz",
            "pages": [
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "horaires",
                            "title": "Pour bivouaquer, je peux installer une tente légère",
                            "choices": [
                                "De 19h à 9h",
                                "Pendant plusieurs jours",
                                "Toute la journée"
                            ],
                            "isRequired": true,
                            "correctAnswer": "De 19h à 9h",
                            "infos": "Le camping est interdit dans les réserves naturelles. Seul le bivouac est toléré pour une seule nuit, avec ou sans abri, entre 19h et 9h."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "bruits",
                            "title": "Ma soirée dehors s'accompagne :",
                            "choices": [
                                "De musique sur mon enceinte portable",
                                "Des bruits de la nature",
                                "D'un instrument de musique"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Des bruits de la nature",
                            "infos": "L'utilisation d'instrument sonore est formellement interdite dans les réserves naturelles pour la quiétude de la faune et de vos voisins bivouaqueurs. Ta belle chanson est entendue par tous les chamois du coin ! Ce bruit augmente leur stress et modifie leur comportement. Respectons l'espace de vie des espèces sauvages."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "feu",
                            "title": "Je peux faire du feu",
                            "choices": [
                                "Pour me réchauffer",
                                "Pour manger un repas chaud",
                                "Jamais, je peux uniquement utiliser un réchaud"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Jamais, je peux uniquement utiliser un réchaud",
                            "infos": "Pour limiter le risque incendie, les détériorations de la flore et le dérangement de la faune, il est interdit de faire du feu. Seul les réchauds sont tolérés."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "eau",
                            "title": "A proximité d'un lac ou d'un cours d'eau, je peux :",
                            "choices": [
                                "Faire ma vaisselle ou ma toilette dans le lac",
                                "Le contempler et ne pas me baigner",
                                "Pêcher sans permis"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Le contempler et ne pas me baigner",
                            "infos": "Les lacs d'altitude sont des écosystèmes sensibles aux apports extérieurs (crème solaire, dentifrice...). Ne rien y tremper, c'est les préserver ! Pour pêcher, un permis de pêche est obligatoire."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "dechets",
                            "title": "Que faire de mes déchets ?",
                            "choices": [
                                "Je remporte mon papier toilette et tous mes déchets avec moi",
                                "Je peux laisser le papier toilette sous un caillou",
                                "Je laisse les déchets biodégradables"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Je remporte mon papier toilette et tous mes déchets avec moi",
                            "infos": "En montagne, la décomposition des déchets est très lente. Pour éviter à la faune de se nourrir d'aliments inhabituels qui les fragilisent, remportons tous nos déchets, y compris le papier toilette et les trognons de pomme !"
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "text",
                            "name": "Une remarque sur notre outil ?"
                        }
                    ]
                }
            ],
            "completedHtml": "<h4>Vous avez <b>{correctAnswers}</b> sur <b>{questionCount}</b> bonnes réponses.</h4>",
            "completedHtmlOnCondition": [
                {
                    "expression": "{correctAnswers} == 0",
                    "html": "<h4>Malheureusement, aucune de vos réponses n'est correcte. Merci de réessayer.</h4>"
                },
                {
                    "expression": "{correctAnswers} == {questionCount}",
                    "html": "<h4>Bravo! Vous avez répondu correctement à toutes les questions !</h4>"
                }
            ]
        },
        en: {
            "title": "Quiz to strengthen your knowledge of best practices",
            "showProgressBar": "bottom",
            "startSurveyText": "Start the quiz",
            "pages": [
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "horaires",
                            "title": "To bivy, I may pitch a light shelter",
                            "choices": [
                                "From 7pm to 9am",
                                "For multiple days in a row",
                                "For the whole day"
                            ],
                            "isRequired": true,
                            "correctAnswer": "From 7pm to 9am",
                            "infos": "Camping is forbidden in nature reserves. You may only pitch your tent for one night between 7pm and 9 am."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "bruits",
                            "title": "My evening outdoor is lulled by :",
                            "choices": [
                                "Music coming out of my portable speakerdes",
                                "The sounds of nature",
                                "A music instrument"
                            ],
                            "isRequired": true,
                            "correctAnswer": "The sounds of nature",
                            "infos": "The use of any type of sonorous device is forbidden within the nature reserves for the quietness of wildlife. Noise increases stress level and influences its behaviour. In order to respect their living area, keep quiet !"
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "feu",
                            "title": "I may light a fire :",
                            "choices": [
                                "To warm up",
                                "To eat a warm meal",
                                "Never, I may nevertheless use a stove to cook my food"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Never, I may nevertheless use a stove to cook my food",
                            "infos": "To limit starting a wildfire, damaging flora and disturbing wildlife, it is forbidden to light a fire. Stoves are tolerated."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "eau",
                            "title": "Close to a lake or a stream, I may :",
                            "choices": [
                                "Wash my dishes and/or myself",
                                "Look at it without taking a dip",
                                "Fish without a licence"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Look at it without taking a dip",
                            "infos": "Altitude lakes are sensitive ecosystems that can't absorb external inputs (such as sunscreen, toothpaste,...). Do not dip anything into it, to help keep them safe! Fishing requires a local licence."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "dechets",
                            "title": "What to do with my trash ?",
                            "choices": [
                                "I take all my litter down with me, including toilet paper",
                                "I can leave my toilet paper under a rock",
                                "I can leave my biodegradable waste"
                            ],
                            "isRequired": true,
                            "correctAnswer": "I take all my litter down with me, including toilet paper",
                            "infos": "Up high, waste decays very slowly. To prevent animals feeding on unsuitable food, take all your trash back down with you. That includes toilet paper and leftover food."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "text",
                            "name": "Do you have a comment on that survey ?"
                        }
                    ]
                }
            ],
            "completedHtml": "<h4>You answered <b>{correctAnswers}</b> over <b>{questionCount}</b> good answers.</h4>",
            "completedHtmlOnCondition": [
                {
                    "expression": "{correctAnswers} == 0",
                    "html": "<h4>Unfortunately, none of your answers is correct. Please try again.</h4>"
                },
                {
                    "expression": "{correctAnswers} == {questionCount}",
                    "html": "<h4>Great! You answered correctly on all questions !</h4>"
                }
            ]
        }
    }
});

export default quizz.reducer;
