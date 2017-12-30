import { objects } from "./solar-system-data";

export type ObjectName = keyof typeof objects;
export interface Orbit {
  name: string;
  objectRadius: number;
  orbitRadius: number;
}

export function scaleBy(object: ObjectName, radius: number): Orbit[] {
  const scaleObject = objects[object];
  const scale = scaleObject.objectRadius / radius;

  console.log("Scale 1:%d", scale);

  return Object.values(objects).map(o => ({
    name: o.name,
    objectRadius: o.objectRadius / scale,
    orbitRadius: o.oribitRadius / scale
  }));
}
