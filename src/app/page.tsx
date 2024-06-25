'use client'
import styles from "./page.module.css";
import { API } from "./api";
import { useEffect, useState } from "react";
import SimpleMap from "@/components/SimpleMap";
import Legend from "@/components/Legend";

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
      <Legend />
    </main>
  );
}
