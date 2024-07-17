import { ReactNode } from "react";

import { geoJSON, LatLng, Map } from "leaflet";
import { useSetRecoilState } from "recoil";

import { sidePanelAtom } from "@/app/atoms";
import { Track } from "@/app/types";

const TrackInformation: React.FC<{children?: ReactNode}> = ({children}) => {
  return <div className="h-8">{children}</div>
}

const TrackDetail: React.FC<{ selectedGpx: Track; map: Map }> = ({
  selectedGpx,
  map,
}) => {
  const setSidePanel = useSetRecoilState(sidePanelAtom)

  return (
    <>
      <div className="h-8 font-bold">{selectedGpx.properties.name}</div>
      <TrackInformation>Distance: {Math.round(selectedGpx.properties.distance) / 1000}km</TrackInformation>
      <TrackInformation>Elevation gain: {Math.round(selectedGpx.properties.elevation_gain)}m</TrackInformation>
      <TrackInformation>Elevation loss: {Math.round(selectedGpx.properties.elevation_loss)}m</TrackInformation>
      <button
        onClick={() => {
          setSidePanel(() => false);
          
          map.flyToBounds(
            geoJSON(selectedGpx.geometry, {
              coordsToLatLng: (coords) => {
                return new LatLng(coords[0], coords[1], coords[2]);
              },
            })
              .getBounds()
              .pad(0.1)
          );
        }}
      >
        Go to
      </button>
    </>
  );
};

export default TrackDetail;
