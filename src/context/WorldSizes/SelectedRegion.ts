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
import { ResourceHandle } from "@arcgis/core/core/Handles";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneView from "@arcgis/core/views/SceneView";
import { CountryColor } from "./CountryPalette";

function regionHash(region: Graphic) {
  return `${region.layer?.id ?? "unknown"}_${region.getObjectId()}`;
}

export default class SelectedRegion {
  private highlightHandle: ResourceHandle | undefined;

  constructor(readonly graphic: Graphic, readonly color: CountryColor) {}

  equalsGraphic(graphic: Graphic) {
    return regionHash(this.graphic) === regionHash(graphic);
  }

  async highlight(view: SceneView) {
    if (this.highlightHandle) {
      return;
    }

    view.highlights = [
      {
        color: this.color.main,
        // fillOpacity: 0.2,
        // haloColor: this.color.main,
        // haloOpacity: 0.7,
      },
    ];

    const region = this.graphic;
    const lv = await view.whenLayerView(region.layer as FeatureLayer);
    const handle = lv.highlight(region);

    this.highlightHandle = handle;
  }

  removeHighlight() {
    const handle = this.highlightHandle;
    if (handle) {
      handle.remove();
    }
  }
}
