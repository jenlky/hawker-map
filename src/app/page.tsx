'use client'
import styles from "./page.module.css";
import { API } from "./api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import React from "react";
import Hawker from "@/components/Hawker";

export default function Home() {
  const [hawkerData, setHawkerData] = useState([])
  const [location, setLocation]: [number[], Dispatch<SetStateAction<number[]>>] = useState([1.3521, 103.8198])
  const [displayWhichHawker, setDisplayWhichHawker] = useState('')
  const [foodRecommendations, setFoodRecommendations] = useState([])

  const SimpleMap = dynamic(() => import('../components/SimpleMap'), {
    ssr: false
  })

  const Legend = dynamic(() => import('../components/Legend'), {
    ssr: false
  })

  // const Hawker = dynamic(() => import('../components/Hawker'), {
  //   ssr: false
  // })

  useEffect(() => {
    API.getHawker().then(records => setHawkerData(records))
    API.getCurrentLocation().then((location: any) => {
      if (location) {
        setLocation(location)
      }
    })
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Welcome to Hawker Map! This website aims to show all the hawkers in Singapore and their closure dates.</p>
      </div>
      <SimpleMap data={hawkerData} location={location} setDisplayWhichHawker={setDisplayWhichHawker} setFoodRecommendations={setFoodRecommendations} />
      <Legend />
      <Hawker hawker={displayWhichHawker} foodRecommendations={foodRecommendations} />
    </main>
  );
}
