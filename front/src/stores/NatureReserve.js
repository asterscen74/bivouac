import { createSlice } from "@reduxjs/toolkit";

export const NatureReserve = createSlice({
    name: "NatureReserve",
    initialState: {
        fr: `
        <p>Véritables cœurs de nature, les réserves naturelles sont des espaces protégés par décret ministériel en vue de conserver un patrimoine naturel d’exception. Prenons le temps de contempler et de vivre leurs multiples facettes… mais soyons aussi acteur de leur préservation.</p>
        <p>En France, 304 réserves naturelles nationales ou régionales s’étendent sur plus de 2, 8 millions d’ha.</p>
        <p>Si les plus grandes se situent dans les Terres australes françaises ou dans la forêt tropicale Guyanaise, la Haute-Savoie est le département qui en possède le plus (9) et qui détient le record de l’altitude avec la plus haute réserve naturelle de France, celle des Contamines-Montjoie (à 3 892 m).</p>
        <p><strong>VOCATION D’UNE RÉSERVE NATURELLE</strong></p>
        <p><strong>Les sciences sont des outils fondamentaux pour mieux comprendre le monde qui nous entoure et ses fragilités.
        La réserve naturelle est un laboratoire en plein air !
        Un projet de conservation et de gestion des espèces et des milieux naturels existe sur cet espace, à la recherche d’un équilibre délicat pour les Hommes et la nature. Aimer, découvrir, apprendre, respecter… cet espace est ouvert au public et entraîne les visiteurs bien au-delà de l’émerveillement.</strong></p>
        <p><strong>UNE RÉGLEMENTATION POURQUOI ?</strong></p>
        <p>La réglementation permet d’organiser, de restreindre ou d’exclure les activités humaines qui menacent le patrimoine à protéger. Sont notamment encadrés les travaux, la circulation des personnes, des animaux domestiques et des véhicules, parfois les activités agricoles, pastorales, forestières, ou encore la fréquentation des sites.</p>
        <p><strong>Le gestionnaire assure la protection de cet espace notamment par des missions de police de l’environnement. Une réglementation spécifique s’applique à chaque réserve naturelle.</strong></p>
        <p><strong>Les réserves naturelles de Haute-Savoie</strong></p>
        <p>Aiguilles rouges : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges">https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges</a></p>
        <p>Carlaveyron : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron">https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron</a></p>
        <p>Vallon de Bérard : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard">https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard</a></p>
        <p>Contamines-Montjoie : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie">https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie</a></p>
        <p>Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/passy-0">https://www.cen-haute-savoie.org/reserve-naturelle/passy-0</a></p>
        <p>Sixt-Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy">https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy</a></p>
        <p>Bout du lac d’Annecy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy">https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy</a></p>
        <p>Roc de chère : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere">https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere</a></p>
        <p>Delta de la dranse : <a target="_blank" href="">https://www.cen-haute-savoie.org/reserve-naturelle/delta-dranse</a></p>
        `,
        en: `
        <p>Nature reserves are areas protected by ministerial decree to preserve an exceptional natural heritage. Let's take the time to contemplate and experience their many facets... but let's also play a part in preserving them.</p>
        <p>In France, 304 national or regional nature reserves cover more than 2.8 million hectares.</p>
        <p>While the largest are in the French Southern Territories or the Guyanese rainforest, Haute-Savoie is the department with the most (9) and holds the record for highest altitude with the highest nature reserve in France, Les Contamines-Montjoie (at 3,892 m).</p>
        <p><strong>PURPOSE OF A NATURE RESERVE</strong></p>
        <p><strong>Science is a fundamental tool for understanding the world around us and its fragility.
        The nature reserve is an open-air laboratory!
        A conservation and management project for species and natural environments exists in this area, in search of a delicate balance between man and nature. Loving, discovering, learning, respecting... this area is open to the public and takes visitors far beyond the realms of wonder.</strong></p>
        <p><strong>WHY REGULATIONS?</strong></p>
        <p>Regulations make it possible to organise, restrict or exclude human activities that threaten the heritage to be protected. In particular, work, the movement of people, domestic animals and vehicles, and sometimes agricultural, pastoral and forestry activities, as well as visits to the sites, are regulated.</p>
        <p><strong>The manager ensures the protection of this area, in particular through environmental policing. Specific regulations apply to each nature reserve.</strong></p>
        <p><strong>Nature reserves in Haute-Savoie</strong></p>
        <p>Aiguilles rouges : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges">https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges</a></p>
        <p>Carlaveyron : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron">https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron</a></p>
        <p>Vallon de Bérard : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard">https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard</a></p>
        <p>Contamines-Montjoie : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie">https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie</a></p>
        <p>Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/passy-0">https://www.cen-haute-savoie.org/reserve-naturelle/passy-0</a></p>
        <p>Sixt-Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy">https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy</a></p>
        <p>Bout du lac d’Annecy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy">https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy</a></p>
        <p>Roc de chère : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere">https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere</a></p>
        <p>Delta de la dranse : <a target="_blank" href="">https://www.cen-haute-savoie.org/reserve-naturelle/delta-dranse</a></p>
        `,
        it: `
        <p>Le riserve naturali sono aree protette da un decreto ministeriale per preservare un patrimonio naturale eccezionale. Prendiamoci il tempo per contemplare e vivere le loro molteplici sfaccettature... ma facciamo anche la nostra parte per preservarle.</p>
        <p>In Francia, 304 riserve naturali nazionali o regionali coprono più di 2,8 milioni di ettari.</p>
        <p>Mentre i più grandi si trovano nei Territori Francesi del Sud o nella foresta pluviale della Guyana, l'Alta Savoia è il dipartimento con il maggior numero (9) e detiene il record di altitudine con la riserva naturale più alta di Francia, Les Contamines-Montjoie (a 3.892 m).</p>
        <p><strong>SCOPO DI UNA RISERVA NATURALE</strong></p>
        <p><strong>La scienza è uno strumento fondamentale per comprendere il mondo che ci circonda e la sua fragilità.
        La riserva naturale è un laboratorio a cielo aperto!
        In quest'area esiste un progetto di conservazione e gestione delle specie e degli ambienti naturali, alla ricerca di un delicato equilibrio tra uomo e natura. Amare, scoprire, imparare, rispettare... quest'area è aperta al pubblico e porta i visitatori ben oltre i confini della meraviglia.</strong></p>
        <p><strong>PERCHÉ I REGOLAMENTI?</strong></p>
        <p>I regolamenti consentono di organizzare, limitare o escludere le attività umane che minacciano il patrimonio da proteggere. In particolare, sono regolamentati il lavoro, la circolazione delle persone, degli animali domestici e dei veicoli, e talvolta le attività agricole, pastorali e forestali, nonché le visite ai siti.</p>
        <p><strong>Il gestore assicura la protezione di quest'area, in particolare attraverso la polizia ambientale. Ogni riserva naturale è soggetta a regolamenti specifici.</strong></p>
        <p><strong>Riserve naturali in Alta Savoia</strong></p>
        <p>Aiguilles rouges : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges">https://www.cen-haute-savoie.org/reserve-naturelle/aiguilles-rouges</a></p>
        <p>Carlaveyron : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron">https://www.cen-haute-savoie.org/reserve-naturelle/carlaveyron</a></p>
        <p>Vallon de Bérard : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard">https://www.cen-haute-savoie.org/reserve-naturelle/vallon-berard</a></p>
        <p>Contamines-Montjoie : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie">https://www.cen-haute-savoie.org/reserve-naturelle/contamines-montjoie</a></p>
        <p>Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/passy-0">https://www.cen-haute-savoie.org/reserve-naturelle/passy-0</a></p>
        <p>Sixt-Passy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy">https://www.cen-haute-savoie.org/reserve-naturelle/sixt-fer-cheval-passy</a></p>
        <p>Bout du lac d’Annecy : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy">https://www.cen-haute-savoie.org/reserve-naturelle/bout-lac-annecy</a></p>
        <p>Roc de chère : <a target="_blank" href="https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere">https://www.cen-haute-savoie.org/reserve-naturelle/roc-chere</a></p>
        <p>Delta de la dranse : <a target="_blank" href="">https://www.cen-haute-savoie.org/reserve-naturelle/delta-dranse</a></p>
        `
    }
});

export default NatureReserve.reducer;
