import Icons from "@/themes/icons/admin/icons/icons";  // Icons import

interface NavigationLinks {
  path: string;
  label: string;
  defaultIcon: keyof typeof Icons;
  activeIcon: keyof typeof Icons;
  collapsible: boolean;
}

export class NavBarNavigationClass {
  public navigationLinks: NavigationLinks[] = [
    { path: "/admin", label: "Home", defaultIcon: "homeOutline", activeIcon: "homeFilled", collapsible: false },
    { path: "/media", label: "Media Library", defaultIcon: "mediaOutline", activeIcon: "mediaFilled", collapsible: true },
    { path: "/faculty", label: "Team Members", defaultIcon: "teamOutline", activeIcon: "teamFilled", collapsible: true },
    { path: "/careers", label: "Career Opportunities", defaultIcon: "careersOutline", activeIcon: "careersFilled", collapsible: false },
    { path: "/admin/resources", label: "Learning Resources", defaultIcon: "resourcesOutline", activeIcon: "resourcesFilled", collapsible: false },
  ];

  // Function to get the active status of the link based on the current pathname
  public getActiveStatus(path: string, pathname: string): boolean {
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  /**
   * Navigate to the desired path when a menu item is clicked.
   * @param {string} path The path to navigate to.
   * @param {Function} navigate The function to perform the navigation.
   */
  public navigateTo(path: string, navigate: (path: string) => void) {
    navigate(path);
  }
}
