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
        },
        it: {
            "title": "Quiz per rafforzare la conoscenza delle migliori pratiche",
            "showProgressBar": "bottom",
            "startSurveyText": "Iniziare il quiz",
            "pages": [
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "horaires",
                            "title": "Per bivaccare, posso montare un leggero riparo",
                            "choices": [
                                "Dalle 19.00 alle 9.00",
                                "Per più giorni di seguito",
                                "Per tutto il giorno"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Dalle 19.00 alle 9.00",
                            "infos": "Il campeggio è vietato nelle riserve naturali. È possibile piantare la tenda per una sola notte tra le 19.00 e le 9.00 del mattino."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "bruits",
                            "title": "La mia serata all'aperto è cullata da :",
                            "choices": [
                                "Musica in uscita dai miei altoparlanti portatili",
                                "I suoni della natura",
                                "Uno strumento musicale"
                            ],
                            "isRequired": true,
                            "correctAnswer": "I suoni della natura",
                            "infos": "L'uso di qualsiasi tipo di dispositivo sonoro è vietato all'interno delle riserve naturali per la tranquillità della fauna selvatica. Il rumore aumenta il livello di stress e influenza il suo comportamento. Per rispettare il loro spazio vitale, fate silenzio!"
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "feu",
                            "title": "Potrei accendere un fuoco:",
                            "choices": [
                                "Per riscaldarsi",
                                "Mangiare un pasto caldo",
                                "Mai, ma posso comunque usare un fornello per cucinare i miei cibi."
                            ],
                            "isRequired": true,
                            "correctAnswer": "Mai, ma posso comunque usare un fornello per cucinare i miei cibi.",
                            "infos": "Per limitare l'innesco di incendi, il danneggiamento della flora e il disturbo della fauna selvatica, è vietato accendere il fuoco. I fornelli sono tollerati."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "eau",
                            "title": "Vicino a un lago o a un ruscello, potrei :",
                            "choices": [
                                "Lavare i piatti e/o me stesso",
                                "Guardare senza immergersi",
                                "Pescare senza licenza"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Guardare senza immergersi",
                            "infos": "I laghi d'altitudine sono ecosistemi sensibili che non possono assorbire input esterni (come creme solari, dentifrici,...). Non immergetevi nulla, per contribuire alla loro sicurezza! Per la pesca è necessaria una licenza locale."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "dechets",
                            "title": "Cosa fare con i miei rifiuti?",
                            "choices": [
                                "",
                                "Posso lasciare la mia carta igienica sotto una roccia",
                                "Posso lasciare i miei rifiuti biodegradabili"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Porto con me tutta la mia spazzatura, compresa la carta igienica.",
                            "infos": "In alto i rifiuti si decompongono molto lentamente. Per evitare che gli animali si nutrano di cibo inadatto, portate giù tutti i rifiuti. Questo include la carta igienica e gli avanzi di cibo."
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
