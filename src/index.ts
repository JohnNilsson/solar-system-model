import "./index.css";
import * as model from "./solar-system-model";
import { SolarSystemMapElement } from "./SolarSystemMapElement";
import {
  ObjectSizesElement,
  ObjectSizeChangedEvent
} from "./ObjectSizesElement";

const map = new SolarSystemMapElement();
map.id = "map";
const sizes = new ObjectSizesElement();
sizes.id = "sizes";
document.body.appendChild(map);
document.body.appendChild(sizes);

const orbits = model.scaleBy("sun", 0.06);
map.setOrbits(null, orbits);
sizes.orbits = orbits;

sizes.addEventListener(ObjectSizeChangedEvent, ev => {
  console.log(ObjectSizeChangedEvent, ev);
  const e = ev as CustomEvent;
  const { object, size } = e.detail;
  if (object && size > 0) {
    const orbits = model.scaleBy(object, size);
    console.log("orbits", orbits);
    map.setOrbits(null, orbits);
    sizes.orbits = orbits;
  }
});

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const center = [coords.latitude, coords.longitude] as [number, number];
      map.setView(center, 16);
      map.setOrbits(center, null);
    },
    error => console.log(error),
    { enableHighAccuracy: true }
  );
}
