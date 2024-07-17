export type TracksByRegion = Record<string, Array<Track>>;

export type Track = {
  type: "Feature";
  properties: {
    fileName: string;
    region: string;
    name: string;
    department: string;
    idx: number;
    color: string;
    distance: number;
    elevation_loss: number;
    elevation_gain: number;
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number, number][];
  };
};
