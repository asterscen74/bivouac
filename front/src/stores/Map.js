import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    initialDisplay: {
        defaultCenter: [45.8756, 6.8389],
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
        defaultSites: {
            "chamonix": {
                name: "Chamonix",
                center: [45.9670, 6.8389],
                zoom: 12
            },
            "contamines_montjoie": {
                name: "Contamines Montjoie",
                center: [45.7770, 6.7489],
                zoom: 12
            }
        }
    },
  },
//   reducers: {},
});

// export const {} = map.actions;

export default map.reducer;
