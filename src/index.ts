import "./favicon.ico";
import "leaflet/dist/leaflet.css";
import "./index.css";
import * as L from "leaflet";
import * as mapbox from "./mapbox-tiles";
import * as model from "./solar-system-model";

function createMapElement() {
  const map = document.createElement("div");
  map.id = "map";
  map.style.height = "100%";
  return document.body.appendChild(map);
}

function createOrbitalObjectLayer({
  name,
  objectRadius,
  orbitRadius
}: model.Orbit) {
  const isSun = orbitRadius === 0;
  if (isSun) {
    return L.circle([0, 0], {
      color: "yellow",
      fillColor: "yellow",
      fillOpacity: 0.8,
      radius: objectRadius
    });
  } else {
    return L.circle([0, 0], {
      color: "white",
      fillColor: "transparent",
      weight: 2,
      radius: orbitRadius
    });
  }
}
function createSolarSystemLayer() {
  const modelObjects = model.scaleBy("sun", 0.06);
  console.log(modelObjects);
  const objectLayers = modelObjects.map(createOrbitalObjectLayer);
  return L.layerGroup(objectLayers);
}

function createMap() {
  return L.map(createMapElement(), {
    layers: [mapbox.satellite]
  });
}

const ssl = createSolarSystemLayer();
const map = createMap();
map.addLayer(ssl);

function setSolarSystemPostition(center: L.LatLngExpression) {
  ssl.eachLayer(l => {
    const c = l as L.Circle;
    c.setLatLng(center);
  });
}

map.on("click", e => {
  const { latlng } = e as L.LeafletMouseEvent;
  setSolarSystemPostition(latlng);
});

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
