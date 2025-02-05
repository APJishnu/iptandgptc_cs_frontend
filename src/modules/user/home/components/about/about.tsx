import StatsBar from "../status-bar/status-bar";
import styles from "./about.module.scss";
import Image from "next/image";

const aboutCards = [
  {
    id: 1,
    icon: "/about/vision.png",
    title: "Vision",
    description:
      'To be recognized as the "Center of Excellence" for Education & Research in the field of Computer Science & Engineering in India. Our main purpose is to create engineers with full technical skills and experiences.',
  },
  {
    id: 2,
    icon: "/about/mission.png",
    title: "Mission",
    description:
      "To build successful and well-skilled engineers with personal as well as professional responsibilities to uplift the researches in the field of Computer Science & Engineering.",
  },
  {
    id: 3,
    icon: "/about/objective.png",
    title: "Objectives",
    description:
      "The Computer Science Department will be recognized as the Center-of-Excellence for Education & Research in the field of Computer Science & Engineering in India.",
  },
  {
    id: 4,
    icon: "/about/outcome.png",
    title: "Outcomes",
    description:
      "An ability to design and conduct experiments, and to analyze and interpret gathered and collected data. An ability to function individually as well as part of a team.",
  },
];

const stats = {
  students: 1200,
  academicResult: 95,
  alumni: 800,
};

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.bannerMainDiv}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <h1>Welcome to College of Excellence</h1>
      </div>
      
      {/* About College Section */}
      <div className={styles.aboutCollege}>
        <div className={styles.innerAboutCollege}>
        <div className={styles.textContainer}>
          <h2>About College</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis explicabo veniam labore ratione illo vero voluptate a deserunt incidunt odio aliquam commodi blanditiis voluptas error non rerum temporibus optio accusantium!
          </p>
          <button className={styles.learnMore}>Learn More</button>
        </div>
        <div className={styles.imageContainer}>
          <img src="/about/about-us.jpg" alt="College Library" className={styles.aboutImg}  />
        </div>
      </div>
      </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cardContainer}>
        {aboutCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.icon}>
              <Image src={card.icon} alt={card.title} width={60} height={60} />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
      
      {/* Stats Section */}
      <StatsBar 
        students={stats.students} 
        academicResult={stats.academicResult} 
        alumni={stats.alumni} 
      />
    </section>
  );
};

export default About;