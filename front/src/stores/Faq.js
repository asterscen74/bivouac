import { createSlice } from "@reduxjs/toolkit";

export const Faq = createSlice({
    name: "Faq",
    initialState: {
        fr: `
        <p><strong>Pourquoi la règlementation est différente selon les massifs?</strong></p>
        <p>Les différents espaces naturels protégés (par exemple : parcs nationaux des Ecrins et de la Vanoise, réserve naturelle des Hauts de Chartreuse) adaptent leur réglementation en fonction des contraintes locales.</p>
        <p>L’impact du bivouac sur le milieu naturel est fort, c’est la raison pour laquelle il est réglementé voir interdit dans cette zone à fort enjeux environnementaux.</p>

        <p><strong>Que se passe- t-il si je ne réserve pas? La réservation est-elle obligatoire?</strong></p>
        <p>Dans les réserves naturelles du massif des aiguilles rouges la réservation est obligatoire. La réservation est très fortement conseillée dans les autres réserves naturelles afin que vous garantir une place sur la zone dédiée.</p>
        <p>Attention, le bivouac est également réglementé par les communes, renseignez-vous bien avant.</p>

        <p><strong>La réservation est-elle payante y a-t-il des services associés?</strong></p>
        <p>Cette réservation est gratuite, sans service contrairement à un camping.</p>

        <p><strong>Sécurité: Quand bivouaquer?</strong></p>
        <p>Attention, vous randonnez en zone de montagne, en début de saison (fin juin - début juillet), les passages des cols peuvent être délicats en raison de névés persistants.</p>
        <p>Informez-vous auprès de <a href="https://www.chamoniarde.com">la Chamoniarde</a> pour les conditions des sentiers.</p>

        <p><strong>Pourquoi doit-on installer sa tente uniquement entre 19h et 9h?</strong></p>
        <p>De manière générale, le bivouac doit être le moins impactant possible sur le milieu dans lequel il se trouve. On parle souvent de planter sa tente au coucher du soleil, et la démonter au lever du soleil. En Haute-Savoie, cela se traduit par les horaires de 19h à 9h le lendemain.</p>

        <p><strong>Que se passe-t-il si j’installe ma tente en dehors de ces zones tolérées ou en dehors des horaires?</strong></p>
        <p>En cas de contrôle par les gardes des réserves naturelles, vous risquez une amende de 68 €.

        <p><strong>Y a-t-il des toilettes à proximité?</strong></p>
        <p>Dans la réserve naturelle des Contamines-Montjoie, des toilettes publiques sont accessibles. Merci de remporter vos déchets pas de poubelles sur place.</p>

        <p><strong>Quel matériel apporter lors de mon bivouac?</strong></p>
        <p>Vous êtes en réserves naturelles, la réservation n'entraîne aucun services associés. Les nuits étant plus fraîches en altitude, n’oubliez pas le sac de couchage adapté, tapis de sol, habits chauds,une frontale...</p>

        <p><strong>Est-ce que je peux utiliser mon réchaud sur l’aire de bivouac pour préparer mon repas?</strong></p>
        <p>Oui, le feu est interdit mais les réchauds portatifs sont autorisés.</p>

        <p><strong>Est-ce qu’il y a un point d’eau sur l’aire de bivouac?</strong></p>
        <p>Non.</p>

        <p><strong>Est-ce que je peux laisser mes déchets au refuge? pourquoi?</strong></p>
        <p>Non, le refuge ne collecte pas les déchets des randonneurs ou bivouaqueurs en itinérance. Vous devez redescendre vos déchets en vallée. Sinon, il faudrait stocker ces déchets (il y a souvent très peu de place de stockage au refuge), et les héliporter pour les redescendre en vallée.</p>

        <p><strong>Puis-je rester plusieurs jours?</strong></p>
        <p>Vous pouvez rester plusieurs jours, mais votre tente doit être démontée tous les matins à 9H en ayant réservé.</p>
        `,
        en: `
        <p><strong>Why are the regulations different in different mountain ranges?</strong></p>
        <p>The various protected natural areas (e.g. Ecrins and Vanoise national parks, Hauts de Chartreuse nature reserve) adapt their regulations to suit local constraints.</p>
        <p>Bivouacs have a major impact on the natural environment, which is why they are regulated, if not banned, in areas where the environmental stakes are high.</p>

        <p><strong>What happens if I don't book? Is booking compulsory?</strong></p>
        <p>In the nature reserves of the Massif des Aiguilles Rouges, booking is compulsory. Booking is strongly recommended in the other nature reserves so that you are guaranteed a place in the designated area.</p>
        <p>Please note that bivouacs are also regulated by the local authorities, so make sure you ask beforehand.</p>

        <p><strong>Is there a charge for booking, and are there any associated services?</strong></p>
        <p>No. This booking is free, with no services, unlike a campsite.</p>

        <p><strong>Safety: When should you bivouac?</strong></p>
        <p>Be careful, if you are hiking in a mountain area, at the start of the season (late June - early July), the passes can be tricky because of persistent snow.</p>
        <p>Ask <a href="https://www.chamoniarde.com">the Chamoniarde</a> about trail conditions.</p>

        <p><strong>Why is the number of places limited?</strong></p>
        <p>The configuration of the site (topography, sensitive environments, etc.) and the knowledge acquired by the manager enable the definition, on the basis of expert opinion, of accommodation capacities do not question the conservation of natural environments and the species they support.</p>

        <p><strong>Why should I only pitch my tent between 7 pm and 9 am?</strong></p>
        <p>Generally speaking, bivouacs should have as little impact as possible on the environment in which they are set up. We often talk about pitching your tent at sunset and taking it down at sunrise. In Haute-Savoie, this means from 7pm to 9am the next day.</p>

        <p><strong>Why can't I bivouac where I want, next to a lake for example?</strong></p>
        <p>To preserve the natural environment, so as not to damage the flora or disturb the wildlife.</p>

        <p><strong>What happens if I pitch my tent outside these zones or outside the time limits?</strong></p>
        <p>If you are checked by nature reserve wardens, you risk a €68 fine. Movement and parking of category 3 persons.</p>

        <p><strong>Are there any toilets nearby?</strong></p>
        <p>There are public toilets in the Contamines-Montjoie nature reserve. Please take your rubbish with you - there are no bins on site.</p>

        <p><strong>Do I need to bring my tent ?</strong></p>
        <p>Yes, we're talking here about a bivouac without the associated services of a campsite. Don't forget a suitable sleeping bag, as the nights are cooler at altitude, a ground sheet, warm clothes, a small hat and a headlamp!</p>

        <p><strong>Can I use my stove in the bivouac area to prepare my meal?</strong></p>
        <p>Yes, fires are prohibited, but portable stoves are permitted.</p>

        <p><strong>Is there a water point in the bivouac area?</strong></p>
        <p>No.</p>

        <p><strong>Can I leave my rubbish at the refuge? Why? </strong></p>
        <p>No, the refuge does not collect rubbish from hikers or bivouac-goers. You must take your rubbish back down to the valley. Otherwise, you would have to store the waste (there is often very little storage space at the refuge), and then heli-lift it back down to the valley.</p>

        <p><strong>Can I stay for several days?</strong></p>
        <p>You can stay for several days, but your tent must be taken down every morning at 9am if you have booked in advance.</p>

        <p><strong>What is the difference between camping and bivouacking?</strong></p>
        <p>Wild camping (several nights) is forbidden in nature reserves. Bivouacking is regulated in certain zones or areas; for a single night, on the same pitch, with or without shelter, between 7pm and 9am.</p>
        `,
        it: `
        <p><strong>Perché i regolamenti sono diversi nelle varie catene montuose?</strong></p>
        <p>Le diverse aree naturali protette (ad esempio i parchi nazionali degli Ecrins e della Vanoise, la riserva naturale delle Hauts de Chartreuse) adattano i loro regolamenti ai vincoli locali.</p>
        <p>I bivacchi hanno un forte impatto sull'ambiente naturale, per questo sono regolamentati, se non vietati, in queste aree sensibili dal punto di vista ambientale.</p>

        <p><strong>2-	Cosa succede se non prenoto? La prenotazione è obbligatoria?</strong></p>
        <p>Nelle riserve naturali del Massiccio delle Aiguilles Rouges la prenotazione è obbligatoria. Nelle altre riserve naturali la prenotazione è fortemente consigliata per garantirsi un posto nell'area designata.</p>
        <p>Si noti che anche i bivacchi sono regolamentati dalle autorità locali, quindi è bene informarsi prima.</p>

        <p><strong>La prenotazione è a pagamento e ci sono servizi associati?</strong></p>
        <p>No. Questa prenotazione è gratuita, senza servizi, a differenza di un campeggio.</p>

        <p><strong>Sicurezza: quando bivaccare?</strong></p>
        <p>Attenzione, se state facendo un'escursione in una zona di montagna, all'inizio della stagione (fine giugno - inizio luglio), i passi possono essere difficili a causa della neve persistente.</p>
        <p>Informatevi sulle condizioni dei sentieri presso <a href="https://www.chamoniarde.com">la Chamoniarde</a>.</p>

        <p><strong>Perché il numero di posti è limitato?</strong></p>
        <p>a configurazione del sito (topografia, presenza di ambienti sensibili, ecc.) e le conoscenze acquisite dal gestore consentono di definire, sulla base del parere di esperti, capacità ricettive che non pregiudichino la conservazione degli ambienti naturali e delle specie che essi sostengono. Che non compromettano la conservazione degli ambienti naturali e delle specie che essi ospitano.</p>

        <p><strong>Perché dovrei montare la tenda solo tra le 19.00 e le 9.00?</strong></p>
        <p>In generale, i bivacchi dovrebbero avere il minor impatto possibile sull'ambiente in cui vengono allestiti. Spesso si parla di montare la tenda al tramonto e smontarla all'alba. In Alta Savoia, ciò significa dalle 19 alle 9 del giorno successivo.</p>

        <p><strong>Perché non posso bivaccare dove voglio, ad esempio vicino a un lago?</strong></p>
        <p>Per preservare l'ambiente naturale, in modo da non danneggiare la flora o disturbare la fauna selvatica.</p>

        <p><strong>Cosa succede se pianto la tenda al di fuori di queste zone o dei limiti di tempo?</strong></p>
        <p>In caso di ispezione da parte dei guardiani della riserva naturale, si rischia una multa di 68 euro. Circolazione e sosta di persone di categoria 3.</p>

        <p><strong>Ci sono servizi igienici nelle vicinanze ?</strong></p>
        <p>Nella riserva naturale di Contamines-Montjoie sono presenti servizi igienici pubblici. Siete pregati di portare con voi i vostri rifiuti: non ci sono cestini sul posto.</p>

        <p><strong>Devo portare la mia tenda ?</strong></p>
        <p>Sì, stiamo parlando di un bivacco senza i servizi associati di un campeggio. Non dimenticate un sacco a pelo adatto, perché le notti sono più fresche in quota, un telo da terra, vestiti caldi, un piccolo cappello e una lampada frontale!</p>

        <p><strong>Posso usare il mio fornello nell'area di bivacco per preparare i pasti?</strong></p>
        <p>Sì, i fuochi sono vietati, ma sono ammessi i fornelli portatili.</p>

        <p><strong>C'è un punto d'acqua nell'area di bivacco?</strong></p>
        <p>No.</p>

        <p><strong>Posso lasciare i miei rifiuti al rifugio? Perché?</strong></p>
        <p>No, il rifugio non raccoglie i rifiuti degli escursionisti o dei bivaccatori. È necessario riportare i rifiuti a valle. Altrimenti, dovreste immagazzinare i rifiuti (spesso il rifugio dispone di poco spazio) e poi trasportarli a valle con l'elivelivolo.</p>

        <p><strong>Posso soggiornare per più giorni?</strong></p>
        <p>È possibile soggiornare per più giorni, ma la tenda deve essere smontata ogni mattina alle 9 se si è prenotato in anticipo.</p>

        <p><strong>Qual è la differenza tra campeggio e bivacco?</strong></p>
        <p>Il campeggio selvaggio (più notti) è vietato nelle riserve naturali. Il bivacco è regolamentato in alcune zone o aree; per una sola notte, sulla stessa piazzola, con o senza riparo, tra le 19 e le 9 del mattino.</p>
        `
    }
});

export default Faq.reducer;
