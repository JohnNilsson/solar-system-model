import { tileLayer } from "leaflet";

const accessToken =
  "pk.eyJ1IjoiY3VyaW91c3NrZXB0aWMiLCJhIjoiY2pic2dyb3ZyMTZpdTMyczRnMGJ6cjRmYiJ9.CMEEUpBurx32zH3usKXJnQ";

const urlTemplate =
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}";

const attribution =
  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

export const satellite = tileLayer(urlTemplate, {
  attribution,
  maxZoom: 22,
  id: "mapbox.satellite",
  accessToken
});
