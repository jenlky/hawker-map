import styles from "./Legend.module.css";

export default function Legend () {
  return (
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
  )
}
