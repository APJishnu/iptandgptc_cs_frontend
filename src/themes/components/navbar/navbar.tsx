"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { useRouter } from "next/navigation";
import {
  FileTextOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Button from "../button/button";
import Icons from "@/themes/icons/icons/icons"; // Import icons

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up (or reversing)
        setIsScrollingUp(true);
      } else {
        // Scrolling down
        setIsScrollingUp(false);
      }

      setIsScrolled(currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 3200);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  const handleNavigate = (id?: string, path?: string) => {
    // setIsScrolled(true);
    // setIsScrollingUp(false)
    if (path) {
      router.push(path);
    }
    if (id) {
      setActiveSection(id); // Set active section
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

          {/* Desktop Navigation */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
            <li>
              <a href="/" onClick={() => scrollToSection("hero")}>
                HOME
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection("about")}>ABOUT</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("placements")}>PLACEMENT</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("faculty")}>FACULTY</a>
            </li>
            <li>
              <a href="/contact-us" onClick={() => scrollToSection("contact")}>
                CONTACT US
              </a>
            </li>
            <li className={styles.getNotes}>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => handleNavigate("get-notes", "/get-notes")}
              >
                Get Notes
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`${styles.mobileSidebar} ${
          isScrolled ? styles.mobileScrolled :styles.mobileScrolledUp
        }  ${isScrollingUp ? styles.mobileScrolledUp :styles.mobileScrolled}`}
      >
        <ul>
          <li onClick={() => handleNavigate("home", "/")}>
            {activeSection === "home" ? Icons.homeFilled : Icons.homeOutline}
            <span>Home</span>
          </li>
          <li onClick={() => handleNavigate("about", "/#about")}>
            {activeSection === "about" ? Icons.aboutFilled : Icons.aboutOutline}
            <span>About</span>
          </li>
          <li onClick={() => handleNavigate("placements", "/#placements")}>
            {activeSection === "placements"
              ? Icons.careersFilled
              : Icons.careersOutline}
            <span>Placement</span>
          </li>
          <li onClick={() => handleNavigate("faculty", "/#faculty")}>
            {activeSection === "faculty"
              ? Icons.facultyFilled
              : Icons.facultyOutline}
            <span>Faculty</span>
          </li>
          <li onClick={() => handleNavigate("contact", "/contact-us")}>
            {activeSection === "contact"
              ? Icons.contactFilled
              : Icons.contactOutline}
            <span>Contact</span>
          </li>
          <li
            className={styles.getNotes}
            onClick={() => handleNavigate("get-notes", "/get-notes")}
          >
            {activeSection === "get-notes"
              ? Icons.getNotesFilled
              : Icons.getNotesOutline}
            <span>Get Notes</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
