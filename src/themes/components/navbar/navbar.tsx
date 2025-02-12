"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { useRouter, usePathname } from "next/navigation";
import { FileTextOutlined } from "@ant-design/icons";
import Button from "../button/button";
import Icons from "@/themes/icons/icons/icons";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname(); // Get current URL path

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

  const handleNavigate = (path: string) => {
    router.push(path);
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
                className={pathname === "/" ? styles.active : ""}
                onClick={() => handleNavigate("/")}
              >
                HOME
              </a>
            </li>
            <li>
              <a
                className={pathname === "/#about" ? styles.active : ""}
                onClick={() => scrollToSection("about")}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                className={pathname === "/#placements" ? styles.active : ""}
                onClick={() => scrollToSection("placements")}
              >
                PLACEMENT
              </a>
            </li>
            <li>
              <a
                className={pathname === "/#faculty" ? styles.active : ""}
                onClick={() => scrollToSection("faculty")}
              >
                FACULTY
              </a>
            </li>
            <li>
              <a
                className={pathname === "/contact-us" ? styles.active : ""}
                onClick={() => handleNavigate("/contact-us")}
              >
                CONTACT US
              </a>
            </li>
            <li className={styles.getNotes}>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => handleNavigate("/get-notes")}
                className={pathname === "/get-notes" ? styles.active : ""}
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
          <li onClick={() => handleNavigate("/")}>
            {pathname === "/" ? Icons.homeFilled : Icons.homeOutline}
            <span>Home</span>
          </li>
          <li onClick={() => scrollToSection("about")}>
            {pathname === "/#about" ? Icons.aboutFilled : Icons.aboutOutline}
            <span>About</span>
          </li>
          <li onClick={() => scrollToSection("placements")}>
            {pathname === "/#placements" ? Icons.careersFilled : Icons.careersOutline}
            <span>Placement</span>
          </li>
          <li onClick={() => scrollToSection("faculty")}>
            {pathname === "/#faculty" ? Icons.facultyFilled : Icons.facultyOutline}
            <span>Faculty</span>
          </li>
          <li onClick={() => handleNavigate("/contact-us")}>
            {pathname === "/contact-us" ? Icons.contactFilled : Icons.contactOutline}
            <span>Contact</span>
          </li>
          <li
            className={styles.getNotes}
            onClick={() => handleNavigate("/get-notes")}
          >
            {pathname === "/get-notes" ? Icons.getNotesFilled : Icons.getNotesOutline}
            <span>Get Notes</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
