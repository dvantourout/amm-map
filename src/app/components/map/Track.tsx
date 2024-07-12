import { Polyline, Popup } from "react-leaflet";

const Track = ({ track }: { track: any }) => {
  return (
    <Polyline
      positions={track.geometry.coordinates}
      color={track.properties.color}
      eventHandlers={{
        mouseover: (e) => {
          e.target.setStyle({
            weight: 8,
          });
        },
        mouseout: (e) => {
          e.target.setStyle({
            weight: 5,
          });
        },
      }}
    >
      <Popup>{track.properties.name}</Popup>
    </Polyline>
  );
};

export default Track;
