import { Box } from '@mui/material';
import React from 'react'
import { ClipLoader } from "react-spinners";


const Spiner = () => {
  return (
    <Box sx={{width:"100%", height:"100%", backgroundColor:"#00000025", display:"flex", justifyContent:"center", alignItems:"center", position:"absolute"}}>
      <ClipLoader
      
        size={15}
      />
    </Box>
  )
}

export default Spiner