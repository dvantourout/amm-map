"use client";

import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useMemo } from "react";
import Track from "./Track";

const Map = () => {
  const tracks: any = useMemo(() => require("@/app/data/amm-tracks.json"), []);

  return (
    <MapContainer
      center={[44.086294, 6.479357]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      zoomSnap={0}
      zoomDelta={0.25}
    >
      <TileLayer
        // GEOGRAPHICALGRIDSYSTEMS.MAPS
        // GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR
        url="https://data.geopf.fr/private/wmts?apikey=ign_scan_ws&layer=GEOGRAPHICALGRIDSYSTEMS.MAPS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}"
        minZoom={6}
        maxZoom={16}
      />
      {tracks.map((track: any) => (
        <Track key={`gpx-${track.properties.name}`} track={track} />
      ))}
    </MapContainer>
  );
};

export default Map;
