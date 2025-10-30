import { Box, Avatar, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";



const Header = () => {

  const [innerWidth, setInnerWidth] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); //900

  useEffect(() => {
   const value = window.innerWidth;
   console.log(value)
   setInnerWidth(value)
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        height: "10%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
         
         {isMobile && <MenuIcon sx={{ color: "#000" }} />}
         
          <TextField
            id="input-with-icon-textfield"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            size="small"
            placeholder="Search"
          />
        </Box>
      </Box>
      <Box sx={{ pr: 2, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:3 }}>
        <Avatar sx={{ bgcolor: "orangered", width: 35, height: 35 }}>A</Avatar>
      </Box>
    </Box>
  );
};

export default Header;
