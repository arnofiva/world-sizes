import Accessor from "@arcgis/core/core/Accessor";
import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import Handles from "@arcgis/core/core/Handles";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import { countryLabel, graphicFromCountry } from "./countryUtils";
import { view } from "./globals";
import PolygonTransform from "./PolygonTransform";
import SelectedRegion from "./SelectedRegion";

const polygonTransform = new PolygonTransform(view);

interface TransformedRegionProps {
  selection: SelectedRegion;
}

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

@subclass("TrueSize.TransformedRegion")
export default class TransformedRegion extends Accessor {
  @property({ constructOnly: true })
  selection: SelectedRegion;

  @property()
  graphic: Graphic;

  @property()
  center = new Graphic({
    symbol: centerSymbol,
  });

  @property()
  label: Graphic;

  @property({ readOnly: true })
  get angle() {
    const symbol = this.center.symbol as PointSymbol3D;
    const symbolLayer = symbol.symbolLayers.getItemAt(0) as ObjectSymbol3DLayer;
    return symbolLayer.heading;
  }

  @property()
  private handlers = new Handles();

  constructor(props: TransformedRegionProps) {
    super(props);

    const color = props.selection.color;
    const region = (this.graphic = graphicFromCountry(
      props.selection.graphic,
      view,
      color
    ));

    const centroid = (region.geometry as Polygon).centroid;
    this.center.geometry = centroid;

    const text = countryLabel(props.selection.graphic);

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
      this.watch("center.geometry", (center: Point) => {
        this.graphic.geometry = polygonTransform.moveTo(
          this.graphic.geometry as Polygon,
          center
        );
        this.label.geometry = center;
      })
    );

    this.handlers.add(
      this.watch("angle", (newAngle: number, oldAngle = 0) => {
        const rad = ((oldAngle - newAngle) * Math.PI) / 180;
        this.graphic.geometry = polygonTransform.rotate(
          this.graphic.geometry as Polygon,
          rad
        );
      })
    );
  }

  destroy(): void {
    this.handlers.removeAll();
  }
}
