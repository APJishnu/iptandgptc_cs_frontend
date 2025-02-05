import Image from "next/image";
import styles from "./hero.module.scss";

const Hero:React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.background}>
        <Image src="/home/banner-1.jpg" alt="Hero Banner" layout="fill" objectFit="cover" priority />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1>Computer Science Department</h1>
        <p>Empowering future innovators with cutting-edge technology education and research opportunities</p>
      </div>
    </section>
  );
};

export default Hero;
