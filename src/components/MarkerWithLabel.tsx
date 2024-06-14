import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

export default function MarkerWithLabel({ data }: any) {
  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
  const { coordinates, name, photoUrl, description, otherWorksStartDate, otherWorksEndDate } = data

  return (
    <Marker position={coordinates} icon={icon}>
      <Tooltip direction='left' offset={[0, 0]} opacity={1} permanent>{ name }</Tooltip>
    </Marker>
  )
}