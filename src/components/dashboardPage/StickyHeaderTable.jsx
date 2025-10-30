import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";

import {
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  useAddTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../features/api/apiSlice";
import ErrorMessageKit from "../message/ErrorMessageKit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { id: "index", label: "S.No.", minWidth: 10 },
  { id: "name", label: "Task Name", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
  {
    id: "createdOn",
    label: "Created On",
    minWidth: 170,
    align: "left",
  },
  {
    id: "dueDate",
    label: "Due Date",
    minWidth: 170,
    align: "left",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "left",
  },
];

function createData(
  id,
  index,
  name,
  status,
  createdOn,
  dueDate,
  size,
  taskDesc
) {
  return { id, index, name, status, createdOn, dueDate, size, taskDesc };
}

var rows = [];

const minDate = dayjs();

export default function StickyHeadTable() {
  const { data = [], isLoading, isError } = useGetTasksQuery();
  const [
    updateTask,
    {
      isLoading: updateTaskLoading,
      isError: updateTaskError,
      isSuccess: updateTaskSuccess,
    },
  ] = useUpdateTaskMutation();

  const [
    completeTask,
    {
      isLoading: completeTaskLoading,
      isError: completeTaskError,
      isSuccess: completeTaskSuccess,
    },
  ] = useCompleteTaskMutation();
  const [
    deleteTask,
    { isLoading: deleteTaskLoading, isError: deletetaskError },
  ] = useDeleteTaskMutation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const loading = false;

  const [deletingRowId, setDeletingRowId] = useState(null);
  const [completedId, setCompletedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    taskName: "",
    taskDesc: "",
    dueDate: "",
    status: "to-do",
    isCompleted: false,
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const newDateFormat = (rawDate) => {
    const date = new Date(rawDate);
    const dateArray = date.toISOString().split("T");
    const formattedDate = dateArray[0];
    return formattedDate;
  };

  const notify = (message) => toast.success(message);

  rows = data?.map((e, index) =>
    createData(
      e.id,
      index + 1,
      e.taskName,
      e.status,
      newDateFormat(e.createdAt),
      e.dueDate,
      8515767,
      e.taskDesc
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChipColor = (status) => {
    if (status === "to-do") {
      return "#dfdfdfb5";
    } else if (status === "in-progress") {
      return "#ffea005f";
    } else {
      return "#04ff004e";
    }
  };

  const handleTaskCompleted = async (task) => {
    const updatedData = {
      status: "Completed",
    };
    setCompletedId(task.id);
    await completeTask({ id: task.id, updatedData });
  };

  const handleTaskDelete = async (task) => {
    setDeletingRowId(task.id);
    await deleteTask(task.id);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: newDate.format("YYYY-MM-DD")
        ? newDate.format("YYYY-MM-DD")
        : null,
    }));
  };

  const handleSubmitForm = async () => {
    try {
      if (formData.taskName.length === 0 || formData.dueDate.length === 0) {
        setErrorMessage("Task name & Due date should not be empty.");
        return;
      }

      await updateTask({ id: selectedRow.id, updatedData: formData });
      if (updateTaskSuccess) {
        notify("Task updated.");
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditChange = (rowData) => {
    setFormData({
      taskName: rowData.name,
      taskDesc: rowData.taskDesc,
      dueDate: rowData.dueDate
        ? dayjs(rowData.dueDate).format("YYYY-MM-DD")
        : null,
      status: rowData.status,
      isCompleted: rowData.isCompleted,
    });
    setSelectedRow(rowData);
    handleOpen();
  };

  const formattedDueDte = formData.dueDate
    ? dayjs(formData.dueDate).format("YYYY-MM-DD")
    : null;

  console.log(formData.dueDate);

  return (
    <>
      {/* EDIT MODAL CODE BELOW */}
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
            <AddBoxIcon sx={{ fontSize: "1.2rem" }} /> Edit Task
          </Typography>

          {/* Task Name */}
          <TextField
            label="Task Name"
            name="taskName"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleFormData}
            value={formData.taskName || ""}
            InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
            inputProps={{ style: { fontSize: "0.8rem" } }}
          />

          {/* Task Description */}
          <TextField
            label="Task Description"
            name="taskDesc"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            minRows={2}
            onChange={handleFormData}
            value={formData.taskDesc || ""}
            InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
            inputProps={{ style: { fontSize: "0.8rem" } }}
          />

          {/* Due Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              name="dueDate"
              value={formData.dueDate ? dayjs(formattedDueDte) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  InputLabelProps: { sx: { fontSize: "0.8rem" } },
                  inputProps: { style: { fontSize: "0.8rem" } },
                },
              }}
            />
          </LocalizationProvider>

          {/* Status */}
          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontSize: "0.8rem" }}>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={formData.status || "to-do"}
              onChange={handleFormData}
              sx={{ fontSize: "0.8rem" }}
            >
              <MenuItem value="to-do" sx={{ fontSize: "0.8rem" }}>
                To Do
              </MenuItem>
              <MenuItem value="in-progress" sx={{ fontSize: "0.8rem" }}>
                In Progress
              </MenuItem>
              <MenuItem value="Completed" sx={{ fontSize: "0.8rem" }}>
                Completed
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

          {updateTaskError ? (
            <ErrorMessageKit err={"Something went wrong"} />
          ) : (
            <></>
          )}

          {/* Action Buttons */}
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
              {updateTaskLoading ? "Please wait ..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* EDIT MODAL CODE ABOVE */}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: ".9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        if (column.id === "index") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        } else if (column.id === "name") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        } else if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Chip
                                sx={{ backgroundColor: handleChipColor(value) }}
                                style={{ textTransform: "capitalize" }}
                                label={value}
                              />
                            </TableCell>
                          );
                        } else if (column.id === "createdOn") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        } else if (column.id === "dueDate") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ display: "flex", gap: 1 }}
                            >
                              <Button
                                onClick={() => handleEditChange(row)}
                                sx={{
                                  textTransform: "Capitalize",
                                  color: "#fff",
                                  backgroundColor: "#00a6c7ff",
                                  fontSize: ".8rem",
                                }}
                                size="small"
                              >
                                Edit
                              </Button>
                              {row.status !== "Completed" ? (
                                <Button
                                  sx={{
                                    textTransform: "Capitalize",
                                    color: "#fff",
                                    backgroundColor: "#14c700ff",
                                    fontSize: ".8rem",
                                  }}
                                  size="small"
                                  onClick={() => handleTaskCompleted(row)}
                                >
                                 {completedId === row.id && completeTaskLoading ? "Proccesing" : "Done"}

                                </Button>
                              ) : (
                                <Button
                                  disabled
                                  sx={{
                                    fontSize: ".8rem",
                                    textTransform: "capitalize",
                                    color: "#14c700ff",
                                    display: "flex",
                                  }}
                                >
                                  Done
                                  <CheckCircleIcon
                                    sx={{
                                      fontSize: "1rem",
                                      color: "#deddddff",
                                    }}
                                  />
                                </Button>
                              )}
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => handleTaskDelete(row)}
                                sx={{
                                  fontSize: ".8rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                {deletingRowId === row.id
                                  ? "Deleting.."
                                  : "Delete"}
                              </Button>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
