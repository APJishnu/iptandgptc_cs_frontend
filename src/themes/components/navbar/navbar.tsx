"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { useRouter } from "next/navigation";
import { FileTextOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Button from "../button/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${!isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} className={styles.iconImage} />
          <span>STUDENTLINK</span>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
          <li><a href="/" onClick={() => scrollToSection("hero")}>HOME</a></li>
          <li><a onClick={() => scrollToSection("about")}>ABOUT</a></li>
          <li><a onClick={() => scrollToSection("placements")}>PLACEMENT</a></li>
          <li><a onClick={() => scrollToSection("gallery")}>GALLERY</a></li>
          <li><a onClick={() => scrollToSection("faculty")}>FACULTY</a></li>
          <li><a href="/contact-us" onClick={() => scrollToSection("contact")}>CONTACT US</a></li>
          <li className={styles.getNotes}>
            <Button  icon={<FileTextOutlined />} onClick={() => handleNavigate("/get-notes")}>
              Get Notes
            </Button>
          </li>
        </ul>

        <Button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)} icon={isOpen ? <CloseOutlined /> : <MenuOutlined />} />
       
      </div>

      {isOpen && (
        <div className={styles.sidebar}>
          <ul>
            <li><a href="/" onClick={() => scrollToSection("hero")}>Home</a></li>
            <li><a onClick={() => scrollToSection("about")}>About</a></li>
            <li><a onClick={() => scrollToSection("placements")}>Placement</a></li>
            <li><a onClick={() => scrollToSection("gallery")}>Gallery</a></li>
            <li><a onClick={() => scrollToSection("faculty")}>Faculty</a></li>
            <li><a href="/contact-us" onClick={() => scrollToSection("contact")}>Contact Us</a></li>
            <li>
              <Button icon={<FileTextOutlined />} onClick={() => handleNavigate("/get-notes")} className={styles.getNotesSidebar}>
                Get Notes
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
