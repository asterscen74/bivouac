import { createSlice } from "@reduxjs/toolkit";
import carteContaFr from '../assets/img/bivouac_conta_fr.webp'
import carteContaEn from '../assets/img/bivouac_conta_en.webp'
import carteContaIt from '../assets/img/bivouac_conta_it.webp'
import carteMarFr from '../assets/img/bivouac_mar_fr.webp'
import carteMarEn from '../assets/img/bivouac_mar_en.webp'
import carteMarIt from '../assets/img/bivouac_mar_it.webp'
import carteSixtFr from '../assets/img/bivouac_sixt_fr.webp'
import carteSixtEn from '../assets/img/bivouac_sixt_en.webp'
import carteSixtIt from '../assets/img/bivouac_sixt_it.webp'


export const Home = createSlice({
    name: "Home",
    initialState: {
        fr: `
        <p><strong>Envie de dormir à la belle étoile?</strong> </p>
        <p>Depuis 2023, vous devez réserver sur la période estivale, <strong>de Juin à Septembre</strong>, votre nuit pour bivouaquer en réserves naturelles :</p>
        <li>du Massif des Aiguilles Rouges (1er Juin au 30 Septembre)</li>
        <li>des Contamines-Montjoie (15 Juin au 15 Septembre)</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>La réserve naturelle de Passy n’est pas soumise à cette réglementation.</p>
        <p>Avant de remplir votre réservation, ces cartes résument les zones interdites au bivouac et les zones tolérées. Cette réservation est gratuite mais obligatoire!</p>
        </p> Préservons ensemble la nature !</p>
        <div class="column">
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column">
        <a href="${carteSixtFr}"><img src="${carteSixtFr}" alt="Sixt" style="width:90%"></a>
        </div>
        <div class="column2">
        <a href="${carteContaFr}"><img src="${carteContaFr}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <a href="${carteMarFr}"><img src="${carteMarFr}" alt="Mar" style="width:90%"></a>
        </div>
        </div>
        <div class="column2">
        <a href="${carteSixtFr}"><img src="${carteSixtFr}" alt="Sixt" style="width:90%"></a>
        </div>
        <p><strong>Camping ou Bivouac?</strong></p>
        <p>Le camping sauvage (plusieurs nuits) est interdit en réserves naturelles, le bivouac est réglementé sur certaines zones ou aires ; pour une seule nuit, sur un même emplacement, avec ou sans abri, entre 19h et 9h.</p>
        <p>Plus d'infos : Arrêtés préfectoraux réglementant la pratique du bivouac et de la baignade :</p>
        <li><a href="https://www.cen-haute-savoie.org/wp-content/uploads/2025/12/arp_ddt_2024-0856_bivouac-baignade_signe.pdf">Arrêté préfectoral Réserve Naturelle des Aiguilles Rouges</a></li>
        <li><a href="https://www.cen-haute-savoie.org/wp-content/uploads/2025/12/arp_ddt-2024-0597_rnncm_reglementation_bivouac_baignade-11-1.pdf">Arrêté préfectoral Réserve Naturelle des Contamines-Monjoie</a></li>
        `,
        en: `
        <p><strong>Want to sleep under the stars?</strong> </p>
        <p>Since 2023, you have had to book, from June to September, your night to sleep in nature reserves:</p>
        <li>du Massif des Aiguilles Rouges (June 1st to September 30th)</li>
        <li>des Contamines-Montjoie (June 15th to September 15th)</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>The Passy nature reserve is not subject to these regulations.</p>
        <p>Before completing your booking, this map summarises the areas where bivouacs are prohibited and those where they are permitted. This booking is free! Protect nature together!</p>
        <div class="column">
        <a href="${carteContaEn}"><img src="${carteContaEn}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <a href="${carteMarEn}"><img src="${carteMarEn}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column">
        <a href="${carteSixtEn}"><img src="${carteSixtEn}" alt="Sixt" style="width:90%"></a>
        </div>
        <div class="column2">
        <a href="${carteContaEn}"><img src="${carteContaEn}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <a href="${carteMarEn}"><img src="${carteMarEn}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column2">
        <a href="${carteSixtEn}"><img src="${carteSixtEn}" alt="Sixt" style="width:90%"></a>
        </div>
        <p><strong>Camping or Bivouac?</strong> </p>
        <p>Wild camping (several nights) is forbidden in nature reserves. Bivouacking is regulated in certain zones or areas; for a single night, on the same pitch, with or without shelter, between 7pm and 9am.</p>
        `,
        it: `
        <p><strong>Volete dormire sotto le stelle? </strong> </p>
        <p>Dal 2023, dovrete prenotare la vostra notte per dormire nelle riserve naturali:</p>
        <li>du Massif des Aiguilles Rouges (dal 1° giugno al 30 settembre)</li>
        <li>des Contamines-Montjoie (dal 15 giugno al 15 settembre)</li>
        <li>Sixt-Fer-à-Cheval/Passy</li>
        <p>La riserva naturale di Passy non è soggetta a queste norme.</p>
        <p>Prima di completare la prenotazione, questa mappa riassume le aree in cui i bivacchi sono vietati e quelle in cui sono consentiti. La prenotazione è gratuita! Proteggiamo la natura insieme!</p>
        <div class="column">
        <a href="${carteContaIt}"><img src="${carteContaIt}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column">
        <a href="${carteMarIt}"><img src="${carteMarIt}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column">
        <a href="${carteSixtIt}"><img src="${carteSixtIt}" alt="Sixt" style="width:90%"></a>
        </div>
        <div class="column2">
        <a href="${carteContaIt}"><img src="${carteContaIt}" alt="Conta" style="width:90%"/></a>
        </div>
        <div class="column2">
        <a href="${carteMarIt}"><img src="${carteMarIt}" alt="Mar" style="width:90%"></a>
        </div>
        <div class="column2">
        <a href="${carteSixtIt}"><img src="${carteSixtIt}" alt="Sixt" style="width:90%"></a>
        </div>
        <p><strong>Campeggio o bivacco? </strong> </p>
        <p>Il campeggio selvaggio (più notti) è vietato nelle riserve naturali. Il bivacco è regolamentato in alcune zone o aree; per una sola notte, sulla stessa piazzola, con o senza riparo, tra le 19 e le 9 del mattino.</p>
        `
    }
});

export default Home.reducer;
