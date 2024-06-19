import L, { LatLngTuple, LatLngBoundsLiteral } from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MarkerWithLabel from "./MarkerWithLabel";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HawkerData } from "@/model/interfaces";

export default function SimpleMap({ data }: { data: any }) {
  const singapore: LatLngTuple = [1.3521, 103.8198]
  const today = new Date().toLocaleDateString()
  console.log(today)

  const hawkerData: HawkerData[] = data.map(({ latitude_hc, longitude_hc, name, photourl, description_myenv, other_works_startdate, other_works_enddate }: HawkerData, index: string) => {
    return { 
      coordinates: [latitude_hc, longitude_hc],
      name,
      photoUrl: photourl,
      description: description_myenv,
      otherWorksStartDate: other_works_startdate,
      otherWorksEndDate: other_works_enddate,
      index
    }
  })

  const listHawker = hawkerData.map(hawker => {
    return <MarkerWithLabel key={hawker.index} data={hawker} />
  })

  return (
    <MapContainer center={singapore} zoom={12} scrollWheelZoom={true} style={{ height: '90vh', width: '90wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {listHawker}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
