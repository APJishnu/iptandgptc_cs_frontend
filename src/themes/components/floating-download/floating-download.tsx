"use client"; // Ensure this is at the top

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./floating-download.module.scss";
import { message } from "antd";

const FloatingDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Run initially
    window.addEventListener("resize", checkMobile);

    // Listen for the PWA install prompt (Android only)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt event fired!"); // Debugging
      e.preventDefault();
      setDeferredPrompt(e as any);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!isMobile) return;

    if (deferredPrompt) {
      console.log("Showing PWA install prompt...");
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          message.success("You accepted the App install prompt.");
        } else {
          message.warning("You dismissed the App install prompt.");
        }
        setDeferredPrompt(null);
      });
    } else {
      console.log("No install prompt available.");
      message.warning("PWA install is not available.");
    }
  };

  // Prevent rendering the button on desktop
  if (!isMobile) return null;

  return (
    <motion.div
      className={`${styles.floatingButton} ${styles.draggable}`}
      drag
      whileTap={{ scale: 0.9 }}
      onClick={handleInstallClick}
    >
      <Image
        src="/logo.png"
        alt="Install PWA"
        width={40}
        height={40}
        className={styles.iconImage}
      />
    </motion.div>
  );
};

export default FloatingDownload;
