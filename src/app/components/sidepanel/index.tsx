"use client";

import { Map } from "leaflet";
import { useRecoilState } from "recoil";

import { selectedGpxAtom, sidePanelAtom } from "@/app/atoms";
import { TracksByRegion } from "@/app/types";

import GPXList from "./GPXList";
import TrackDetail from "./TrackDetail";


const SidePanel: React.FC<{ tracks: TracksByRegion; map: Map }> = ({
  tracks,
  map,
}) => {
  const [sidePanel, setSidePanel] = useRecoilState(sidePanelAtom);
  const [selectedGpx, setSelectedGpx] = useRecoilState(selectedGpxAtom);

  return (
    <div
      className={`absolute sm:w-[408px] h-screen bg-white z-[1001] transition-transform ${
        sidePanel ? "-translate-x-0" : "-translate-x-full"
      } w-full`}
    >
      <div className="overflow-scroll scrollbar-width-thin h-screen">
        {selectedGpx ? (
          <div className="p-4">
            <button onClick={() => setSelectedGpx(() => null)}>Back</button>
            <TrackDetail selectedGpx={selectedGpx} map={map} />
          </div>
        ) : (<>
        <button className="sm:hidden" onClick={() => setSidePanel(() => false)}>Back</button>
          <GPXList tracks={tracks} /></>
        )}
      </div>
      <div
        className={`sm:block absolute left-full sm:left-[408px] top-1/2 w-6 h-12 bg-white z-[401] leading-[48px] text-center ${
          !sidePanel ? "transform -scale-x-100" : "hidden"
        }` }
        onClick={() => setSidePanel((v) => !v)}
      >
        &#10092;
      </div>
    </div>
  );
};

export default SidePanel;
