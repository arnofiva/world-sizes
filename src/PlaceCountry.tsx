import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import * as promiseUtils from "@arcgis/core/core/promiseUtils";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";
import { countryLabel } from "./countryUtils";
import { map, palette, view } from "./globals";
import RegionEditor from "./RegionEditor";
import SelectedRegion from "./SelectedRegion";

@subclass("TrueSize.PlaceCountry")
export class PlaceCountry extends Widget {
  @property()
  selectedRegion: SelectedRegion | null = null;

  @property()
  regionEditor = new RegionEditor();

  postInitialize() {
    view.popup.autoOpenEnabled = false;

    this.scheduleEventListener();
  }

  render() {
    const region = this.selectedRegion;

    return (
      <div class="place-country">
        <span>{region ? "Compare " + countryLabel(region.graphic) : ""}</span>
      </div>
    );
  }

  private async queryRegion(e: MouseEvent) {
    const include = map.allLayers.filter(
      (l) => l.type === "feature" || l.type === "graphics"
    );

    const htResult = await view.hitTest(e, {
      include,
    });

    const results = htResult.results;

    function layerIndex(r: __esri.SceneViewHitTestResultResults) {
      return include.indexOf(r.graphic.layer);
    }

    if (results.length) {
      results.sort((a, b) => {
        // Intentionally reversing order
        return layerIndex(b) - layerIndex(a);
      });

      return results[0].graphic;
    }
  }

  private resetRegion() {
    const region = this.selectedRegion;
    if (region) {
      region.removeHighlight();
      this.selectedRegion = null;
    }
  }

  private highlightAtPointer = promiseUtils.debounce(async (e: MouseEvent) => {
    if (this.regionEditor.active || view.interacting) {
      return;
    }

    const color = palette.selectionColor;
    if (!color) {
      // Out of colors, no more highlighting
      return;
    }

    const graphic = await this.queryRegion(e);

    if (
      graphic &&
      !this.regionEditor.active &&
      graphic.layer.type !== "graphics"
    ) {
      const selection = this.selectedRegion;
      if (selection && selection.equalsGraphic(graphic)) {
        return;
      } else {
        this.selectedRegion = new SelectedRegion({
          graphic,
          color,
        });
        await this.selectedRegion.highlight(view);

        if (selection) {
          selection.removeHighlight();
        }
      }
    } else {
      this.resetRegion();
    }
  });

  private selectAtPointer = promiseUtils.debounce(async (e: MouseEvent) => {
    if (this.regionEditor.active) {
      return;
    }

    const graphic = await this.queryRegion(e);

    if (graphic) {
      const color = palette.selectionColor;
      if (graphic.layer.type === "graphics") {
        this.regionEditor.continueEditing(graphic);
      } else if (color) {
        e.preventDefault();

        this.regionEditor.editSelection(
          new SelectedRegion({
            color,
            graphic,
          })
        );
        this.resetRegion();
        await watchUtils.whenOnce(this.regionEditor, "active");
      }
    }
  });

  private scheduleEventListener() {
    /* Prevent highlighting regions while SVM warms up */
    let preventHighlight = false;

    view.on("pointer-move", async (e) => {
      if (!preventHighlight) {
        try {
          await this.highlightAtPointer(e);
        } catch {
          /* Ignore bounced calls */
        }
      }
    });

    view.on("immediate-click", async (e) => {
      preventHighlight = true;
      await this.selectAtPointer(e);
      preventHighlight = false;
    });
  }
}
