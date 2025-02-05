"use client"
import React, { useState } from "react";
import { Tooltip } from "antd";
import { UserOutlined, TwitterOutlined, FacebookOutlined, InstagramOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "./meet-out-faculty.module.scss";

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  profilePic?: string;
  contactNo?: string;
  isHOD?: boolean;
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Abdul Kader K T",
    designation: "Head of Department",
    isHOD: true,
    profilePic: "/faculties/kader.png",
    contactNo: "+919876543210",
  },
  {
    id: 2,
    name: "Sreejith M",
    designation: "Lecturer",
    profilePic: "/faculties/Sreejith.jpg",
    contactNo: "+919845612378",
  },
  {
    id: 3,
    name: "Sudheer K T",
    designation: "Lecturer",
    profilePic: "/faculties/sudheer.jpg",
    contactNo: "+919812345678",
  },
  {
    id: 4,
    name: "Baby Salini C",
    designation: "Lecturer",
    profilePic: "/faculties/Baby_Saliny.jpeg",
    contactNo: "+919800112233",
  },
  {
    id: 5,
    name: "Saani H",
    designation: "Lecturer",
    profilePic: "/faculties/Saani.jpeg",
    contactNo: "+919900998877",
  },
  {
    id: 6,
    name: "Rahul P",
    designation: "Guest Lecturer",
    profilePic: "/faculties/Rahul.jpeg",
    contactNo: "+919988776655",
  },
];

const MeetOurFaculty: React.FC = () => {
  const [lastTap, setLastTap] = useState<number>(0);

  const handleDoubleTap = (contactNo?: string) => {
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTap;

    if (tapGap < 300 && contactNo) {
      window.open(`https://wa.me/${contactNo.replace("+", "")}`, "_blank");
    }

    setLastTap(currentTime);
  };

  return (
    <section className={styles.facultySection}>
      <h2 className={styles.sectionTitle}>Meet Our Qualified Teachers</h2>
      <p className={styles.sectionSubtitle}>Sed a repudiandae impedit voluptate nam Deleniti dignissimos perspiciatis nostrum porro nesciunt</p>
      <div className={styles.facultyContainer}>
        {facultyMembers.map((member) => (
          <Tooltip key={member.id} title={member.contactNo ? `Contact: ${member.contactNo}` : "No Contact Info"} placement="top">
            <div className={styles.facultyCard} onClick={() => handleDoubleTap(member.contactNo)}>
              <div className={styles.profilePic}>
                {member.profilePic ? (
                  <img src={member.profilePic} alt={member.name} />
                ) : (
                  <UserOutlined className={styles.defaultIcon} />
                )}
              </div>
              <h3 className={styles.facultyName}>{member.name}</h3>
              <p className={styles.facultyDesignation}>{member.designation}</p>
              <div className={styles.socialIcons}>
                <TwitterOutlined />
                <FacebookOutlined />
                <InstagramOutlined />
                <GoogleOutlined />
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </section>
  );
};

export default MeetOurFaculty;
