'use client'
import styles from "./page.module.css";
import { API } from "./api";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const [hawkerData, setHawkerData] = useState([])

  const SimpleMap = dynamic(() => import('../components/SimpleMap'), {
    ssr: false
  })

  const Legend = dynamic(() => import('../components/Legend'), {
    ssr: false
  })

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
