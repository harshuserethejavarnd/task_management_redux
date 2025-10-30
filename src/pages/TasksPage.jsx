import React from "react";
import "../styles/dashboardStyle.css";
import { Box, Container, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/dashboardPage/Header";
import AllTaskTable from "../components/taskPage/AllTaskTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SideBarMenu from "../components/mobile/SideBarMenu";
import { useGetTasksQuery } from "../features/api/apiSlice";

const TasksPage = () => {
     const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   const {data = [], isLoading, isError} = useGetTasksQuery();
   if(isLoading) return <div style={{width:"100vw", height:"100vh", background:"#000", display:"flex", justifyContent:"center", alignItems:"center"}}>Loading...</div>

  return (
    <>
      {isMobile ? <SideBarMenu /> : <Sidebar />}
      <Container
        sx={{
          width: isMobile ? "100vw" : "80vw",
          minHeight: "100vh",
          backgroundColor: "#fff",
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffff",
            borderRadius: "8px",
          }}
        >
                  {isMobile ? <Box sx={{ marginTop: "15vw" }}></Box> : <Header />}

          <AllTaskTable isMobile={isMobile} data={data} />
        </Box>
      </Container>
    </>
  );
};

export default TasksPage;
