import styles from "./module-header.module.scss";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";

interface ModuleHeaderProps {
  title: string; // Title of the module header
  actionButton?: ActionButtonProps | null;
  isBackButtonNeeded: boolean; // Flag to show or hide the back button
}

interface ActionButtonProps {
  label: string; // Button label
  onClick: () => void; // Click handler
}

export interface AvatarData {
  profile_pic_path: string;
  name: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  actionButton,
  isBackButtonNeeded,
}) => {
  
  const router = useRouter();

  // Instance of ProfileNavigationClass
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
  

  // Back button handler
  const handleBackClick = () => {
      router.back(); // Default back navigation
  };

  return (
    <div className={`${styles.moduleHeaderwrpper} ${isScrolled ? styles.scrolled : ''} `}>
      <div className={styles.leftContainer}>
        {isBackButtonNeeded && (
          <span onClick={handleBackClick} className={styles.backButton}>
            <ArrowLeftOutlined />
          </span>
        )}
        <h2>{title}</h2>
        <div className={styles.actionbutton}>
          {/* {actionButton && (
            // <Button
            //   label={actionButton.label}
            //   theme="black"
            //   onClick={actionButton.onClick}
            //   defaultIcon={actionButton.icon}
            //   hoverIcon={Icons.plusDark}
            //   className={styles.addButton}
            // />
        )} */}
        </div>
      </div>

     
    </div>
  );
};

export default ModuleHeader;
