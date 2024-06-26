import Image from "next/image";
import styles from "./Legend.module.css";

export default function Legend () {
  return (
    <fieldset className={styles.legendContainer}>
      <legend> 
        <Image height={38} width={24} alt="Open Hawker centres marker" src="/images/marker-icon.png" />
        <span className={styles.legendText}>Open Hawker centres</span>
      </legend>
      <legend>
        <Image height={38} width={24} alt="Closed Hawker centres marker" src="/images/marker-icon-red.png" />
        <span className={styles.legendText}>Closed Hawker centres</span>
      </legend>
    </fieldset>
  )
}
