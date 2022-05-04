import Accessor from "@arcgis/core/core/Accessor";
import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import Collection from "@arcgis/core/core/Collection";
import Handles from "@arcgis/core/core/Handles";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { map, palette, view } from "./globals";
import PolygonTransform from "./PolygonTransform";
import SelectedRegion from "./SelectedRegion";
import TransformedRegion from "./TransformedRegion";

@subclass("TrueSize.RegionEditor")
export default class RegionEditor extends Accessor {
  @property()
  sketchViewModel: SketchViewModel;

  @property()
  sketchLayer: GraphicsLayer;

  @property()
  graphicsLayer: GraphicsLayer;

  @property()
  regions: Collection<TransformedRegion> = new Collection();

  @property()
  handles = new Handles();

  @property()
  get active() {
    return this.sketchViewModel.state === "active";
  }

  @property({ readOnly: true })
  interactive = false;

  @property()
  loading = false;

  initialize() {
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

    map.loadAll().then(() => {
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

    const polygonTransform = new PolygonTransform(view);

    // This needs to move somewhere else:
    let lastAngle = 0;
    this.sketchViewModel.on("update", (ev) => {
      if (ev.state !== "active" || !ev.graphics.length) {
        return;
      }

      const region = this.regionFromGraphic(ev.graphics[0]);
      const toolType = ev.toolEventInfo.type;

      if (toolType === "move-start" || toolType === "rotate-start") {
        this._set("interactive", true);
      }

      if (toolType === "move-stop" || toolType === "rotate-stop") {
        this._set("interactive", false);
        if (toolType === "move-stop") {
          view.goTo(region.center.geometry);
        }
      }
    });

    this.sketchViewModel.on("delete", (event) => {
      event.graphics
        .map((g) => this.regionFromGraphic(g))
        .forEach((region) => {
          this.graphicsLayer.remove(region.graphic);
          this.graphicsLayer.remove(region.label);
          this.regions.remove(region);
          palette.reinstate(region.selection.color);
        });
    });
  }

  public cancelEditing() {
    this.sketchViewModel.cancel();
    this.handles.removeAll();
  }

  private regionFromGraphic(graphic: Graphic) {
    return this.regions.find((region) => {
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
      this.sketchViewModel.update(region.center, {
        enableScaling: false,
      });
    }
  }

  public editSelection(selection: SelectedRegion) {
    palette.allocate();

    const region = new TransformedRegion({ selection });

    this.regions.add(region);

    this.sketchLayer.add(region.center);
    this.graphicsLayer.add(region.graphic);
    this.graphicsLayer.add(region.label);

    // view.goTo(country);
    this.continueEditing(selection.graphic);

    view.goTo(region.center.geometry);
  }
}
