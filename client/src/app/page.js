import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hh.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>
            "Journey Through World: Unveiling the Beauty of its Diverse
            Landscapes".
          </h1>
          <p className={styles.desc}>
            Create a section that highlights some of the most captivating
            destinations in World. Include a mix of popular tourist spots and
            lesser-known hidden gems, each accompanied by a compelling image and
            a brief description highlighting its unique appeal.
          </p>
          <Button url="/portfolio" text="See Our Works" />
        </div>
        <div className={styles.item}>
          <Image src={Hero} alt="" className={styles.img} />
        </div>
      </div>
    </>
  );
}
