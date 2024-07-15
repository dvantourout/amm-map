import { Polyline, Popup, useMapEvents } from "react-leaflet";

const Track = ({ track }: { track: any }) => {
  const map = useMapEvents({});

  return (
    <Polyline
      positions={track.geometry.coordinates}
      color={track.properties.color}
      weight={5}
      eventHandlers={{
        mouseover: (e) => {
          e.target.bringToFront();
          e.target.setStyle({
            weight: 8,
          });
        },
        mouseout: (e) => {
          e.target.setStyle({
            weight: 5,
          });
        },
        mousedown: (e) => {
          map.flyToBounds(e.target.getBounds().pad(0.1));
        },
      }}
    >
      <Popup>
        <b>{track.properties.name}</b>
        <br />
        Distance: {Math.round(track.properties.distance) / 1000}km
        <br />
        Elevation gain: {Math.round(track.properties.elevation_gain)}m
        <br />
        Elevation loss: {Math.round(track.properties.elevation_loss)}m
      </Popup>
    </Polyline>
  );
};

export default Track;
