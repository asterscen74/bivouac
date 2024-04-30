import { createSlice } from "@reduxjs/toolkit";

export const infos = createSlice({
    name: "infos",
    initialState: {
        fr: {
            "elements": [
                {
                    "name": "date",
                    "type": "text",
                    "title": "Date du bivouac",
                    "inputType": "date",
                    "defaultValueExpression": "currentDate()",
                    "isRequired": true
                },
                {
                    "name": "nb_tents",
                    "type": "text",
                    "title": "Nombre de tentes",
                    "maxLength": 25,
                    "inputType": "number",
                    "min": 0,
                    "max": 100,
                    "defaultValue": 0,
                    "isRequired": true
                },
                {
                    "name": "nb_people",
                    "type": "text",
                    "title": "Nombre de personnes",
                    "maxLength": 25,
                    "inputType": "number",
                    "min": 1,
                    "max": 100,
                    "defaultValue": 1,
                    "isRequired": true
                },
                {
                    "name": "email",
                    "type": "text",
                    "title": "E-mail du déclarant",
                    "inputType": "email",
                    "placeholder": "foobar@example.com",
                    "isRequired": true,
                    "autocomplete": "email"
                },
                {
                    "name": "fr_or_foreign",
                    "type": "dropdown",
                    "title": "France ou étranger",
                    "maxLength": 25,
                    "isRequired": true,
                    "choices": [ "France", "Étranger" ]
                },
                {
                    "name": "department",
                    "type": "dropdown",
                    "title": "Département de résidence",
                    "maxLength": 25,
                    "isRequired": true,
                    "choicesByUrl": {
                      "url": "https://geo.api.gouv.fr/departements",
                      "valueName": "nom"
                    },
                    "visibleIf": "{fr_or_foreign} = France",
                },
                {
                    "name": "itinerance",
                    "type": "boolean",
                    "title": "Option en itinérance",
                    "maxLength": 25,
                    "isRequired": true,
                    "valueTrue": "Yes",
                    "valueFalse": "No"
                }
            ],
            "showQuestionNumbers": false
        }
    }
});

export default infos.reducer;
