"use client";  // Ensure this is at the top

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./floating-download.module.scss";
import { message } from "antd";

const FloatingDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the device is mobile
    setIsMobile(window.innerWidth < 768); 

    // Detect iOS (because iOS doesn't support beforeinstallprompt)
    const userAgent = window.navigator.userAgent;
    // setIsIOS(/iPhone|iPad|iPod/.test(userAgent));

    // Listen for the PWA install prompt (Android only)
    const handleBeforeInstallPrompt = (e: Event) => {
      if (!isMobile) return;  // Ensure it's only available on mobile
      e.preventDefault();
      setDeferredPrompt(e as any);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!isMobile) return; // Prevent execution on desktop
    // if (isIOS) {
    //   message.info("On iOS, tap Share > Add to Home Screen to install.");
    //   return;
    // }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          message.success("User accepted the PWA install prompt.");
        } else {
          message.warning("User dismissed the PWA install prompt.");
        }
        setDeferredPrompt(null);
      });
    } else {
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
