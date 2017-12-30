class OrbitalObject {
  constructor(
    public readonly name: string,
    public readonly aphelion: number,
    public readonly perihelion: number,
    public readonly objectRadius: number
  ) {}
  public get oribitRadius() {
    return (this.aphelion + this.perihelion) / 2;
  }
}

export const objects = {
  sun: new OrbitalObject("Sun", 0, 0, 696392000),
  mercury: new OrbitalObject("Merkuris", 69816900000, 46001200000, 2440000),
  venus: new OrbitalObject("Venus", 108939000000, 107477000000, 6052000),
  earth: new OrbitalObject("Jorden", 152100000000, 147095000000, 6371000),
  mars: new OrbitalObject("Mars", 249200000000, 206700000000, 3390000),
  jupiter: new OrbitalObject("Jupiter", 816620000000, 740520000000, 69911000),
  saturn: new OrbitalObject("Saturnus", 1514500000000, 1352550000000, 58232000),
  uranus: new OrbitalObject("Uranus", 3006390000000, 2735560000000, 25362000),
  naptune: new OrbitalObject("Neptunus", 4540000000000, 4460000000000, 24622000)
};
