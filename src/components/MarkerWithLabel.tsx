import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import styles from "./MarkerWithLabel.module.css";

export default function MarkerWithLabel({ data, setDisplayWhichHawker }: { data: any, setDisplayWhichHawker: any }) {
  const blueMarker = L.icon({ iconUrl: "/images/marker-icon.png" });
  const redMarker = L.icon({ iconUrl: "/images/marker-icon-red.png" });

  const { coordinates, name, photoUrl, description, remarks, closureReasons,
    otherWorksStartDate, otherWorksEndDate, cleaningStartDate, cleaningEndDate, isClosed 
  } = data

  const displayDateInDDMMYYYY = (date: Date) => {
    return date.toLocaleDateString('en-GB')
  }

  const whyIsItClosed = () => {
    if (remarks === 'Cleaning') {
      return ` ${displayDateInDDMMYYYY(cleaningStartDate)} to ${displayDateInDDMMYYYY(cleaningEndDate)} (Cleaning)`
    } else if (remarks !== "Cleaning" && isClosed) {
      return ` ${displayDateInDDMMYYYY(otherWorksStartDate)} to ${displayDateInDDMMYYYY(otherWorksEndDate)} (Other Works)`
    }
    return
  }

  // const tooltipOpenHandler = (e: any) => {
  //   console.log('tooltipOpenHandler')
  //   console.log(e)
  //   const name = e.tooltip.options.children[0].props.children
  //   console.log(name)
  // }

  const clickHandler = (e: any) => {
    console.log('clickHandler')
    const name = e.target._tooltip.options.children[0].props.children
    setDisplayWhichHawker(name)
    console.log(name)
  }
  
  return (
    <Marker position={coordinates} icon={isClosed ? redMarker : blueMarker} eventHandlers={{ click: clickHandler }}>
      <Tooltip direction='left' offset={[0, 0]} opacity={1} permanent={false} className={styles.tooltipLabel}>
        <p>{ name }</p>
        <p>{ closureReasons }</p>
        <p>{isClosed ? 'Closure Date' : ''}<span>{ whyIsItClosed() }</span></p>
        {isClosed ? 
          <>
            <p>Remarks <span>{ remarks }</span></p>
          </> 
          : ''
        }
      </Tooltip>
    </Marker>
  )
}