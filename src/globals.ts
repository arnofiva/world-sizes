import Color from "@arcgis/core/Color";
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import CountryPalette from "./CountryPalette";

const neonColors = ["#f700dc", "#f8e900", "#9400f6", "#04ebf3", "#35f714"];
const neonColorsLight = ["#f7baf1", "#f7f3ba", "#dcb8f5", "#b6f0f2", "#c3f7ba"];
const neonColorsDark = ["#4d0044", "#4d4700", "#2e004d", "#02484b", "#114d06"];

export const palette = new CountryPalette(
  neonColors.map((hex, i) => {
    return {
      main: new Color(hex),
      dark: new Color(neonColorsDark[i]),
      light: new Color(neonColorsLight[i]),
    };
  })
);

export const map = new WebScene({
  portalItem: {
    id: "8e49a0c79bf543fd8fa52b4dd5c9a064",
    // id: "f2a19345eafa407bb4b82ae0a18b1d20",
  },
});

export const view = new SceneView({
  container: "viewDiv",
  map,
  // qualityProfile: "high",
  environment: {
    atmosphereEnabled: false,
    starsEnabled: false,
    lighting: {
      type: "virtual",
    } as any,
  },
  constraints: {
    altitude: {
      min: 3000000,
      max: 30000000,
    },
  },
  padding: {
    top: 20,
  },
});
