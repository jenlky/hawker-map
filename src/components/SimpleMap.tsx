import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

export default function SimpleMap() {
  const coordinates: L.LatLngExpression = [1.3521, 103.8198]

  return ( 
    <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true} style={{ height: '90vh', width: '90wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={icon}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
        <Tooltip direction='left' offset={[0, 0]} opacity={1} permanent>Testing123</Tooltip>
      </Marker>
    </MapContainer>
  );
};
