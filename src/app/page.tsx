'use client'
import styles from "./page.module.css";
import { API } from "./api";
import { useEffect, useState } from "react";

export default function Home() {
  const [hawkerData, setHawkerData] = useState('')

  useEffect(() => {
    API.getHawker().then(data => {
      console.log(data)
      setHawkerData(data.result.records)
    })
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        Homepage
      </div>
    </main>
  );
}
