"use client";

import { useState } from "react";
import { geoJSON, LatLng } from "leaflet";
import Accordion from "@/app/components/accordion/Accordion";

const SidePanel = ({ tracks, map }: { tracks: any; map: any }) => {
  const [sidePanel, setSidePanel] = useState(false);

  return (
    <div
      className={`absolute w-[408px] h-screen bg-white z-[401] transition-transform ${
        sidePanel ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="overflow-scroll scrollbar-width-thin h-screen">
        {Object.keys(tracks).map((region) => {
          return (
            <Accordion
              key={`divider-${region}`}
              header={
                <div className="flex items-center pl-3 h-12  cursor-pointer hover:bg-slate-50 w-full">
                  {region}
                </div>
              }
            >
              {tracks[region].map((track: any) => {
                return (
                  <div
                    key={`sidepanel-${track.properties.filename}`}
                    className="flex items-center pl-3 h-12 border-b border-solid border-b-slate-300 cursor-pointer hover:bg-slate-50"
                    onClick={(e) => {
                      map.flyToBounds(
                        geoJSON(track.geometry, {
                          coordsToLatLng: (coords) => {
                            return new LatLng(coords[0], coords[1], coords[2]);
                          },
                        })
                          .getBounds()
                          .pad(0.1)
                      );
                      setSidePanel(() => false);
                    }}
                  >
                    {track.properties.region} - {track.properties.name}
                  </div>
                );
              })}
            </Accordion>
          );
        })}
      </div>
      <div
        className={`absolute left-[408px] bg-white z-[401] top-1/2 w-6 h-12 leading-[48px] text-center ${
          !sidePanel && "transform -scale-x-100"
        }`}
        onClick={() => setSidePanel((v) => !v)}
      >
        &#10092;
      </div>
    </div>
  );
};

export default SidePanel;
