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
        <p>Informez-vous auprès de la chamoniarde pour les conditions des sentiers.</p>

        <p><strong>Pourquoi doit-on installer sa tente uniquement entre 19h et 9h?</strong></p>
        <p>De manière générale, le bivouac doit être le moins impactant possible sur le milieu dans lequel il se trouve. On parle souvent de planter sa tente au coucher du soleil, et la démonter au lever du soleil. En Haute-Savoie, cela se traduit par les horaires de 19h à 9h le lendemain.</p>

        <p><strong>Que se passe-t-il si j’installe ma tente en dehors de ces zones tolérées ou en dehors des horaires?</strong></p>
        <p>En cas de contrôle par des agents du Parc national de la Vanoise, vous risquez une amende de 68 €. Circulation et stationnement des personnes catégorie 3.</p>

        <p><strong>Y a-t-il des toilettes à proximité?</strong></p>
        <p>Dans la réserve naturelle des contamines-Montjoie, des toilettes publiques sont accessibles. Merci de remporter vos déchets pas de poubelles sur place.</p>

        <p><strong>Est-ce que je dois apporter ma tente?</strong></p>
        <p>Oui nous parlons ici de bivouac sans services associés comme dans un camping. N’oublier sac de couchage adapté, les nuits étant plus fraîches en altitude : tapis de sol, habits chauds, un petit bonnet et une frontale!</p>

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
        <p>Informez-vous auprès de la chamoniarde pour les conditions des sentiers.</p>

        <p><strong>Pourquoi doit-on installer sa tente uniquement entre 19h et 9h?</strong></p>
        <p>De manière générale, le bivouac doit être le moins impactant possible sur le milieu dans lequel il se trouve. On parle souvent de planter sa tente au coucher du soleil, et la démonter au lever du soleil. En Haute-Savoie, cela se traduit par les horaires de 19h à 9h le lendemain.</p>

        <p><strong>Que se passe-t-il si j’installe ma tente en dehors de ces zones tolérées ou en dehors des horaires?</strong></p>
        <p>En cas de contrôle par des agents du Parc national de la Vanoise, vous risquez une amende de 68 €. Circulation et stationnement des personnes catégorie 3.</p>

        <p><strong>Y a-t-il des toilettes à proximité?</strong></p>
        <p>Dans la réserve naturelle des contamines-Montjoie, des toilettes publiques sont accessibles. Merci de remporter vos déchets pas de poubelles sur place.</p>

        <p><strong>Est-ce que je dois apporter ma tente?</strong></p>
        <p>Oui nous parlons ici de bivouac sans services associés comme dans un camping. N’oublier sac de couchage adapté, les nuits étant plus fraîches en altitude : tapis de sol, habits chauds, un petit bonnet et une frontale!</p>

        <p><strong>Est-ce que je peux utiliser mon réchaud sur l’aire de bivouac pour préparer mon repas?</strong></p>
        <p>Oui, le feu est interdit mais les réchauds portatifs sont autorisés.</p>

        <p><strong>Est-ce qu’il y a un point d’eau sur l’aire de bivouac?</strong></p>
        <p>Non.</p>

        <p><strong>Est-ce que je peux laisser mes déchets au refuge? pourquoi?</strong></p>
        <p>Non, le refuge ne collecte pas les déchets des randonneurs ou bivouaqueurs en itinérance. Vous devez redescendre vos déchets en vallée. Sinon, il faudrait stocker ces déchets (il y a souvent très peu de place de stockage au refuge), et les héliporter pour les redescendre en vallée.</p>

        <p><strong>Puis-je rester plusieurs jours?</strong></p>
        <p>Vous pouvez rester plusieurs jours, mais votre tente doit être démontée tous les matins à 9H en ayant réservé.</p>
        `,
        it: `
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
        <p>Informez-vous auprès de la chamoniarde pour les conditions des sentiers.</p>

        <p><strong>Pourquoi doit-on installer sa tente uniquement entre 19h et 9h?</strong></p>
        <p>De manière générale, le bivouac doit être le moins impactant possible sur le milieu dans lequel il se trouve. On parle souvent de planter sa tente au coucher du soleil, et la démonter au lever du soleil. En Haute-Savoie, cela se traduit par les horaires de 19h à 9h le lendemain.</p>

        <p><strong>Que se passe-t-il si j’installe ma tente en dehors de ces zones tolérées ou en dehors des horaires?</strong></p>
        <p>En cas de contrôle par des agents du Parc national de la Vanoise, vous risquez une amende de 68 €. Circulation et stationnement des personnes catégorie 3.</p>

        <p><strong>Y a-t-il des toilettes à proximité?</strong></p>
        <p>Dans la réserve naturelle des contamines-Montjoie, des toilettes publiques sont accessibles. Merci de remporter vos déchets pas de poubelles sur place.</p>

        <p><strong>Est-ce que je dois apporter ma tente?</strong></p>
        <p>Oui nous parlons ici de bivouac sans services associés comme dans un camping. N’oublier sac de couchage adapté, les nuits étant plus fraîches en altitude : tapis de sol, habits chauds, un petit bonnet et une frontale!</p>

        <p><strong>Est-ce que je peux utiliser mon réchaud sur l’aire de bivouac pour préparer mon repas?</strong></p>
        <p>Oui, le feu est interdit mais les réchauds portatifs sont autorisés.</p>

        <p><strong>Est-ce qu’il y a un point d’eau sur l’aire de bivouac?</strong></p>
        <p>Non.</p>

        <p><strong>Est-ce que je peux laisser mes déchets au refuge? pourquoi?</strong></p>
        <p>Non, le refuge ne collecte pas les déchets des randonneurs ou bivouaqueurs en itinérance. Vous devez redescendre vos déchets en vallée. Sinon, il faudrait stocker ces déchets (il y a souvent très peu de place de stockage au refuge), et les héliporter pour les redescendre en vallée.</p>

        <p><strong>Puis-je rester plusieurs jours?</strong></p>
        <p>Vous pouvez rester plusieurs jours, mais votre tente doit être démontée tous les matins à 9H en ayant réservé.</p>
        `
    }
});

export default Faq.reducer;
