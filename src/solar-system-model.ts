import { objects } from "./solar-system-data";

export type ObjectName = keyof typeof objects;
export const objectNames = Object.keys(objects) as ObjectName[];

export interface Orbit {
  name: ObjectName;
  objectRadius: number;
  orbitRadius: number;
}

export type Orbits = { [Name in ObjectName]: Orbit };

export function scaleBy(object: ObjectName, radius: number): Orbits {
  const scaleObject = objects[object];
  const scale = scaleObject.objectRadius / radius;

  console.log("Scale 1:%d", scale);

  const orbits: Partial<Orbits> = {};
  for (const name of objectNames) {
    const o = objects[name];
    orbits[name] = {
      name,
      objectRadius: o.objectRadius / scale,
      orbitRadius: o.oribitRadius / scale
    };
  }
  return orbits as Orbits;
}
