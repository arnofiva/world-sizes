import Color from "@arcgis/core/Color";
import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";
import { map, view } from "./globals";
import { PlaceCountry } from "./PlaceCountry";

const regionSelector = new PlaceCountry();

@subclass("TrueSize.App")
export default class App extends Widget {
  @property({ readOnly: true })
  editor = regionSelector.regionEditor;

  private white = {
    light: new Color([200, 200, 200]),
    main: new Color([80, 80, 80]),
    dark: new Color([20, 20, 20]),
  };

  postInitialize() {
    view.ui.add([
      {
        component: "title",
        position: "top-left",
        index: 0,
      },
    ]);
    view.ui.add(regionSelector, "manual");

    map.loadAll().then(async () => {
      map.allLayers
        .filter((l) => l.type === "feature")
        .map((l) => l as FeatureLayer)
        .forEach((l) => {
          if (l.fields.find((f) => f.name === "NAME")) {
            l.outFields = ["NAME"];
          } else if (l.fields.find((f) => f.name === "COUNTRY")) {
            l.outFields = ["COUNTRY"];
          }
        });
    });
  }

  render() {
    return (
      <div class="widgets">{/* {this.regions.map((c) => c.render())} */}</div>
    );
  }
}
