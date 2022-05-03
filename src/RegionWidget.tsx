import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import { Polygon } from "@arcgis/core/geometry";
import Point from "@arcgis/core/geometry/Point";
import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";
import { view } from "./globals";
import PolygonTransform from "./PolygonTransform";
import SelectedRegion from "./SelectedRegion";

@subclass("TrueSize.RegionWidget")
export class RegionWidget extends Widget {
  @property()
  region: SelectedRegion;

  private canvas: HTMLCanvasElement;

  postInitialize() {
    this.watch("country", () => this.updateView());
  }

  render() {
    return (
      <div class="country">
        <canvas afterCreate={this.storeNode} bind={this}></canvas>
        <div>{this.region.label}</div>
        <div>Population: {this.region.population}</div>
        <div>GDP: {this.region.gdp}</div>
        <div>Size: {this.region.area}</div>
      </div>
    );
  }

  private updateView() {
    const canvas = this.canvas;
    if (!canvas || !this.region) {
      return;
    }

    const context = canvas.getContext("2d")!;

    const width = 100;
    const height = 100;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const graphic = this.region.graphic;
    let geometry = graphic.geometry as Polygon;
    const transform = new PolygonTransform(view);
    geometry = transform.moveTo(
      geometry,
      new Point({
        x: 0,
        y: 0,
      })
    );
    // geometry = geometryEngine.generalize(geometry, 5, true, "kilometers") as Polygon;

    const eWidth = geometry.extent.width;
    const eHeight = geometry.extent.height;

    const label = this.region.label;

    const maxWidth = 10000000;
    //  8244020.190026198
    const maxHeight = 5000000;
    4423830.284610238;
    // 4359441.352472635
    // 3880774.554917282
    const weight = 0.2;
    const xScale = 1 - weight + (weight * geometry.extent.width) / maxWidth;
    const yScale = 1 - weight + (weight * geometry.extent.height) / maxHeight;
    const scale = Math.min(xScale, yScale);

    // const scale = 1 - weight * (1 + (eWidth * eHeight) / (maxWidth * maxHeight));

    console.log({ label, eWidth, eHeight, scale });

    // const size = Math.max(geometry.extent.width, geometry.extent.height);
    // const areaScale = (0.5 * graphic.getAttribute("Shape__Area")) / 14882440683844 + 0.5 || 1;

    const path = this.createPathFromPolygon(
      geometry,
      width * window.devicePixelRatio,
      height * window.devicePixelRatio,
      scale
    );

    context.lineWidth = 5;
    context.strokeStyle = `${this.region.color.main}`;
    context.stroke(path);

    context.lineWidth = 1.5;
    context.strokeStyle = `${this.region.color.light}`;
    context.stroke(path);
  }

  private storeNode(e: HTMLCanvasElement) {
    this.canvas = e;
    this.updateView();
  }

  private createPathFromPolygon(
    polygon: Polygon,
    width: number,
    height: number,
    areaScale: number
  ) {
    const bounds = this.getBounds(polygon);
    const geomWidth = bounds[2] - bounds[0];
    const geomHeight = bounds[3] - bounds[1];
    const scale = Math.min(height / geomHeight, width / geomWidth) * areaScale;
    // center translation

    const tx = bounds[0] - (width - geomWidth * scale) / 2 / scale;
    const ty = bounds[3] + (height - geomHeight * scale) / 2 / scale;

    const x = (x: number) => Math.round((x - tx) * scale);
    const y = (y: number) => Math.round((ty - y) * scale);

    const path = new Path2D();
    for (const ring of polygon.rings) {
      path.moveTo(x(ring[0][0]), y(ring[0][1]));
      for (let i = 1; i < ring.length; i++) {
        path.lineTo(x(ring[i][0]), y(ring[i][1]));
      }
      path.closePath();
    }

    return path;
  }

  private getBounds(polygon: Polygon) {
    const bounds = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ];
    for (const ring of polygon.rings) {
      for (const point of ring) {
        bounds[0] = Math.min(bounds[0], point[0]);
        bounds[1] = Math.min(bounds[1], point[1]);
        bounds[2] = Math.max(bounds[2], point[0]);
        bounds[3] = Math.max(bounds[3], point[1]);
      }
    }
    return bounds;
  }
}
