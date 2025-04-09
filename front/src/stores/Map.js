import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    initialDisplay: {
        defaultCenter: [45.9165, 6.8389],
        defaultZoom: 10,
        defaultLayers: {
            "aires_de_protection": {
                name: "aires_de_protection",
                fields: ["type","nom","color","fillcolor"],
                style: {
                    attributeColor: "color",
                    color: "",
                    attributeFillColor: "fillcolor",
                    fillColor: "",
                    fillOpacity: 0.2,
                    weight: 2
                }
            },
            "zonage_bivouac": {
                name: "zonage_bivouac",
                fields: ["bivouac","nom","color","fillcolor","capacite","report","reglementation","reservable","quotas"],
                style: {
                    attributeColor: "color",
                    color: "",
                    attributeFillColor: "fillcolor",
                    fillColor: "",
                    fillOpacity: 0.2,
                    weight: 2
                }
            }
        },
        defaultBaseLayers: [
            {
              name: "OpenStreetMap",
              attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>OpenStreetMap</a> contributors',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            },
            {
              name: "IGN Scan 25",
              layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR",
              attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>',
              url: 'https://wxs.ign.fr/0sm9hm0lu0i25mqne5p5s85r/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg'
            }
        ],
        defaultSitesZones: {
            "chamonix": {
                name: "Chamonix",
                center: [45.9670, 6.8389],
                zoom: 12,
                type: "site",
            },
            "contamines_montjoie": {
                name: "Contamines Montjoie",
                center: [45.7770, 6.7489],
                zoom: 12,
                type: "site",
            },
            "aire_bivouac_balme": {
                name: "Aire de bivouac de la Balme",
                center: [45.7587, 6.7097],
                zoom: 15,
                type: "zone"
            },
            "aire_bivouac_giettaz": {
                name: "Aire de bivouac de la Giettaz",
                center: [45.7735, 6.7175],
                zoom: 13,
                type: "zone"
            },
            "col_bellachat_brevent": {
                name: "Col de Bellachat et lac du Brévent",
                center: [45.9271, 6.8290],
                zoom: 13,
                type: "zone"
            },
            "col_montets": {
                name: "Col des Montets",
                center: [45.9971, 6.9193],
                zoom: 13,
                type: "zone"
            },
            "combe_barme": {
                name: "Combe de Barme",
                center: [45.9814, 6.8525],
                zoom: 13,
                type: "zone"
            },
            "vallorcine": {
                name: "Commune de Vallorcine",
                center: [46.0301, 6.9263],
                zoom: 13,
                type: "zone"
            },
            "envers_aiguilles_rouges": {
                name: "Envers des Aiguilles Rouges",
                center: [45.9550, 6.8372],
                zoom: 13,
                type: "zone"
            },
            "foret_carlaveyron": {
                name: "Forêt de Carlaveyron",
                center: [45.9313, 6.8013],
                zoom: 13,
                type: "zone"
            },
            "foret_joux": {
                name: "Forêt de la Joux",
                center: [45.9757, 6.9067],
                zoom: 13,
                type: "zone"
            },
            "foret_vallorcine": {
                name: "Forêt de Vallorcine",
                center: [46.0111, 6.8990],
                zoom: 13,
                type: "zone"
            },
            "lac_blanc": {
                name: "Lac Blanc",
                center: [45.9819, 6.8906],
                zoom: 13,
                type: "zone"
            },
            "lac_cornu_lacs_noirs": {
                name: "Lac Cornu et Lacs Noirs",
                center: [45.9610, 6.8495],
                zoom: 13,
                type: "zone"
            },
            "cheserys": {
                name: "Les Cheserys",
                center: [45.9784, 6.8984],
                zoom: 13,
                type: "zone"
            },
            "lacs_jovet": {
                name: "Les Lacs Jovet",
                center: [45.7545, 6.7299],
                zoom: 13,
                type: "zone"
            },
            "montjus": {
                name: "Montjus",
                center: [45.9957, 6.8435],
                zoom: 13,
                type: "zone"
            },
            "plateau_carlaveyron": {
                name: "Plateau de Carlaveyron",
                center: [45.9253, 6.8156],
                zoom: 13,
                type: "zone"
            },
            "posettes": {
                name: "Posettes",
                center: [46.0032, 6.9299],
                zoom: 13,
                type: "zone"
            },
            "praz_torrent": {
                name: "Praz Torrent",
                center: [46.0055, 6.9104],
                zoom: 13,
                type: "zone"
            },
            "remuaz": {
                name: "Remuaz",
                center: [45.9940, 6.9106],
                zoom: 13,
                type: "zone"
            },
            "reserve_naturelle_passy": {
                name: "Réserve Naturelle Nationale de Passy",
                center: [45.9780, 6.8038],
                zoom: 13,
                type: "zone"
            },
            "reserve_naturelle_contamines": {
                name: "Réserve Naturelle Nationale des Contamines-Montjoie",
                center: [45.7832, 6.7479],
                zoom: 13,
                type: "zone"
            },
            "reserve_naturelle_sixt": {
                name: "Réserve Naturelle Nationale de Sixt-Fer-à-Cheval Passy",
                center: [46.0497, 6.8193],
                zoom: 13,
                type: "zone"
            },
            "ruines_arleve": {
                name: "Ruines d'Arlevé",
                center: [45.9558, 6.8333],
                zoom: 13,
                type: "zone"
            },
            "secteur_perseverance": {
                name: "Secteur Persévérance",
                center: [45.9939, 6.8939],
                zoom: 13,
                type: "zone"
            },
            "vallon_berard": {
                name: "Vallon de Bérard",
                center: [45.9980, 6.8728],
                zoom: 13,
                type: "zone"
            },
            "vallon_berard_replat": {
                name: "Vallon de Bérard replat",
                center: [46.0043, 6.8712],
                zoom: 13,
                type: "zone"
            }
        },
        centroidesContaminesZonesTolerees: [
            { lat: 45.7587242404128, lon: 6.70966921430888 },
            { lat: 45.7735225609917, lon: 6.71745227558621 }
        ]
    },
  },
//   reducers: {},
});


// export const {} = map.actions;

export default map.reducer;
