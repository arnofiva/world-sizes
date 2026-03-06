/**
 * Copyright 2026 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Handles from "@arcgis/core/core/Handles";
import { watch } from "@arcgis/core/core/reactiveUtils";
import * as centroidOperator from "@arcgis/core/geometry/operators/centroidOperator";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import { countryLabel, graphicFromCountry } from "../../utils/countryUtils";
import PolygonTransform from "./PolygonTransform";
import SelectedRegion from "./SelectedRegion";

const centerSymbol = new PointSymbol3D({
  symbolLayers: [
    new ObjectSymbol3DLayer({
      material: {
        color: [0, 0, 0, 0],
      },
      width: 5_000,
      height: 5_000,
      depth: 5_000,
      resource: {
        primitive: "diamond",
      },
    }),
  ],
});

export default class TransformedRegion {
  readonly graphic: Graphic;

  readonly center: Graphic;

  readonly label: Graphic;

  get angle() {
    const symbol = this.center.symbol as PointSymbol3D;
    const symbolLayer = symbol.symbolLayers.getItemAt(0) as ObjectSymbol3DLayer;
    return symbolLayer.heading;
  }

  private handlers = new Handles();

  constructor(public selection: SelectedRegion, polygonTransform: PolygonTransform) {
    const color = selection.color;
    this.graphic = graphicFromCountry(selection.graphic, color);

    const countryGeometry = this.graphic.geometry;

    if (!countryGeometry) {
      throw new Error("Selected region geometry is undefined.");
    }

    const centroid = centroidOperator.execute(countryGeometry);

    this.center = new Graphic({
      geometry: centroid,
      symbol: centerSymbol,
    });

    const text = countryLabel(selection.graphic);

    const halo = color.main.clone();
    halo.a = 0.7;

    this.label = new Graphic({
      geometry: centroid.clone(),
      symbol: new PointSymbol3D({
        symbolLayers: [
          new TextSymbol3DLayer({
            text,
            material: {
              color: [255, 255, 255, 0.9], //outlineColor
            },
            halo: {
              size: 0.5,
              color: color.dark, // [0, 0, 0, 0.8]
            },
            font: {
              size: 12,
            },
          }),
        ],
      }),
    });

    this.handlers.add(
      watch(
        () => this.center.geometry,
        center => {
          if (center?.type === "point") {
            this.graphic.geometry = polygonTransform.moveTo(
              this.graphic.geometry as Polygon,
              center
            );
            this.label.geometry = center;
          }
        }
      )
    );

    this.handlers.add(
      watch(
        () => this.angle,
        (newAngle, oldAngle) => {
          if (newAngle) {
            const rad = (((oldAngle ?? 0) - newAngle) * Math.PI) / 180;
            this.graphic.geometry = polygonTransform.rotate(this.graphic.geometry as Polygon, rad);
          }
        }
      )
    );
  }

  destroy(): void {
    this.handlers.removeAll();
  }
}
