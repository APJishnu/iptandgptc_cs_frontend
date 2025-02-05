"use client"
import { useEffect, useState } from "react";
import ContactUs from "../components/contact-us/contact-us";
import Loader from "@/themes/components/loader/loader";

const ContactUsView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time (for demo purposes, you can remove this in production)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate a loading state for 2 seconds
  }, []);
  return (
    <>
      {loading ? (
        <Loader /> // Show the loader while loading
      ) : (
        <div id="contact">
          <ContactUs />
        </div>
      )}
    </>
  );
};

export default ContactUsView;
