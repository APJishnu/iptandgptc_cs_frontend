"use client"
import { useEffect, useState } from "react";
import styles from "./status.bar.module.scss";

interface StatsProps {
  students: number;
  academicResult: number;
  alumni: number;
}

const StatsBar: React.FC<StatsProps> = ({ students, academicResult, alumni }) => {
  const [studentCount, setStudentCount] = useState(0);
  const [academicCount, setAcademicCount] = useState(0);
  const [alumniCount, setAlumniCount] = useState(0);

  const animateCount = (target: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
    let current = 0;
    const increment = Math.ceil(target / 100); // Speed of increment
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(current);
      }
    }, 20); // Speed of animation (lower = faster)
  };

  useEffect(() => {
    animateCount(students, setStudentCount);
    animateCount(academicResult, setAcademicCount);
    animateCount(alumni, setAlumniCount);
  }, [students, academicResult, alumni]);

  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <h4>{studentCount}+</h4>
        <p>Students Placed</p>
      </div>
      <div className={styles.stat}>
        <h4>{academicCount}%</h4>
        <p>Academic Result</p>
      </div>
      <div className={styles.stat}>
        <h4>{alumniCount}+</h4>
        <p>Alumni</p>
      </div>
    </div>
  );
};

export default StatsBar;
