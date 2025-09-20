import styles from "./page.module.css";
import Radio from "./radio/Radio";

export default function Home() {
  return (
    <div className={styles.page}>
       <Radio/>
    </div>
  );
}
