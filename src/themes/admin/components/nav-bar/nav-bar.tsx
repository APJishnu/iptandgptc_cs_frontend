"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./nav-bar.module.scss";
import Icons from "../../icons/icons"; 
import NavBlock from "../nav-block/nav-block";
import { NavBarNavigationClass } from "@/utils/navigation-util/page-navigation-router";
import {
  getDropdownItems,
  isCollapsibleItem,
} from "@/utils/nav-dropdown-menu/nav-dropdown-menu";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navBarNavigation = new NavBarNavigationClass();
  const [activePath, setActivePath] = useState<string>(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // Mobile menu state
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleMainNavClick = (path: string) => {
    setActivePath(path);
    navBarNavigation.navigateTo(path, router.push);
    setIsMobileMenuOpen(false); // Close menu on selection (mobile)
  };

  const handleDropdownClick = (parentPath: string, childPath: string) => {
    setActivePath(childPath);
    navBarNavigation.navigateTo(childPath, router.push);
    setIsMobileMenuOpen(false); // Close menu on selection (mobile)
  };

  return (
    <>
      {/* Mobile Navbar Toggle Button */}
      
      <div className={`${styles.navBarWrapper} ${isMobileMenuOpen ? styles.mobileOpen : ""}  ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.logo}>
          <span><img className={styles.logoImg} src="/logo.png"/></span>
          <h2>Studentlink<span>.admin</span></h2>
        </div>

        <div className={styles.navList}>
          {navBarNavigation.navigationLinks.map((link) => {
            const DefaultIcon = Icons[link.defaultIcon];
            const ActiveIcon = Icons[link.activeIcon];
            const isCollapsible = isCollapsibleItem(link.label);
            const dropdownItems = getDropdownItems(link.label)?.map((item) => ({
              ...item,
              onClick: () => handleDropdownClick(link.path, item.path),
            }));

            return (
              <NavBlock
                key={link.label}
                title={link.label}
                defaultIcon={DefaultIcon}
                activeIcon={ActiveIcon}
                activeStatus={activePath === link.path}
                collapsible={isCollapsible}
                dropdownItems={dropdownItems}
                onClickFunction={() => handleMainNavClick(link.path)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
