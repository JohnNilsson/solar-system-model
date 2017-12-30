import "./favicon.ico";
import "leaflet/dist/leaflet.css";
import "./index.css";
import * as L from "leaflet";

function createMapElement() {
  const map = document.createElement("div");
  map.id = "map";
  map.style.height = "100%";
  return document.body.appendChild(map);
}

function createMap() {
  return L.map(createMapElement());
}

const map = createMap();

const mapBoxToken =
  "pk.eyJ1IjoiY3VyaW91c3NrZXB0aWMiLCJhIjoiY2pic2dyb3ZyMTZpdTMyczRnMGJ6cjRmYiJ9.CMEEUpBurx32zH3usKXJnQ";
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 22,
    id: "mapbox.satellite",
    accessToken: mapBoxToken
  }
).addTo(map);

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
