import L from "leaflet";
import { useState } from "react";
import { Marker, Tooltip, useMapEvent } from "react-leaflet";

export default function MarkerWithLabel({ data }: { data: any }) {
  const [isPermanent, setIsPermanent] = useState(false)
  const blueMarker = L.icon({ iconUrl: "/images/marker-icon.png" });
  const redMarker = L.icon({ iconUrl: "/images/marker-icon-red.png" });

  const { coordinates, name, photoUrl, description, otherWorksStartDate, otherWorksEndDate } = data

  // const MapEvent = () => {
  //   const map = useMapEvent('moveend', () => {
  //     const zoom = map.getZoom()
  //     console.log('getZoom', zoom)
  //     zoom >= 16 ? setIsPermanent(true) : setIsPermanent(false)
  //   })
  //   console.log('isPermanent', isPermanent)

  //   return null
  // } 

  return (
    <Marker position={coordinates} icon={blueMarker}>
      <Tooltip direction='left' offset={[0, 0]} opacity={1} permanent={true}>{ name }</Tooltip>
    </Marker>
  )
}