import {
    HomeOutlined,
    HomeFilled,
    PictureOutlined,
    PictureFilled,
    TeamOutlined,
    SolutionOutlined,
    BookOutlined,
    BookFilled,
  } from "@ant-design/icons";
  
  const Icons = {
    homeOutline: <HomeOutlined style={{ color: "#00000" }} />,
    homeFilled: <HomeFilled style={{ color: "#FFFFFF" }} />,
  
    mediaOutline: <PictureOutlined style={{ color: "#00000" }} />,
    mediaFilled: <PictureFilled style={{ color: "#FFFFFF" }} />,
  
    teamOutline: <TeamOutlined style={{ color: "#00000" }} />,
    teamFilled: <TeamOutlined style={{ color: "#FFFFFF" }} />, // No "Filled" version, using the same icon
  
    careersOutline: <SolutionOutlined style={{ color: "#00000" }} />,
    careersFilled: <SolutionOutlined style={{ color: "#FFFFFF" }} />,
  
    resourcesOutline: <BookOutlined style={{ color: "#00000" }} />,
    resourcesFilled: <BookFilled style={{ color: "#FFFFFF" }} />,
  };
  
  export default Icons;
  