import { createSlice } from "@reduxjs/toolkit";
import carteContaFr from '../assets/img/bivouac_conta_fr.webp'
import carteMarFr from '../assets/img/bivouac_mar_fr.webp'
import carteContaEn from '../assets/img/bivouac_conta_en.webp'
import carteMarEn from '../assets/img/bivouac_mar_en.webp'
import carteContaIt from '../assets/img/bivouac_conta_it.webp'
import carteMarIt from '../assets/img/bivouac_mar_it.webp'

export const Home = createSlice({
    name: "Home",
    initialState: {
        fr: `
        <p><strong>Envie de dormir à la belle étoile?</strong> </p>
        <p>Depuis 2023, vous devez réserver sur la période estivale, <strong>de Juin à fin Août</strong>, votre nuit pour bivouaquer en réserves naturelles :</p>
        <li>du Massif des Aiguilles Rouges</li>
        <li>des Contamines-Montjoie</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>La réserve naturelle de Passy n’est pas soumise à cette réglementation.</p>
        <p>Avant de remplir votre réservation, ces cartes résument les zones interdites au bivouac et les zones tolérées. Cette réservation est gratuite mais obligatoire!</p>
        </p> Préservons ensemble la nature !</p>
        <div class="column">
        <p><strong>Réserve Naturelle Nationale des Contamines-Montjoie</strong> </p>
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <p><strong>Réserves Naturelles Nationales du Massif des Aiguilles rouges</strong> </p>
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>Réserve Naturelle Nationale des Contamines-Montjoie</strong> </p>
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>Réserves Naturelles Nationales du Massif des Aiguilles rouges</strong> </p>
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        <p><strong>Camping ou Bivouac?</strong></p>
        <p>Le camping sauvage (plusieurs nuits) est interdit en réserves naturelles, le bivouac est réglementé sur certaines zones ou aires ; pour une seule nuit, sur un même emplacement, avec ou sans abri, entre 19h et 9h.</p>
        <p>Plus d'infos : Arrêtés préfectoraux réglementant la pratique du bivouac et de la baignade :</p>
        <li><a href="https://www.cen-haute-savoie.org/sites/ecrins-parcnational.com/files/files/ARP_DDT-2025_820_BivouacRNN_MAR_signe.pdf">Arrêté préfectoral Réserve Naturelle des Aiguilles Rouges</a></li>
        <li><a href="https://www.cen-haute-savoie.org/sites/ecrins-parcnational.com/files/files/RNNCM-ARP_DDT-2025_0739_BivouacBaignadeJovet_RNNCM_signe.pdf">Arrêté préfectoral Réserve Naturelle des Contamines-Monjoie</a></li>
        `,
        en: `
        <p><strong>Want to sleep under the stars?</strong> </p>
        <p>Since 2023, you have had to book, from June to the end of August, your night to sleep in nature reserves:</p>
        <li>du Massif des Aiguilles Rouges</li>
        <li>des Contamines-Montjoie</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>The Passy nature reserve is not subject to these regulations.</p>
        <p>Before completing your booking, this map summarises the areas where bivouacs are prohibited and those where they are permitted. This booking is free! Protect nature together!</p>
        <div class="column">
        <p><strong>National Nature Reserve of Contamines-Montjoie</strong></p>
        <a href="${carteContaEn}"><img src="${carteContaEn}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <p><strong>Aiguilles Rouges' National Nature Reserves</strong> </p>
        <a href="${carteMarEn}"><img src="${carteMarEn}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>National Nature Reserve of Contamines-Montjoie</strong> </p>
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>Aiguilles Rouges' National Nature Reserves</strong> </p>
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        <p><strong>Camping or Bivouac?</strong> </p>
        <p>Wild camping (several nights) is forbidden in nature reserves. Bivouacking is regulated in certain zones or areas; for a single night, on the same pitch, with or without shelter, between 7pm and 9am.</p>
        `,
        it: `
        <p><strong>Volete dormire sotto le stelle? </strong> </p>
        <p>Dal 2023, dovrete prenotare la vostra notte per dormire nelle riserve naturali:</p>
        <li>du Massif des Aiguilles Rouges</li>
        <li>des Contamines-Montjoie</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>La riserva naturale di Passy non è soggetta a queste norme.</p>
        <p>Prima di completare la prenotazione, questa mappa riassume le aree in cui i bivacchi sono vietati e quelle in cui sono consentiti. La prenotazione è gratuita! Proteggiamo la natura insieme!</p>
        <div class="column">
        <p><strong>Riserve naturali nazionali di Contamines-Montjoie</strong> </p>
        <a href="${carteContaIt}"><img src="${carteContaIt}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <p><strong>Riserva Naturale Nazionale delle Aiguilles rouges</strong> </p>
        <a href="${carteMarIt}"><img src="${carteMarIt}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>Riserve naturali nazionali di Contamines-Montjoie</strong> </p>
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <p style="text-align:center"><strong>Riserva Naturale Nazionale delle Aiguilles rouges</strong> </p>
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        <p><strong>Campeggio o bivacco? </strong> </p>
        <p>Il campeggio selvaggio (più notti) è vietato nelle riserve naturali. Il bivacco è regolamentato in alcune zone o aree; per una sola notte, sulla stessa piazzola, con o senza riparo, tra le 19 e le 9 del mattino.</p>
        `
    }
});

export default Home.reducer;
