class OrbitalObject {
  constructor(
    public readonly aphelion: number,
    public readonly perihelion: number,
    public readonly objectRadius: number
  ) {}
  public get oribitRadius() {
    return (this.aphelion + this.perihelion) / 2;
  }
}

export const objects = {
  sun: new OrbitalObject(0, 0, 696392000),
  mercury: new OrbitalObject(69816900000, 46001200000, 2440000),
  venus: new OrbitalObject(108939000000, 107477000000, 6052000),
  earth: new OrbitalObject(152100000000, 147095000000, 6371000),
  mars: new OrbitalObject(249200000000, 206700000000, 3390000),
  jupiter: new OrbitalObject(816620000000, 740520000000, 69911000),
  saturn: new OrbitalObject(1514500000000, 1352550000000, 58232000),
  uranus: new OrbitalObject(3006390000000, 2735560000000, 25362000),
  neptune: new OrbitalObject(4540000000000, 4460000000000, 24622000)
};
