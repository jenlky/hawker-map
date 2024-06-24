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

  const convertDateStringToDate = (dateInMMDDYYYY: string) => {
    const dateParts = dateInMMDDYYYY.split('/')
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
  }

  const hawkerData: any[] = data.map((hawker: HawkerData, index: string) => {
    const { latitude_hc, longitude_hc, name, photourl, description_myenv, remarks_other_works, other_works_startdate, other_works_enddate } = hawker
    let startDateString = hawker[`q${quarter}_cleaningstartdate`]
    let endDateString = hawker[`q${quarter}_cleaningenddate`]
    let startDate
    let endDate
    let otherWorksStartDate
    let otherWorksEndDate
    let isClosed = false
    let remarks = ''
    let closureReasons = ''

    // TBC and NA is not a good check
    if (startDateString !== "TBC" && endDateString !== "TBC" && other_works_startdate === "NA" && other_works_enddate === "NA") {
      startDate = convertDateStringToDate(startDateString)
      startDate.setUTCHours(0,0,0,0)
      endDate = convertDateStringToDate(endDateString)
      endDate.setUTCHours(23,59,59,999)
  
      isClosed = today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()
      closureReasons = "OPEN"
      if (isClosed) { 
        remarks = "Cleaning"
        closureReasons = "CLOSED FOR CLEANING"
      }
    } else if (other_works_startdate !== "NA" && other_works_enddate !== "NA") {
      otherWorksStartDate = convertDateStringToDate(other_works_startdate)
      otherWorksStartDate.setUTCHours(0,0,0,0)
      otherWorksEndDate = convertDateStringToDate(other_works_enddate)
      otherWorksEndDate.setUTCHours(23,59,59,999)

      isClosed = today.getTime() >= otherWorksStartDate.getTime() && today.getTime() <= otherWorksEndDate.getTime()
      remarks = remarks_other_works
      if (isClosed) { 
        closureReasons = "CLOSED FOR OTHER WORKS"
      }
    }

    return {
      coordinates: [latitude_hc, longitude_hc],
      name,
      photoUrl: photourl,
      description: description_myenv,
      remarks,
      closureReasons,
      otherWorksStartDate,
      otherWorksEndDate,
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
