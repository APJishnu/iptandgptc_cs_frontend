import { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const fullDescription = `
    Computer Engineering Department was established in 1989. We have an annual intake of 60 with additional 10% for lateral entry students.
    Our laboratories are well equipped with new generation Computers and softwares to endure students with rapidly changing technologies.
    The Department guides and molds the students to become eminent computer engineers who have sound technical and management skills.
    Students are given opportunities to develop their personality along with technical skills.
    Department highly promote and provides support to student's innovative ideas.
    Department organizes Industrial visits at various Companies that have high turnover.
    The students are also provided with various training to develop soft skill, communication skill, teamwork and lifelong learning skill as part of ASAP.
    As the learning method is being outcome based which makes the transition effortless from institution to industry.
    The Computer Engineering Association conducts and co-ordinates various programs like seminars, exhibitions etc.
    In order to gather ideas from the industry. the association conducts various industry interaction programmes.
    It also demands students to present papers on various topics during association meetings to make sure that they are actively participating.
    Majority of students from this department are getting placements in good IT companies after completing their course of study.
    We are maintaining a good relation with alumni which helps the students for better prospects and improvement of quality.
  `;

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
              <h2>About Computer Department</h2>
              <p>
                {isExpanded ? fullDescription : `${fullDescription.substring(0, 700)}...`}
              </p>
              <button className={styles.learnMore} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Show Less" : "Learn More"}
              </button>
            </div>
            <div className={styles.imageContainer}>
              <img src="/about/about-us.jpg" alt="College Library" className={styles.aboutImg} />
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
