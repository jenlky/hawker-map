import L, { LatLngTuple, LatLngBoundsLiteral } from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MarkerWithLabel from "./MarkerWithLabel";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HawkerData } from "@/model/interfaces";

export default function SimpleMap({ data }: { data: any }) {
  const singapore: LatLngTuple = [1.3521, 103.8198]
  const today = new Date()
  const quarter = Math.floor((today.getMonth() + 3) / 3)
  console.log(data)

  const hawkerData: any[] = data.map((hawker: any, index: string) => {
    const { latitude_hc, longitude_hc, name, photourl, description_myenv, remarks_other_works, other_works_startdate, other_works_enddate } = hawker
    let startDateString = hawker[`q${quarter}_cleaningstartdate`]
    let endDateString = hawker[`q${quarter}_cleaningenddate`]
    let startDate
    let endDate
    let isClosed = false

    // TBC and NA is not a good check
    if (startDateString !== "TBC" && endDateString !== "TBC" && other_works_startdate === "NA" && other_works_enddate === "NA") {
      startDateString = startDateString.split('/')
      endDateString = endDateString.split('/')

      startDate = new Date(+startDateString[2], startDateString[1] - 1, +startDateString[0])
      startDate.setUTCHours(0,0,0,0)
      endDate = new Date(+endDateString[2], endDateString[1] - 1, +endDateString[0])
      endDate.setUTCHours(23,59,59,999)
  
      isClosed = today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()
    }
    
    return {
      coordinates: [latitude_hc, longitude_hc],
      name,
      photoUrl: photourl,
      description: description_myenv,
      remarksOtherWork: remarks_other_works,
      otherWorksStartDate: other_works_startdate,
      otherWorksEndDate: other_works_enddate,
      cleaningStartDate: startDate ? startDate : startDateString,
      cleaningEndDate: endDate ? endDate: endDateString,
      isClosed,
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
