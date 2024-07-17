import { Polyline, useMap } from "react-leaflet";
import { useSetRecoilState } from "recoil";

import { selectedGpxAtom, sidePanelAtom } from "@/app/atoms";
import { Track as TrackType } from "@/app/types";

const Track: React.FC<{ track: TrackType }> = ({ track }) => {
  const setSelectedGpx = useSetRecoilState(selectedGpxAtom);
  const setSidePanel = useSetRecoilState(sidePanelAtom);

  return (
    <Polyline
      positions={track.geometry.coordinates}
      color={track.properties.color}
      weight={5}
      eventHandlers={{
        mouseover: (e) => {
          e.target.bringToFront();
          e.target.setStyle({
            weight: 10,
          });
        },
        mouseout: (e) => {
          e.target.setStyle({
            weight: 8,
          });
        },
        mousedown: () => {
          setSelectedGpx(() => track);
          setSidePanel(() => true);
        },
      }}
    ></Polyline>
  );
};

export default Track;
