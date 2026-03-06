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
import Color from "@arcgis/core/Color";
import * as promiseUtils from "@arcgis/core/core/promiseUtils";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";
import Polygon from "@arcgis/core/geometry/Polygon";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { ImmediateClickEvent, PointerMoveEvent } from "@arcgis/core/views/input/types";
import SceneView from "@arcgis/core/views/SceneView";
import { SceneViewGraphicHit } from "@arcgis/core/views/types";
import WebScene from "@arcgis/core/WebScene";
import simplify from "simplify-js";
import CountryPalette from "./CountryPalette";
import RegionEditor from "./RegionEditor";
import SelectedRegion from "./SelectedRegion";

const neonColors = ["#f700dc", "#f8e900", "#9400f6", "#04ebf3", "#35f714"];
const neonColorsLight = ["#f7baf1", "#f7f3ba", "#dcb8f5", "#b6f0f2", "#c3f7ba"];
const neonColorsDark = ["#4d0044", "#4d4700", "#2e004d", "#02484b", "#114d06"];

class CountrySelector {
  selectedRegion: SelectedRegion | null = null;

  readonly regionEditor: RegionEditor;

  private palette = new CountryPalette(
    neonColors.map((hex, i) => {
      return {
        main: new Color(hex),
        dark: new Color(neonColorsDark[i]),
        light: new Color(neonColorsLight[i]),
      };
    })
  );

  constructor(private view: SceneView, private webScene: WebScene) {
    view.popupEnabled = false;

    this.regionEditor = new RegionEditor(view, webScene, this.palette);

    this.scheduleEventListener();
  }

  private async queryRegion(e: PointerMoveEvent | ImmediateClickEvent, serverSide = false) {
    const include = this.webScene.allLayers.filter(
      l => l.type === "feature" || l.type === "graphics"
    );

    const htResult = await this.view.hitTest(e, {
      include,
    });

    const results = htResult.results.filter(r => r.type === "graphic");

    function layerIndex(r: SceneViewGraphicHit) {
      const layer = r.graphic.layer;
      return layer ? include.findIndex(l => l === layer) : -1;
    }

    if (results.length) {
      results.sort((a, b) => {
        // Intentionally reversing order
        return layerIndex(b) - layerIndex(a);
      });

      const graphic = results[0].graphic;
      const layer = graphic.layer;
      const objectId = graphic.getObjectId();
      const geometry = graphic.geometry;
      if (
        !!layer &&
        layer.type === "feature" &&
        layer instanceof FeatureLayer &&
        objectId != null &&
        !!geometry &&
        serverSide
      ) {
        const query = layer.createQuery();
        query.returnGeometry = true;
        query.objectIds = [objectId];
        query.outSpatialReference = geometry.spatialReference;
        const response = await layer.queryFeatures(query);
        if (response.features.length) {
          return response.features[0];
        }
      }
      return graphic;
    }
  }

  private resetRegion() {
    const region = this.selectedRegion;
    if (region) {
      region.removeHighlight();
      this.selectedRegion = null;
    }
  }

  private highlightAtPointer = promiseUtils.debounce(async (e: PointerMoveEvent) => {
    if (this.regionEditor.active || this.view.interacting) {
      return;
    }

    const color = this.palette.selectionColor;
    if (!color) {
      // Out of colors, no more highlighting
      return;
    }

    const graphic = await this.queryRegion(e);

    const layer = graphic?.layer;

    if (graphic && layer && layer.type !== "graphics") {
      const selection = this.selectedRegion;
      if (selection?.equalsGraphic(graphic)) {
        return;
      } else {
        this.selectedRegion = new SelectedRegion(graphic, color);
        await this.selectedRegion.highlight(this.view);

        if (selection) {
          selection.removeHighlight();
        }
      }
    } else {
      this.resetRegion();
    }
  });

  private selectAtPointer = promiseUtils.debounce(async (e: ImmediateClickEvent) => {
    if (this.regionEditor.active) {
      return;
    }

    const graphic = await this.queryRegion(e, true);

    if (graphic) {
      const layer = graphic.layer;
      const color = this.palette.selectionColor;
      if (layer?.type === "graphics") {
        this.regionEditor.continueEditing(graphic);
      } else if (color) {
        const clone = graphic.clone();
        const geometry = clone.geometry as Polygon;

        // The further the country is in the north / south, the more we have to simplify
        const extent = geometry.extent;
        const ymax = extent ? Math.max(Math.abs(extent.ymax), Math.abs(extent.ymin)) : 0;
        const tolerance = ymax / 2500;

        let rings = geometry.rings;
        const maxLength = rings.reduce((acc, cur) => Math.max(cur.length, acc), 0);

        // Filter small islands around main land
        rings = rings.filter(r => r.length > maxLength / 10);

        // Simplify remaining rings
        rings = rings.map(ring => {
          const points = ring.map(c => {
            return { x: c[0], y: c[1] };
          });
          const simplified = simplify(points, tolerance);
          return simplified.map(p => [p.x, p.y]);
        });

        geometry.rings = rings;

        this.regionEditor.editSelection(new SelectedRegion(clone, color));
        this.resetRegion();
        await whenOnce(() => this.regionEditor.active);
      }
    }
  });

  private scheduleEventListener() {
    /* Prevent highlighting regions while SVM warms up */
    let preventHighlight = false;

    this.view.on("pointer-move", e => {
      if (!preventHighlight) {
        try {
          void this.highlightAtPointer(e);
        } catch {
          /* Ignore bounced calls */
        }
      }
    });

    this.view.on("immediate-click", e => {
      preventHighlight = true;
      void this.selectAtPointer(e).finally(() => {
        preventHighlight = false;
      });
    });
  }
}

export default CountrySelector;
