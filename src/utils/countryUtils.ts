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
import * as projectOperator from "@arcgis/core/geometry/operators/projectOperator";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";

import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import { CountryColor } from "../context/WorldSizes/CountryPalette";

export function countryLabel(region: Graphic) {
  const label: unknown =
    region.getAttribute("label") ?? region.getAttribute("NAME") ?? region.getAttribute("COUNTRY");

  return typeof label === "string" ? label : "";
}

void projectOperator.load();

export function graphicFromCountry(selectedRegion: Graphic, color: CountryColor) {
  if (!selectedRegion.geometry) {
    throw new Error("Selected region has no geometry.");
  }

  const label = countryLabel(selectedRegion);

  // Need to do things in WGS84 otherwise 180 meridian causes trouble...

  const geometry = projectOperator.execute(selectedRegion.geometry, SpatialReference.WGS84);

  if (!geometry) {
    throw new Error("Unable to project selected region geometry.");
  }

  const fill = color.main.clone();
  fill.a = 0.2;

  const halo = color.light.clone();
  halo.a = 0.9;

  return new Graphic({
    attributes: {
      label,
      ...selectedRegion.attributes,
    } as Record<string, unknown>,
    geometry,
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: [0, 0, 0, 0],
          },
          outline: {
            color: color.main,
            size: 3,
          },
        }),
        new FillSymbol3DLayer({
          material: {
            color: fill,
          },
          outline: {
            color: color.light,
            size: 1.2,
          },
        }),
      ],
    }),
  });
}
