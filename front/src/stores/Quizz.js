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
                            "title": "Bivouaquer c’est planter ma tente…",
                            "choices": [
                                "toute une semaine.",
                                "une seule nuit, sur un même emplacement, entre 19h et 9h.",
                                "toute la journée pour faire la sieste."
                            ],
                            "isRequired": true,
                            "correctAnswer": "une seule nuit, sur un même emplacement, entre 19h et 9h.",
                            "infos": "Le camping est interdit dans les réserves naturelles. Seul le bivouac est toléré pour une seule nuit, sur un même emplacement, avec ou sans abri, entre 19h et 9h."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "bruits",
                            "title": "Lors de ma soirée en extérieur, je peux…",
                            "choices": [
                                "organiser un karaoké géant.",
                                "écouter les bruits de la nature.",
                                "écouter ma musique sur une enceinte."
                            ],
                            "isRequired": true,
                            "correctAnswer": "écouter les bruits de la nature.",
                            "infos": "L'utilisation d'instrument sonore et de drones est formellement interdite dans les réserves naturelles pour la quiétude de la faune et de vos voisins bivouaqueurs. Ta belle chanson est entendue par tous les chamois du coin ! Ce bruit augmente leur stress et modifie leur comportement. Respectons l'espace de vie des espèces sauvages."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "feu",
                            "title": "Je peux faire du feu...",
                            "choices": [
                                "quand « Allumez le feu » est ma chanson préférée.",
                                "avec du bois mort pour ne pas manger mes saucisses crues.",
                                "jamais, je peux uniquement utiliser un réchaud."
                            ],
                            "isRequired": true,
                            "correctAnswer": "jamais, je peux uniquement utiliser un réchaud.",
                            "infos": "Pour limiter le risque incendie, les détériorations de la flore et le dérangement de la faune, il est interdit de faire du feu. Seul les réchauds sont tolérés."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "eau",
                            "title": "A proximité d'un lac ou d'un cours d'eau, je peux...",
                            "choices": [
                                "pêcher à la dynamite.",
                                "nettoyer les Tupperware que je ne rendrai jamais à ma mère.",
                                "le contempler et ne pas me baigner."
                            ],
                            "isRequired": true,
                            "correctAnswer": "le contempler et ne pas me baigner.",
                            "infos": "Les lacs d'altitude sont des écosystèmes sensibles aux apports extérieurs (crème solaire, dentifrice...)mis en péril lorsque l’eau est troublée par des actions humaines, nuisant à l’oxygénation nécessaire à leur survie. . Ne rien y tremper, c'est les préserver ! Quant à la pêche, un permis de pêche est obligatoire (on parle bien de pêche avec une canne, reposez ce bâton de dynamite…)."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "dechets",
                            "title": "Pour mes déchets, je peux…",
                            "choices": [
                                "les remporter avec moi, y compris le papier toilette et les trognons de pommes.",
                                "les cacher sous un caillou, ni vu, ni connu !",
                                "les arroser d’essence et les brûler."
                            ],
                            "isRequired": true,
                            "correctAnswer": "les remporter avec moi, y compris le papier toilette et les trognons de pommes.",
                            "infos": "En montagne, la décomposition des déchets est très lente. Pour éviter à la faune de se nourrir d'aliments inhabituels qui les fragilisent, remportons tous nos déchets, y compris le papier toilette et les trognons de pomme et votre fameux taboulé aux choux de Bruxelles et gencives de porc. Enfin, brûler son papier toilette est une très mauvaise idée car cela crée des départs d’incendie plus vite que vous ne le croyez."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "drones",
                            "title": "Je peux utiliser mon drone pour…",
                            "choices": [
                                "espionner les autres bivouaqueurs.",
                                "pousser des marmottes au suicide.",
                                "rien. Je ne peux pas utiliser mon drone."
                            ],
                            "isRequired": true,
                            "correctAnswer": "rien. Je ne peux pas utiliser mon drone.",
                            "infos": "Les drones sont un dérangement majeur pour la faune et une source de stress pour tous les animaux, qui les identifient à des prédateurs aériens. En respectant l’interdiction de l’usage de drones dans les réserves naturelles, vous agissez pour préserver un écrin de nature fragile."
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
                            "title": "Bivouac is…",
                            "choices": [
                                "All the week",
                                "One night only,same area, between 7pm and 9am",
                                "All day long for my nap"
                            ],
                            "isRequired": true,
                            "correctAnswer": "One night only,same area, between 7pm and 9am",
                            "infos": "Camping is forbidden in nature reserves. You may only pitch your tent for one night between 7pm and 9 am."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "bruits",
                            "title": "During my outdoor evening, I can…",
                            "choices": [
                                "organize a giant karaoke.",
                                "listen to the sounds of nature.",
                                "listen to music on my speaker."
                            ],
                            "isRequired": true,
                            "correctAnswer": "listen to the sounds of nature.",
                            "infos": "The use of any type of sonorous device and drone is forbidden within the nature reserves for the quietness of wildlife and your fellow bivouackers. Imagine if a neighbor came to sing every night in your living room... Well, it's the same for the ibex! Your noise increases their stress and changes their behavior. Let's respect the living space of wild species."
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
                                "when -Light My Fire- is my favorite song.",
                                "never, I can only use a stove.",
                                "with dead wood so I don't eat my sausages raw."
                            ],
                            "isRequired": true,
                            "correctAnswer": "never, I can only use a stove.",
                            "infos": "To limit starting a wildfire, damaging flora and disturbing wildlife, it is forbidden to light a fire. Stoves are tolerated."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "eau",
                            "title": "Near a lake or a stream, I can…",
                            "choices": [
                                "fish with dynamite.",
                                "look at it without taking a dip.",
                                "fish with dynamite."
                            ],
                            "isRequired": true,
                            "correctAnswer": "look at it without taking a dip.",
                            "infos": "Altitude lakes are sensitive ecosystems that can't absorb external inputs (such as sunscreen, toothpaste,...). Do not dip anything into it, to help keep them safe! Fishing requires a local licence."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "dechets",
                            "title": "For my waste, I can…",
                            "choices": [
                                "I take all my litter down with me, including toilet paper.",
                                "hide them under a pebble, just like that!",
                                "Douse it in gasoline and burn it."
                            ],
                            "isRequired": true,
                            "correctAnswer": "I take all my litter down with me, including toilet paper.",
                            "infos": "Up high, waste decays very slowly. To prevent animals feeding on unsuitable food, take all your trash back down with you. That includes toilet paper and leftover food.Lastly, burning your toilet paper is a very bad idea as it can start fires faster than you might think. "
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "drones",
                            "title": "I can use my drone to…",
                            "choices": [
                                "spy on other campers.",
                                "drive marmots to suicide.",
                                "nothing. I cannot use my drone."
                            ],
                            "isRequired": true,
                            "correctAnswer": "nothing. I cannot use my drone.",
                            "infos": "Drones are a major disturbance for wildlife and a huge source of stress for all animals, which identify them as aerial predators. The same goes for birds, which, in trying to protect their nests, can get injured or leave their young unattended for too long. By respecting the ban on drone use in nature reserves, you are helping to preserve a fragile and already endangered environment."
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
                                "Con legno morto per non mangiare le mie salsicce crude",
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
                                "Porto con me tutta la mia spazzatura, compresa la carta igienica",
                                "nascondeteli sotto un sasso, così!",
                                "Posso lasciare i miei rifiuti biodegradabili"
                            ],
                            "isRequired": true,
                            "correctAnswer": "Porto con me tutta la mia spazzatura, compresa la carta igienica",
                            "infos": "In alto i rifiuti si decompongono molto lentamente. Per evitare che gli animali si nutrano di cibo inadatto, portate giù tutti i rifiuti. Questo include la carta igienica e gli avanzi di cibo."
                        }
                    ]
                },
                {
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "drones",
                            "title": "Posso usare il mio drone per...",
                            "choices": [
                                "spiare gli altri campeggiatori.",
                                "spingere le marmotte al suicidio.",
                                "niente. Non posso usare il mio drone."
                            ],
                            "isRequired": true,
                            "correctAnswer": "niente. Non posso usare il mio drone.",
                            "infos": "I droni sono un grande disturbo per la fauna selvatica e un'enorme fonte di stress per tutti gli animali, che li identificano come predatori aerei. Lo stesso vale per gli uccelli che, nel tentativo di proteggere i loro nidi, possono ferirsi o lasciare i loro piccoli incustoditi per troppo tempo. Rispettando il divieto di utilizzo dei droni nelle riserve naturali, si contribuisce a preservare un ambiente fragile e già in pericolo."
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
