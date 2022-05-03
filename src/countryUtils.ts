import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import { FillSymbol3DLayer, PolygonSymbol3D } from "@arcgis/core/symbols";
import SceneView from "@arcgis/core/views/SceneView";
import { CountryColor } from "./CountryPalette";

const largestRing = (polygon: Polygon) => {
  let lastArea = -1;
  let result = polygon;

  polygon.rings.forEach((ring) => {
    const current = new Polygon({
      spatialReference: polygon.spatialReference,
      rings: [ring],
    });

    const area = geometryEngine.geodesicArea(current, "square-meters");
    if (lastArea < area) {
      lastArea = area;
      result = current;
    }
  });

  return result;
};

export function countryLabel(region: Graphic) {
  const label = region.getAttribute("label");
  if (label) {
    return label;
  }

  const layer = region.layer;
  if (layer.type === "feature") {
    return region.getAttribute("NAME") || region.getAttribute("COUNTRY");
  }
}

projection.load();

export function graphicFromCountry(
  selectedRegion: Graphic,
  view: SceneView,
  color: CountryColor
) {
  const label = countryLabel(selectedRegion);

  // Need to do things in WGS84 otherwise 180 meridian causes trouble...
  const geometry = projection.project(
    selectedRegion.geometry,
    SpatialReference.WGS84
  ) as Polygon;

  const fill = color.main.clone();
  fill.a = 0.2;

  const halo = color.light.clone();
  halo.a = 0.9;

  return new Graphic({
    attributes: {
      label,
      ...selectedRegion.attributes,
    },
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
