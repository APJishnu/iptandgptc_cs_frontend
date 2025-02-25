"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ModuleHeader from "../module-header/module-header";

const ModuleHeaderWrapper = () => {
  const pathname = usePathname();


  // Define the pages and their corresponding data
  const pages = [

    { title: "Learning Resources", path: "/admin/resources", backButtonNeeded: false, actionButton: null},
    { title: "Career Opportunities", path: "/admin/careers", backButtonNeeded: false, actionButton: null},
    { title: "Approval Center", path: "/time-sheet/approval-center", backButtonNeeded: false, actionButton: null},
    { title: "Organization", path: "/organization", backButtonNeeded: false ,actionButton: { label: "Add Employee",  modalType: "addEmployeeModal" } },
    { title: "Project forecast", path: "/project-forecast", backButtonNeeded: false, actionButton: { label: "Add Project Forecast",  modalType: "addModal" }},
    { title: "Project Forecast Details", path: "/project-forecast/forecast-details/[id]", backButtonNeeded: true, actionButton: null},
    { title: "Timesheet Report", path: "/reports/time-sheet-report", backButtonNeeded: false, actionButton: null},
    { title: "Profile", path: "/profile", backButtonNeeded: true, actionButton: null,  },
    { title: "Project Status Report", path: "/reports", backButtonNeeded: false, actionButton: { label: "Add Report", modalType: "addReportModal" } },
    { title: "Report details", path: "/reports/report-details/[id]", backButtonNeeded: true, actionButton: null},
    { title: "Review Timesheet", path: "/time-sheet/review-timesheet/[id]", backButtonNeeded: true, actionButton: null},
    { title: "Project List", path: "/projects", backButtonNeeded: false ,actionButton: { label: "Add Project",  modalType: "addModal" }},
    { title: "Project Details", path: "/projects/project-details/[id]", backButtonNeeded: true, actionButton: null},
    { title: "Client", path: "/projects/client", backButtonNeeded: false,actionButton: { label: "Add Client",  modalType: "addModal" }},
    { title: "Task Category", path: "/projects/task-category", backButtonNeeded: false ,actionButton: { label: "Add Task Category",  modalType: "addModal" }},
    { title: "Project Team", path: "/projects/project-team", backButtonNeeded: false ,actionButton: { label: "Add Project Team", modalType: "addModal" }},
    { title: "Admin Settings", path: "/settings", backButtonNeeded: true,  actionButton: { label: "Add Role",  modalType: "roleModal" } }, 
    { title: "Permissions Settings", path: "/settings/permissions/[id]", backButtonNeeded: true, actionButton: null},
    { title: "Notifications", path: "/notifications", backButtonNeeded: true, actionButton: null},
    { title: "Employee Details", path: "/organization/employee-details/[id]", backButtonNeeded: true ,actionButton: null  },
    { title: "Holidays", path: "/holidays", backButtonNeeded: true, actionButton: { label: "Add Holidays",  modalType: "holidayModal" }},
  ];

  // Function to match the dynamic path
  const matchPath = (path: string, dynamicPath: string) => {
    const staticSegments = dynamicPath.split("/").filter((seg) => !seg.startsWith("["));
    return staticSegments.every((seg) => path.includes(seg));
  };


  // Find the matching page based on the current pathname
  const currentPage = pages.find((page) =>
    page.path.includes("[id]") ? matchPath(pathname, page.path) : page.path === pathname
  );

  // Fallback in case no matching page is found
  const title = currentPage?.title ?? "Default Title";
  const isBackButtonNeeded = currentPage?.backButtonNeeded || false;
  const actionButton = currentPage?.actionButton;

  

  return (
        <ModuleHeader title={title} isBackButtonNeeded={isBackButtonNeeded}  />

  );
};

export default ModuleHeaderWrapper;
