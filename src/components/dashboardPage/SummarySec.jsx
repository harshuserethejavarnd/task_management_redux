import {
  Box,
  Card,
  cardClasses,
  Grid,
  ListItem,
  Typography,
  useScrollTrigger,
} from "@mui/material";


import EggIcon from "@mui/icons-material/Egg";
import { useCallback } from "react";
import PieChartComponent from "../charts/PieChart";
import BarChartComponent from "../charts/BarChart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import '../../styles/responsive.css';

const SummarySec = ({data}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const customWidth = useMediaQuery('(max-width:400px)');
   
  //Count Methods
  const totalTask = useCallback(() => {
    const totalVal = data.length;
    return totalVal; 
  }, [data])

  const totalPendingTask = useCallback(() => {
    const filterData = data.filter((e) => e.status === 'to-do');
    const totalVal = filterData.length;
    return totalVal;
  }, [data])

  const totalInProgressTask = useCallback(() => {
    const filterData = data.filter((e) => e.status === 'in-progress');
    const totalVal = filterData.length;
    return totalVal;
  }, [data])

    const totalCompletedTask = useCallback(() => {
    const filterData = data.filter((e) => e.status === 'Completed');
    const totalVal = filterData.length;
    return totalVal;
  }, [data])

  //Status --->
  const cardInfo = [
    { name: "Total Tasks", color: "blue", val: totalTask() },
    { name: "Running Tasks", color: "aqua", val: totalInProgressTask() },
    { name: "Pending Tasks", color: "green", val: totalPendingTask() },
    { name: "Completed Tasks", color: "violet", val: totalCompletedTask() },
  ];

  //Current Date Time --->
  const now = new Date();
  const dateTime = now.toLocaleString();

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "100%" : "45%",
        display:"flex",
        flexDirection:"column",
        gap:"15px"
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "20%" : "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "start",
          gap: "8px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "1px 1px 5px 1px #00000020",
          lineHeight: "0px",
        }}
      >
        <Box sx={{ pl: 2, pt:1 }}>
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: "500", m: 0, p: 0, color:"#000" }}
          >
            Hello! Username
          </Typography>
          <Typography sx={{ color: "gray", fontSize: ".9rem", m: 0, p: 0 }}>
            {dateTime}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%", flexWrap: isMobile ? "wrap" : "nowrap"}}>
          {cardInfo.map((e, index) => (
            <Box>
             <ListItem
              key={index}
              sx={{ fontWeight: "500", fontSize: ".9rem", color: "gray" }}
            >
              <EggIcon sx={{ fontSize: "1.2rem", color: e.color }} />
              {e.name}: {e.val}
            </ListItem>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ width: "100%", height: "100%", display:"flex", justifyContent:"space-between", flexDirection: isMobile ? "column" : "row"}}>
       
        <Box sx={{width: isMobile ? "100%" : "49%", height: isMobile ? "30%" : "100%", backgroundColor:"#fff", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px", boxShadow: "1px 1px 5px 1px #00000020", position:"relative"}}>
        <Typography sx={{position:"absolute", top:10, left:20, fontSize:".9rem", fontWeight:"600"}}>Task Distribution</Typography>
        <PieChartComponent isMobile={isMobile} />
        </Box>


        <Box sx={{top: isMobile ? -280 : 0, width: isMobile ? "100%" : "49%", height: isMobile ? "30%" : "100%", backgroundColor:"#fff", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px", boxShadow: "1px 1px 5px 1px #00000020", position:"relative"}}>
          <Typography sx={{position:"absolute", top:10, left:20, fontSize:".9rem", fontWeight:"600"}}>Task Completed Weekly</Typography>
          
          <BarChartComponent isMobile={isMobile} />
        </Box>
      </Box>
    </Box>
  );
};

export default SummarySec;
