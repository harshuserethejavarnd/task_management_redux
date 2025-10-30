import { Box, Container, Typography, Card, Chip, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const AllTaskTable = ({ isMobile, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [cat, setCat] = useState("all");

  const handleChipColor = (status) => {
    if (status === "to-do") {
      return "#dfdfdfb5";
    } else if (status === "in-progress") {
      return "#ffea005f";
    } else {
      return "#04ff0062";
    }
  };

   const handleChipBorderColor = (status) => {
    if (status === "to-do") {
      return "#929292e3";
    } else if (status === "in-progress") {
      return "#aa9c00ff";
    } else {
      return "#03c600ff";
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleCategory = (category) => {
    setCat(category);
    const arr =
      category === "all" ? data : data.filter((e) => e.status === category);
    setFilteredData(arr);
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "90%",
        position: "relative",
        color: "#000",
        p: 0,
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontSize: "1.4rem",
          pt: 2,
          fontWeight: "500",
          mb: 2,
          pl: isMobile ? 4 : 0,
        }}
      >
        My Tasks
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: isMobile ? "wrap" : "nowrap",
          pl: isMobile ? 4 : 0,
        }}
      >
        <Button
          sx={{
            backgroundColor: cat === "all" ? "#4d2bcf" : "#dfdfdf",
            width: "10%",
            color: cat === "all" ? "#fff" : "#000",
            fontSize: ".9rem",
            textTransform: "capitalize",
          }}
          onClick={() => handleCategory("all")}
        >
          All
        </Button>
        <Button
          sx={{
            backgroundColor: cat === "in-progress" ? "#4d2bcf" : "#dfdfdf",
            color: cat === "in-progress" ? "#fff" : "#000",
            fontSize: ".9rem",
            textTransform: "capitalize",
          }}
          onClick={() => handleCategory("in-progress")}
        >
          In-Progress
        </Button>
        <Button
          sx={{
            backgroundColor: cat === "to-do" ? "#4d2bcf" : "#dfdfdf",
            width: "10%",
            color: cat === "to-do" ? "#fff" : "#000",
            fontSize: ".9rem",
            textTransform: "capitalize",
          }}
          onClick={() => handleCategory("to-do")}
        >
          Pending
        </Button>
        <Button
          sx={{
            backgroundColor: cat === "Completed" ? "#4d2bcf" : "#dfdfdf",
            color: cat === "Completed" ? "#fff" : "#000",
            fontSize: ".9rem",
            textTransform: "capitalize",
          }}
          onClick={() => handleCategory("Completed")}
        >
          Completed
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "start",
          gap: "10px",
          p: 1,
          mt: 2,
        }}
      >
        {filteredData.map((e, index) => (
          <Card
            key={index}
            sx={{
              width: isMobile ? "95%" : "24%",
              minWidth: isMobile ? "280px" : "220px",
              mx: isMobile ? "auto" : 2,
              my: 2,
              boxShadow: 3,
              borderRadius: 3,
              overflow: "visible",
              position: "relative",
              p: 0,
            }}
          >
            {/* Accent bar for status */}
            <Box
              sx={{
                height: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                backgroundColor: handleChipColor(e.status),
              }}
            />
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {/* Emphasize Title */}
                <Typography
                  sx={{
                    flex: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "#232323",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={e.taskName}
                >
                  {e.taskName}
                </Typography>
                {/* Status Chip */}
                <Chip
                  sx={{
                    ml: 1,
                    fontWeight: 500,
                    fontSize: ".7rem",
                    px: 1.4,
                    backgroundColor: handleChipColor(e.status),
                    color: "#000000ba",
                    textTransform: "capitalize",
                    border:1,
                    borderColor: handleChipBorderColor(e.status)
                  }}
                  label={e.status}
                  size="small"
                />
              </Box>
              {/* Task Description */}
              <Typography
                sx={{
                  fontSize: ".8rem",
                  color: "#555",
                  mb: 2,
                  minHeight: "10px",
                  lineHeight: 1.5,
                  flexGrow: 1,
                }}
              >
                {e.taskDesc}
              </Typography>
              {/* Due Date, bottom-aligned */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Typography sx={{ fontSize: ".86rem", color: "#888" }}>
                  Due:{" "}
                  <span style={{ color: "#222", fontWeight: 500 }}>
                    {e.dueDate}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AllTaskTable;
