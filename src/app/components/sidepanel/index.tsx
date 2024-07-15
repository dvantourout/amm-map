"use client";

import { useState } from "react";
import "./sidepanel.css";
import { geoJSON, LatLng } from "leaflet";
import { Accordion, Button } from "react-bootstrap";

const SidePanel = ({ tracks, map }: { tracks: any; map: any }) => {
  const [sidePanel, setSidePanel] = useState(false);

  return (
    <div className={`sidePanel sidePanel${sidePanel ? "Open" : "Close"}`}>
      <div className="sidePanelContainer">
        <Accordion alwaysOpen defaultActiveKey={[]}>
          {Object.keys(tracks).map((region) => {
            return (
              <Accordion.Item
                key={`divider-${region}`}
                eventKey={`divider-${region}`}
              >
                <Accordion.Header>{region}</Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                  {tracks[region].map((track: any) => {
                    return (
                      <div
                        key={`sidepanel-${track.properties.filename}`}
                        className="trackItem"
                        onClick={(e) => {
                          map.flyToBounds(
                            geoJSON(track.geometry, {
                              coordsToLatLng: (coords) => {
                                return new LatLng(
                                  coords[0],
                                  coords[1],
                                  coords[2]
                                );
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
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
      <div
        className="sidePanelButton"
        style={{
          transform: sidePanel ? undefined : "scaleX(-1)",
        }}
        onClick={() => setSidePanel((v) => !v)}
      >
        &#10092;
      </div>
    </div>
  );
};

export default SidePanel;
