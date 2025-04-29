import { createSlice } from "@reduxjs/toolkit";

export const GoodPractices = createSlice({
    name: "GoodPractices",
    initialState: {
        fr: `
        <p><i>Les bonnes pratiques à adopter pour bivouaquer</i></p>
        <p><strong>Règle n°1 – Respect des sentiers et des lieux -</strong> Je préserve la végétation fragile et évite l’érosion des sols en restant sur le sentier principal sans modifier l’environnement. Je ne serai pas le seul.e à fréquenter les sentiers cet été. Si je poursuis mon itinéraire après une nuit de bivouac, je laisse le lieu propre pour que tout le monde puisse en profiter.</p>
        <p><strong>Règle n°2 - Horaires -</strong> Le camping est interdit dans les réserves naturelles. Seul le bivouac est toléré pour une seule nuit, avec ou sans abri, entre 19h et 9h.</p>
        <p><strong>Règle n°3 - Bruit -</strong> Je respecte la quiétude de la faune sauvage et de mes voisins bivouaqueurs ! Le bruit augmente le stress et modifie le comportement de la faune. Alors je respecte l’espace de vie des animaux qui m’entourent !</p>
        <p><strong>Règle n°4 - Feu -</strong> Pour limiter le risque incendie, les atteintes à la flore et le dérangement de la faune, il est interdit de faire du feu. Seuls les réchauds sont tolérés.</p>
        <p><strong>Règle n°5 - Point d’eau -</strong> Les lacs d'altitude sont des écosystèmes sensibles aux apports extérieurs (crème solaire, dentifrice...). Ne rien y tremper, c'est les préserver !</p>
        <p><strong>Règle n°6 - Déchets et toilettes sauvages -</strong> En montagne, la décomposition des déchets est très lente. Pour éviter la présence de déchets et le risque d’ingestion d'aliments inadaptés pour la faune, remportons tous nos déchets, y compris le papier toilette et les trognons de pomme !</p>
        <p>Pour rappel :</p>
        <p><i>En réserve naturelle, Le camping est interdit dans les réserves naturelles. Seul le bivouac est toléré pour une seule nuit, sur un même emplacement, avec ou sans abri, entre 19h et 9h. Le bivouac consiste à passer une seule nuit sur place alors que le camping sauvage comprend plusieurs nuits au même endroit.</i></p>
        <p><strong>En savoir plus sur la réglementation en réserve naturelle :</strong> <a target="_blank" href="https://www.cen-haute-savoie.org/reglementation-0">https://www.cen-haute-savoie.org/reglementation-0</a></p>
        `,
        en: `
        <p><i>Good bivouac practices</i></p>
        <p><strong>Rule n°1 - Respect for trails and places -</strong> I preserve fragile vegetation and avoid soil erosion by staying on the main trail without modifying the environment. I won't be the only one using the trails this summer. If I continue my itinerary after a night's bivouac, I leave the place as I found it so that everyone can enjoy it.</p>
        <p><strong>Rule n°2 - Schedules -</strong> Camping is forbidden in nature reserves. Bivouacs are only allowed for a single night, with or without shelter, between 7pm and 9am.</p>
        <p><strong>Rule n°3 - Noise -</strong> I respect the peace and quiet of wildlife and of my bivouac neighbors! Noise increases stress and alters wildlife behavior. So I respect the living space of the animals around me!</p>
        <p><strong>Rule n°4 - Fire -</strong> To limit the risk of fire, damage to flora and disturbance to wildlife, it is forbidden to light fires. Only stoves are allowed.</p>
        <p><strong>Rule n°5 - Water -</strong> High-altitude lakes are sensitive ecosystems. Taking care of water resources by avoiding mixing products with them (sunscreen, toothpaste, etc.) goes a long way towards preserving them!</p>
        <p><strong>Rule n°6 - Waste and wild toilets -</strong> Waste and wild toilets - In the mountains, waste decomposes very slowly. To avoid the presence of garbage and the risk of ingesting food unsuitable for wildlife, let's take all our garbage with us, including toilet paper and apple cores!</p>
        <p>A reminder:</p>
        <p><i>Camping is forbidden in the nature reserve; bivouacs are tolerated. A bivouac is a temporary camp, with or without shelter, set up after 7pm and before 9am the following day. Bivouacs involve spending a single night on site, whereas wilderness camping involves spending several nights in the same place.</i></p>
        <p><strong>Find out more about nature reserve regulations:</strong> <a target="_blank" href="https://www.cen-haute-savoie.org/reglementation-0">https://www.cen-haute-savoie.org/reglementation-0</a></p>
        `,
        it: `
        <p><i>Buone pratiche per il bivacco</i></p>
        <p><strong>Regola n. 1 - Rispetto dei sentieri e dei siti -</strong> Preservo la fragile vegetazione ed evito l'erosione del suolo rimanendo sul sentiero principale senza alterare l'ambiente. Non sarò l'unico a utilizzare i sentieri quest'estate. Se continuo il mio percorso dopo il bivacco notturno, lascio l'area pulita in modo che tutti possano goderne.</p>
        <p><strong>Regola n. 2 - Orari -</strong> Il campeggio è vietato nelle riserve naturali. I bivacchi sono consentiti per una sola notte, con o senza riparo, tra le 19 e le 9 del mattino.</p>
        <p><strong>Regola n. 3 - Rumore -</strong> Rispetto la pace e la tranquillità della fauna selvatica e dei miei vicini di bivacco! Il rumore aumenta lo stress e altera il comportamento degli animali selvatici. Quindi rispetto lo spazio vitale degli animali che mi circondano!</p>
        <p><strong>Regola n. 4 - Incendio -</strong> Per ridurre il rischio di incendio, i danni alla flora e il disturbo alla fauna, è vietato accendere fuochi. Sono consentite solo le stufe.</p>
        <p><strong>Regola n. 5 - Punto acqua -</strong> I laghi d'alta quota sono ecosistemi sensibili agli apporti esterni (crema solare, dentifricio...). Se non ci immergete nulla, li state preservando!</p>
        <p><strong>Regola n. 6 - Rifiuti e toilette non autorizzate -</strong> In montagna i rifiuti si decompongono molto lentamente. Per evitare la presenza di rifiuti e il rischio di ingerire cibo inadatto alla fauna selvatica, portate con voi tutti i vostri rifiuti, compresi carta igienica e torsoli di mela!</p>
        <p>Come promemoria:</p>
        <p><i>Il campeggio è vietato nelle riserve naturali. È consentito solo il bivacco per una sola notte, nello stesso luogo, con o senza riparo, tra le 19.00 e le 9.00. Il bivacco consiste nel trascorrere una sola notte sul posto, mentre il campeggio selvaggio consiste nel trascorrere più notti nello stesso luogo.</i></p>
        <p><strong>Per saperne di più sul regolamento delle riserve naturali :</strong> <a target="_blank" href="https://www.cen-haute-savoie.org/reglementation-0">https://www.cen-haute-savoie.org/reglementation-0</a></p>
        `
    }
});

export default GoodPractices.reducer;
