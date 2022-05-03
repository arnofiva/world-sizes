import Accessor from "@arcgis/core/core/Accessor";
import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneView from "@arcgis/core/views/SceneView";
import { CountryColor } from "./CountryPalette";

interface SelectedRegionProps {
  color: CountryColor;
  graphic: Graphic;
}

function regionHash(region: Graphic) {
  return `${region.layer.id}_${region.getObjectId()}`;
}

@subclass("TrueSize.SelectedRegion")
export default class SelectedRegion extends Accessor {
  @property({ constructOnly: true })
  color: CountryColor;

  @property({ constructOnly: true })
  graphic: Graphic;

  @property()
  private highlightHandle: IHandle;

  constructor(props: SelectedRegionProps) {
    super(props);
  }

  equalsGraphic(graphic: Graphic) {
    return regionHash(this.graphic) === regionHash(graphic);
  }

  async highlight(view: SceneView) {
    if (this.highlightHandle) {
      return;
    }

    view.highlightOptions = {
      color: this.color.light,
      fillOpacity: 1,
      haloColor: this.color.main,
      haloOpacity: 0.7,
    };

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
