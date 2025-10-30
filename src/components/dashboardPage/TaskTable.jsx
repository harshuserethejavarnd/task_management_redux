import { Box, Typography } from '@mui/material'
import StickyHeadTable from './StickyHeaderTable';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";



const TaskTable = () => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{width:"100%", height:"75%", marginTop:"10%"}}>
        <Typography sx={{color:"#000",p:1, fontSize:"1rem", fontWeight:"bold", display:"flex", justifyContent:"start", alignItems:"center", gap:1}}><Typography sx={{fontSize:isMobile ? "4vw" : "1.3vw", fontWeight:"bold", width:isMobile ? "35vw" : "10vw"}}>Recent Tasks</Typography> <Box sx={{width:"90%", height: 3, backgroundColor:"#4c2bce7f"}}></Box></Typography>
        <StickyHeadTable />
    </Box>
  )
}

export default TaskTable