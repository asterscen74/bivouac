import { createSlice } from "@reduxjs/toolkit";

export const LegalNotices = createSlice({
    name: "LegalNotices",
    initialState: {
        fr: `
        <p class="section-title">Propriétaire du site et éditeur</p>
        <p>Le site web <a target="_blank" href="https://bivouac.nature-haute-savoie.fr">https://bivouac.nature-haute-savoie.fr</a> est la propriété de ASTERS - Conservatoire d'espaces naturels de Haute-Savoie :</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie</p>
        <p>60 avenue de France 74000 Annecy</p>
        <p>04 50 66 47 51</p>
        <p>contact@cen-haute-savoie.org</p>
        <p class="section-title">Directeur de publication</p>
        <p>Juliette Buret</p>
        <p class="section-title">Création graphique</p>
        <p>La création webdesign et l'intégration ont été réalisés par ASTERS.</p>
        <p class="section-title">Développement technique</p>
        <p>Le développement technique initial a été réalisé par <a target="_blank" href="https://oslandia.com/">Oslandia</a> de manière open source et Jules Grillot pour Asters-CEN74</p>
        <p class="section-title">Maintenance</p>
        <p>Réalisé par Asters-CEN74</p>
        <p class="section-title">Hébergement</p>
        <p>Ce service est hébergé physiquement en France dans un centre de donnée de la société : OVH.com en France.</p>
        <p class="section-title">Propriété intellectuelle</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, etc. Alors avant de copier, adapter, citer ce contenu... veuillez obtenir une autorisation écrite préalable.</p>
        <p class="section-title">Liens hypertextes</p>
        <p>Lors de votre navigation, vous découvrirez plusieurs liens hypertextes vers d'autres sites web. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie n’a pas la possibilité de vérifier le contenu de ces sites et n’assumera en conséquence aucune responsabilité de ce fait.</p>
        <p class="section-title">Cookies</p>
        <p>La navigation sur ce site provoque l’installation de p'tits fichiers, nommés cookies, sur le navigateur de l’utilisateur. Ils sont gentils et ne prennent pas de place 😉. Par contre, le refus d’installation d’un cookie peut bloquer techniquement l’accès à certains services et réduire notre capacité à améliorer l'expérience de navigation via des mesures d'audience. </p>
        <p class="section-title">Gestion des données personnelles</p>
        <p>En surfant sur ce site, des informations peuvent être recueillies : provenances, fournisseur d'accès, adresse IP, etc. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie collecte des informations personnelles pour le besoin de certains services proposés par ce site, voir ci-dessus. Le droit d’accès, de rectification et d’opposition aux données personnelles concernant les visiteurs, s'effectuent par demande écrite à l'adresse ci-dessus.</p>
        <p class="section-title">Droit applicable et attribution de juridiction</p>
        <p>Tout litige en relation avec l’utilisation de ce site est soumis au droit français et dans la langue de Molière. Cocorico !</p>
        <p class="section-title">Encore là ?</p>
        <p>Félicitations ! Car cette page est sûrement la moins intéressante de ce site 😉</p>
        `,
        en: `
        <p class="section-title">Site owner and publisher</p>
        <p>The website <a target="_blank" href="https://bivouac.nature-haute-savoie.fr">https://bivouac.nature-haute-savoie.fr</a> is the property of ASTERS - Conservatoire d'espaces naturels de Haute-Savoie :</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie</p>
        <p>60 avenue de France 74000 Annecy</p>
        <p>04 50 66 47 51</p>
        <p>contact@cen-haute-savoie.org</p>
        <p class="section-title">Publishing director</p>
        <p>Juliette Buret</p>
        <p class="section-title">Graphic design</p>
        <p>Web design and integration by ASTERS.</p>
        <p class="section-title">Technical development</p>
        <p>Initial technical development was carried out by <a target="_blank" href="https://oslandia.com/">Oslandia</a> in open source and Jules Grillot for Asters-CEN74.</p>
        <p class="section-title">Maintenance</p>
        <p>Carried out by Asters-CEN74</p>
        <p class="section-title">Hosting</p>
        <p>This service is physically hosted in France in a OVH.com data center in France.</p>
        <p class="section-title">Intellectual property rights</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie is the owner of the intellectual property rights or holds the rights of use on all the elements accessible on the site, notably texts, images, graphics, logos, etc. Before copying, adapting or quoting this content, please obtain prior written authorization.</p>
        <p class="section-title">Hypertext links</p>
        <p>During your browsing, you will discover several hypertext links to other websites. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie is not in a position to check the content of these sites, and therefore accepts no liability in this respect.</p>
        <p class="section-title">Cookies</p>
        <p>Browsing this site causes small files called cookies to be installed on the user's browser. They're nice and don't take up much space 😉. However, refusing to install a cookie may technically block access to certain services and reduce our ability to improve the browsing experience through audience measurement.</p>
        <p class="section-title">Personal data management</p>
        <p>When surfing on this site, information may be collected: origin, access provider, IP address, etc. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie collects personal information for the purposes of certain services offered by this site, see above. The right of access, rectification and opposition to personal data concerning visitors can be exercised by written request to the above address.</p>
        <p class="section-title">Applicable law and jurisdiction</p>
        <p>Any dispute relating to the use of this site is subject to French law and in the language of Molière. Cock-a-doodle-doo!</p>
        <p class="section-title">Here again?</p>
        <p>Congratulations! Because this page is surely the least interesting on this site 😉</p>
        `,
        it: `
        <p class="section-title">Proprietario ed editore del sito</p>
        <p>Il sito web <a target="_blank" href="https://bivouac.nature-haute-savoie.fr">https://bivouac.nature-haute-savoie.fr</a> è di proprietà di ASTERS - Conservatoire d'espaces naturels de Haute-Savoie :</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie</p>
        <p>60 avenue de France 74000 Annecy</p>
        <p>04 50 66 47 51</p>
        <p>contact@cen-haute-savoie.org</p>
        <p class="section-title">Direttore di pubblicazione</p>
        <p>Juliette Buret</p>
        <p class="section-title">Design grafico</p>
        <p>Il design e l'integrazione del web sono stati realizzati da ASTERS.</p>
        <p class="section-title">Sviluppo tecnico</p>
        <p>Lo sviluppo tecnico iniziale è stato realizzato da <a target="_blank" href="https://oslandia.com/">Oslandia</a> in modo open source e Jules Grillot per Asters-CEN74</p>
        <p class="section-title">Manutenzione</p>
        <p>Diretto da Asters-CEN74</p>
        <p class="section-title">Hosting</p>
        <p>Questo servizio è fisicamente ospitato in Francia in un centro dati appartenente alla società: OVH.com in Francia.</p>
        <p class="section-title">Proprietà intellettuale</p>
        <p>ASTERS - Conservatoire d'espaces naturels de Haute-Savoie è titolare dei diritti di proprietà intellettuale o dei diritti d'uso di tutti gli elementi accessibili sul sito, in particolare testi, immagini, grafici, logo, ecc. Prima di copiare, adattare o citare questi contenuti, si prega di ottenere un'autorizzazione scritta.</p>
        <p class="section-title">Collegamenti ipertestuali</p>
        <p>Durante la navigazione, l'utente scoprirà diversi collegamenti ipertestuali ad altri siti web. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie non è in grado di controllare il contenuto di questi siti e non si assume pertanto alcuna responsabilità al riguardo.</p>
        <p class="section-title">Cookies</p>
        <p>La navigazione in questo sito provoca l'installazione nel browser dell'utente di piccoli file chiamati cookie. Sono simpatici e non occupano molto spazio 😉 . Tuttavia, il rifiuto di installare un cookie può tecnicamente bloccare l'accesso ad alcuni servizi e ridurre la nostra capacità di migliorare l'esperienza di navigazione attraverso la misurazione del pubblico. </p>
        <p class="section-title">Gestione dei dati personali</p>
        <p>Quando si naviga su questo sito, possono essere raccolte informazioni: origine, fornitore di accesso, indirizzo IP, ecc. ASTERS - Conservatoire d'espaces naturels de Haute-Savoie raccoglie informazioni personali ai fini di alcuni servizi offerti da questo sito, vedi sopra. Il diritto di accesso, rettifica e opposizione ai dati personali dei visitatori può essere esercitato mediante richiesta scritta all'indirizzo sopra indicato.</p>
        <p class="section-title">Legge applicabile e giurisdizione</p>
        <p>Qualsiasi controversia relativa all'utilizzo di questo sito è soggetta al diritto francese e alla lingua di Molière. Cocorico!</p>
        <p class="section-title">Ancora qui?</p>
        <p>Congratulazioni! Perché questa pagina è sicuramente la meno interessante di questo sito 😉</p>
        `
    }
});

export default LegalNotices.reducer;
