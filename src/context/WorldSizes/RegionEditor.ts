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
import Collection from "@arcgis/core/core/Collection";
import Handles from "@arcgis/core/core/Handles";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { DeleteEvent, UpdateEvent } from "@arcgis/core/widgets/Sketch/types";
import CountryPalette from "./CountryPalette";
import PolygonTransform from "./PolygonTransform";
import SelectedRegion from "./SelectedRegion";
import TransformedRegion from "./TransformedRegion";

export default class RegionEditor {
  sketchViewModel: SketchViewModel;

  sketchLayer: GraphicsLayer;

  graphicsLayer: GraphicsLayer;

  regions = new Collection<TransformedRegion>();

  handles = new Handles();

  private polygonTransform: PolygonTransform;

  get active() {
    return this.sketchViewModel.state === "active";
  }

  loading = false;

  constructor(private view: SceneView, webScene: WebScene, private palette: CountryPalette) {
    this.sketchLayer = new GraphicsLayer({
      title: "Graphics layer for moving country center",
      listMode: "hide",
      elevationInfo: {
        mode: "on-the-ground",
      },
    });

    this.graphicsLayer = new GraphicsLayer({
      title: "Graphics layer for projecting country",
      listMode: "hide",
      elevationInfo: {
        mode: "on-the-ground",
      },
    });

    void webScene.loadAll().then(() => {
      if (!view.map) {
        return;
      }

      view.map.layers.push(this.sketchLayer);
      view.map.layers.push(this.graphicsLayer);
    });

    this.sketchViewModel = new SketchViewModel({
      layer: this.sketchLayer,
      view: view,
      defaultUpdateOptions: {
        toggleToolOnClick: false,
        enableScaling: false,
        enableZ: true,
      },
    });

    this.polygonTransform = new PolygonTransform(view);

    this.sketchViewModel.on("update", (ev: UpdateEvent) => {
      if (ev.state !== "active" || !ev.graphics.length) {
        return;
      }

      const region = this.regionFromGraphic(ev.graphics[0]);
      const toolType = ev.toolEventInfo?.type;

      if (toolType === "move-stop" && region) {
        const geometry = region.center.geometry;
        if (geometry) {
          void view.goTo(geometry);
        }
      }
    });

    this.sketchViewModel.on("delete", (event: DeleteEvent) => {
      event.graphics
        .map(g => this.regionFromGraphic(g))
        .forEach(region => {
          if (!region) {
            return;
          }

          this.graphicsLayer.remove(region.graphic);
          this.graphicsLayer.remove(region.label);
          this.regions.remove(region);
          this.palette.reinstate(region.selection.color);
        });
    });
  }

  public cancelEditing() {
    this.sketchViewModel.cancel();
    this.handles.removeAll();
  }

  private regionFromGraphic(graphic: Graphic) {
    return this.regions.find(region => {
      return (
        region.graphic === graphic ||
        region.selection.graphic === graphic ||
        region.label === graphic ||
        region.center === graphic
      );
    });
  }

  public continueEditing(graphic: Graphic) {
    const region = this.regionFromGraphic(graphic);
    if (region) {
      void this.sketchViewModel.update(region.center, {
        enableScaling: false,
      });
    }
  }

  public editSelection(selection: SelectedRegion) {
    this.palette.allocate();

    const region = new TransformedRegion(selection, this.polygonTransform);

    this.regions.add(region);

    this.sketchLayer.add(region.center);
    this.graphicsLayer.add(region.graphic);
    this.graphicsLayer.add(region.label);

    // view.goTo(country);
    this.continueEditing(selection.graphic);

    const geometry = region.center.geometry;
    if (geometry) {
      void this.view.goTo(geometry);
    }
  }
}
