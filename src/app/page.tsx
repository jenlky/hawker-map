'use client'
import styles from "./page.module.css";
import { API } from "./api";
import { useEffect, useState } from "react";
import SimpleMap from "@/components/SimpleMap";

export default function Home() {
  const [hawkerData, setHawkerData] = useState([])

  useEffect(() => {
    API.getHawker().then(records => {
      setHawkerData(records)
    })
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Welcome to Hawker Map! This website aims to show all the hawkers in Singapore and their closure dates.</p>
      </div>
      <SimpleMap data={hawkerData} />
      <fieldset className={styles.legendContainer}>
        <legend> 
          <img src="/images/marker-icon.png"/>
          <span className={styles.legendText}>Open Hawker centres</span>
        </legend>
        <legend>
          <img src="/images/marker-icon-red.png"/>
          <span className={styles.legendText}>Closed Hawker centres</span>
        </legend>
      </fieldset>
    </main>
  );
}
