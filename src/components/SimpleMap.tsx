import { LatLngTuple, LatLngBoundsLiteral } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerWithLabel from "./MarkerWithLabel";

export default function SimpleMap({ data }: { data: any }) {
  const singapore: LatLngTuple = [1.3521, 103.8198]

  const today = new Date().toLocaleDateString()
  console.log(today)

  const hawkerData: LatLngBoundsLiteral = data.map(({ latitude_hc, longitude_hc, name, photourl, description_myenv, other_works_startdate, other_works_enddate }: 
    { latitude_hc: string, longitude_hc: string, name: string, photourl: string, description_myenv: string, other_works_startdate: string, other_works_enddate: string }
  ) => {
    return { 
      coordinates: [latitude_hc, longitude_hc],
      name,
      photoUrl: photourl,
      description: description_myenv,
      otherWorksStartDate: other_works_startdate,
      otherWorksEndDate: other_works_enddate
    }
  })
  console.log(hawkerData)

  const listHawker = hawkerData.map(hawker => {
    return <MarkerWithLabel data={hawker} />
  })

  return (
    <MapContainer center={singapore} zoom={13} scrollWheelZoom={true} style={{ height: '90vh', width: '90wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listHawker}
    </MapContainer>
  );
};
