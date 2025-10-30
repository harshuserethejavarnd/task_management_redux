
import "../styles/dashboardStyle.css";
import { Box, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/dashboardPage/Header";
import SummarySec from "../components/dashboardPage/SummarySec";
import TaskTable from "../components/dashboardPage/TaskTable";
import SideBarMenu from "../components/mobile/SideBarMenu";
import { useTheme, useMediaQuery } from "@mui/material";
import { useGetTasksQuery } from "../features/api/apiSlice";
import Spiner from "../utils/Spiner";


const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {data = [], isLoading, isError} = useGetTasksQuery();
  if(isLoading) return <div style={{width:"100vw", height:"100vh", backgroundColor:"transparent", display:"flex", justifyContent:"center", alignItems:"center"}}><Spiner /></div>


  return (
    <>
      {isMobile ? <SideBarMenu /> : <Sidebar />}

      <Container
        sx={{
          width: isMobile ? "100vw" : "80vw",
          maxHeight: "100vh",
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
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "scroll",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          {isMobile ? <Box sx={{ marginTop: "15vw" }}></Box> : <Header />}

          <SummarySec data={data} />
          {isMobile ? (
            <Box sx={{ position: "relative", top: "-60vw" }}>
              <TaskTable />
            </Box>
          ) : (
            <TaskTable />
          )}
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
