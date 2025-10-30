import { Typography } from "@mui/material";
import React from "react";

const ErrorMessageKit = ({err}) => {
  return (
    <>
      <Typography
        sx={{
          color: "red",
          fontSize: ".8rem",
          p: 1,
          fontWeight: "500",
          backgroundColor: "#ffefefe4",
          borderRadius: "5px",
          border: "1px solid red",
        }}
      >
        {err}
      </Typography>
    </>
  );
};

export default ErrorMessageKit;
