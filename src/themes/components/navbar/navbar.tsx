"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { useRouter } from "next/navigation";
import { FileTextOutlined } from "@ant-design/icons";
import Button from "../button/button";
import Icons from "@/themes/icons/icons/icons";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 3000);
    } else {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavigate = (id: string, path?: string) => {
    if (path) {
      router.push(path);
      setActiveSection(id);
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${!isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className={styles.iconImage}
            />
            <span>STUDENTLINK</span>
          </div>

          <ul className={styles.navLinks}>
            <li>
              <a 
                className={activeSection === "hero" ? styles.active : ""}
                onClick={() => handleNavigate("hero", "/")}
              >
                HOME
              </a>
            </li>
            <li>
              <a 
                className={activeSection === "about" ? styles.active : ""}
                onClick={() => scrollToSection("about")}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a 
                className={activeSection === "placements" ? styles.active : ""}
                onClick={() => scrollToSection("placements")}
              >
                PLACEMENT
              </a>
            </li>
            <li>
              <a 
                className={activeSection === "faculty" ? styles.active : ""}
                onClick={() => scrollToSection("faculty")}
              >
                FACULTY
              </a>
            </li>
            <li>
              <a 
                className={activeSection === "contact-us" ? styles.active : ""}
                onClick={() => handleNavigate("contact-us", "/contact-us")}
              >
                CONTACT US
              </a>
            </li>
            <li className={styles.getNotes}>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => handleNavigate("get-notes", "/get-notes")}
                className={activeSection === "get-notes" ? styles.active : ""}
              >
                Get Notes
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`${styles.mobileSidebar} ${
          isScrolled ? styles.mobileScrolled : styles.mobileScrolledUp
        } ${isScrollingUp ? styles.mobileScrolledUp : styles.mobileScrolled}`}
      >
        <ul>
          <li onClick={() => handleNavigate("hero", "/")}>
            {activeSection === "hero" ? Icons.homeFilled : Icons.homeOutline}
            <span>Home</span>
          </li>
          <li onClick={() => scrollToSection("about")}>
            {activeSection === "about" ? Icons.aboutFilled : Icons.aboutOutline}
            <span>About</span>
          </li>
          <li onClick={() => scrollToSection("placements")}>
            {activeSection === "placements" ? Icons.careersFilled : Icons.careersOutline}
            <span>Placement</span>
          </li>
          <li onClick={() => scrollToSection("faculty")}>
            {activeSection === "faculty" ? Icons.facultyFilled : Icons.facultyOutline}
            <span>Faculty</span>
          </li>
          <li onClick={() => handleNavigate("contact-us", "/contact-us")}>
            {activeSection === "contact-us" ? Icons.contactFilled : Icons.contactOutline}
            <span>Contact</span>
          </li>
          <li
            className={styles.getNotes}
            onClick={() => handleNavigate("get-notes", "/get-notes")}
          >
            {activeSection === "get-notes" ? Icons.getNotesFilled : Icons.getNotesOutline}
            <span>Get Notes</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;