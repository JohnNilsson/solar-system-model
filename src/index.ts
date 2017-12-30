import "./favicon.ico";
import "leaflet/dist/leaflet.css";
import "./index.css";
import * as L from "leaflet";
import * as mapbox from "./mapbox-tiles";

function createMapElement() {
  const map = document.createElement("div");
  map.id = "map";
  map.style.height = "100%";
  return document.body.appendChild(map);
}

function createMap() {
  return L.map(createMapElement(), {
    layers: [mapbox.satellite]
  });
}

const map = createMap();


if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const center: L.LatLngTuple = [coords.latitude, coords.longitude];
      map.setView(center, 17);
      setSolarSystemPostition(center);
    },
    error => console.log(error),
    { enableHighAccuracy: true }
  );
}
