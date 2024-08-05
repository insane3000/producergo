import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";

export default function page() {
  return (
    <>
      <main className={styles.main_landing}>
        <div className={styles.potrait_container}>
          <img className={styles.potrait} src="/potrait.webp" alt="Film producer" />
        </div>
        <h1 className={styles.title}>Hacer películas cuesta dinero</h1>
        <p className={styles.subtitle}>
          Con datos de películas pasadas y potenciado por IA esta app te ayudará a ser un mejor productor de cine.
        </p>
        <div className={styles.buttons_container}>
          <Link className={styles.button_link} href="/films">
            Empezar
          </Link>
        </div>
        <Image
          className={styles.image_app}
          src={"/banner.webp"}
          alt="App capture"
          width={960}
          height={720}
          priority
        />
      </main>
    </>
  );
}
