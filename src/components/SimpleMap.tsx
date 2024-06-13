import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

const SimpleMap = () => {
  const coordinates: L.LatLngExpression = [1.3521, 103.8198]

  return ( 
    <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleMap;