import React, { useState } from "react";
import "../styles/sidebarStyle.css";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Container,
  Divider,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAddTaskMutation, useGetTasksQuery } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const today = dayjs;
const minDate = dayjs();

const Sidebar = () => {
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [addTask, { isLoading, isError, isSuccess }] = useAddTaskMutation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);
  //Side Nav Items
  const listItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <DashboardIcon sx={{ fontSize: "1.3rem", color: "#989898ff" }} />,
    },
    {
      title: "My Tasks",
      path: "/tasks",
      icon: <AssignmentIcon sx={{ fontSize: "1.3rem", color: "#989898ff" }} />,
    },
  ];

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    taskName: "",
    taskDesc: "",
    dueDate: "",
    status: "to-do",
    isCompleted: false,
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: newDate ? newDate.format("YYYY-MM-DD") : null,
    }));
  };

  const handleSubmitForm = async () => {
    try {
      if (formData.taskName.length === 0 || formData.dueDate.length === 0) {
        setErrorMessage("Task name & Due date should not be empty.");
        return;
      }

      await addTask(formData);
      if (isSuccess) {
        notify("Task created successfully.");
      } else if (isError) {
        notifyError("There is problem creating task.");
      }

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      varient="permanent"
      sx={{
        width: isMobile ? "100%" : "18vw",
        height: isMobile ? "100%" : "auto",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "10px !important",
        paddingRight: "10px !important",
      }}
    >
      {/* MODAL CODE BELOW */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "#fff",
            borderRadius: "12px",
            p: 3,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "1rem",
              fontWeight: 600,
              color: "#4c2bce",
              mb: 1.5,
            }}
          >
            <AddBoxIcon sx={{ fontSize: "1.2rem" }} /> Add New Task
          </Typography>

          <TextField
            label="Task Name"
            name="taskName"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleFormData}
            InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
            inputProps={{ style: { fontSize: "0.8rem" } }}
          />

          <TextField
            label="Task Description"
            name="taskDesc"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            minRows={2}
            onChange={handleFormData}
            InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
            inputProps={{ style: { fontSize: "0.8rem" } }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              name="dueDate"
              onChange={handleDateChange}
              minDate={minDate}
              slotProps={{
                textField: {
                  size: "small",
                  InputLabelProps: { sx: { fontSize: "0.8rem" } },
                  inputProps: { style: { fontSize: "0.8rem" } },
                },
              }}
            />
          </LocalizationProvider>

          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontSize: "0.8rem" }}>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              defaultValue="to-do"
              onChange={handleFormData}
              sx={{ fontSize: "0.8rem" }}
            >
              <MenuItem value="to-do" sx={{ fontSize: "0.8rem" }}>
                To Do
              </MenuItem>
              <MenuItem value="in-progress" sx={{ fontSize: "0.8rem" }}>
                In Progress
              </MenuItem>
            </Select>
          </FormControl>

          {errorMessage && (
            <Typography
              sx={{ color: "red", fontSize: "0.75rem", textAlign: "center" }}
            >
              {errorMessage}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              color="error"
              sx={{
                fontSize: "0.7rem",
                borderRadius: "8px",
                textTransform: "capitalize",
                px: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitForm}
              sx={{
                fontSize: "0.7rem",
                borderRadius: "8px",
                backgroundColor: "#4c2bce",
                textTransform: "capitalize",
                px: 2.5,
                "&:hover": { backgroundColor: "#3a1fb5" },
              }}
            >
              {isLoading ? "Please wait..." : "Add Task"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* MODAL CODE ABOVE */}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f4f4f4ff",
          height: "100%",
          borderRadius: "15px",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: "6%",
            backgroundColor: "#fff",
            borderRadius: "15px",
            border: "1px solid #4c2bce",
            marginBottom: "2vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#4c2bce",
            fontWeight: "500",
            fontSize: isMobile ? "4vw" : "1.2vw",
            marginTop: ".5vw",
          }}
        >
          Task Manage.
        </Box>
        <Box sx={{ width: "100%" }}>
          <List>
            {listItems.map((list, index) => (
              <NavLink key={index} to={list.path} end>
                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={list.path}
                    end
                    sx={{
                      "&.active": {
                        backgroundColor: "#4c2bce",
                        borderRadius: "10px",
                        color: "white !important",
                      },

                      fontWeight: "500",
                      fontSize: ".9rem",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {list.icon}
                    {list.title}
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              marginTop: isMobile ? "120vw" : "160%",
            }}
          >
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "10px",
                textTransform: "capitalize",
                fontWeight: "500 !important",
                fontSize: ".8rem",
                display: "flex",
                justifyContent: "start",
                backgroundColor: "#4c2bce",
                height: "40px",
              }}
            >
              <IconButton>
                <AddBoxIcon sx={{ color: "#fff" }} />
              </IconButton>
              Add Task
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "10px",
                textTransform: "capitalize",

                fontSize: ".8rem",
                display: "flex",
                justifyContent: "start",
                backgroundColor: "#fee4e5",
                height: "40px",
                color: "red",
                fontWeight: "600",
              }}
            >
              <IconButton>
                <LogoutIcon sx={{ color: "red" }} />
              </IconButton>
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Sidebar;
