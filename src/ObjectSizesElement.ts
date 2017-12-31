import { ObjectName, Orbits, objectNames } from "./solar-system-model";

export const ObjectSizeChangedEvent = "objectsizechanged";

export class ObjectSizesElement extends HTMLElement {
  private readonly _inputs = {} as { [Name in keyof Orbits]: HTMLInputElement }; // Will init in constructor
  constructor() {
    super();

    for (const name of objectNames) this._createInputGroup(name);

    this.addEventListener("change", e => {
      console.log("change", e);
      const el = e.target as HTMLInputElement;
      const size = ObjectSizesElement.fromTextValue(el.value);
      this.dispatchEvent(
        new CustomEvent(ObjectSizeChangedEvent, {
          detail: { object: el.name, size }
        })
      );
    });
  }

  private _createInputGroup(object: ObjectName) {
    const input = document.createElement("input");
    input.name = object;

    this._inputs[object] = input;

    const label = document.createElement("label");
    const labelText = document.createTextNode(object);
    label.appendChild(labelText);
    label.appendChild(input);

    return this.appendChild(label);
  }

  /**
   * Takes radius in m to diamater in mm as text
   * @param radius
   */
  private static toTextValue(radius: number) {
    return (radius * 2 * 1000).toFixed(1);
  }

  /**
   * Takes diamater in mm as text to radius in m
   * @param diamater
   */
  private static fromTextValue(diamater: string) {
    return Number(diamater) / 2 / 1000;
  }

  public set orbits(orbits: Orbits) {
    for (const name of objectNames) {
      const orbit = orbits[name];
      const input = this._inputs[name];
      const textValue = ObjectSizesElement.toTextValue(orbit.objectRadius);
      if (input.value != textValue) {
        input.value = textValue;
      }
    }
  }
}
window.customElements.define("object-sizes", ObjectSizesElement);
