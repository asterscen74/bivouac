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
                fields: ["bivouac","nom","color","fillcolor"],
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
