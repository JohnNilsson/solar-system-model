import "leaflet/dist/leaflet.css";
import {
  circle,
  Circle,
  LatLngExpression,
  LatLngTuple,
  layerGroup,
  LeafletMouseEvent,
  Map,
  map,
  Layer,
  LayerGroup
} from "leaflet";
import * as mapbox from "./mapbox-tiles";
import { Orbit, Orbits } from "./solar-system-model";

export class SolarSystemMapElement extends HTMLElement {
  private readonly map: Map;
  private readonly ssl: LayerGroup = layerGroup();

  private orbits: Orbits | null = null;
  public orbitsCenter: LatLngExpression | null = null;

  constructor() {
    super();

    this.map = map(this, {
      layers: [mapbox.satellite]
    });

    this.map.addLayer(this.ssl);

    this.map.on("click", e => {
      const { latlng } = e as LeafletMouseEvent;
      if (this.orbits !== null) {
        this.setOrbits(latlng, this.orbits);
      }
    });
  }

  public setView(center: LatLngExpression, zoom: number) {
    this.map.setView(center, zoom);
  }

  public setOrbits(center: LatLngExpression | null, orbits: Orbits | null) {
    if (center) {
      this.orbitsCenter = center;
    }
    if (orbits) {
      this.orbits = orbits;
    }
    if (this.orbitsCenter == null || this.orbits == null) {
      return;
    }
    this.ssl.clearLayers();
    for (const orbit of Object.values(this.orbits))
      this.ssl.addLayer(createOrbitalObjectLayer(orbit, this.orbitsCenter));
  }
}
window.customElements.define("solar-system-map", SolarSystemMapElement);

function createOrbitalObjectLayer(
  { name, objectRadius, orbitRadius }: Orbit,
  center: LatLngExpression
) {
  const isSun = orbitRadius === 0;
  if (isSun) {
    return circle(center, {
      color: "yellow",
      fillColor: "yellow",
      fillOpacity: 0.8,
      radius: objectRadius
    });
  } else {
    return circle(center, {
      color: "white",
      fillColor: "transparent",
      weight: 2,
      radius: orbitRadius
    });
  }
}
