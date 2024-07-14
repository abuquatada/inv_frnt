import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Modal,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../NavBar";
import axios from "axios";
import base_url from "../utils/API";
import ReactSelect from "react-select";

const Project = (props) => {
  const initialFormData = {
    project_name: "",
    duration: "",
    client_id: "",
    team_id: "",
    tech_id: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tech_id, settech_id] = useState([]);
  const [techOptions, setTechOptions] = useState([]);
  const [client, setClient] = useState([]);
  const [team, setTeam] = useState([]);
  const [client_id, setClient_id] = useState("");
  const [team_id, setTeam_id] = useState("");

  useEffect(() => {
    getData();
    getClient();
    getTeam();
    fetchTechOptions();
  }, []);

  const getClient = async () => {
    try {
      const response = await axios.get(`${base_url}/client/client/`);
      setClient(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getTeam = async () => {
    try {
      const response = await axios.get(`${base_url}/client/team/`);
      setTeam(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${base_url}/client/project/`);
      setTableData(response.data);
      console.log(response.data, "#$%^##");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchTechOptions = async () => {
    try {
      const response = await axios.get(`${base_url}/client/api/technology/`);
      setTechOptions(
        response.data.map((tech) => ({
          value: tech.tech_id,
          label: tech.name,
        }))
      );
    } catch (err) {
      console.error("Error fetching tech options:", err);
    }
  };

  const postDataToServer = async () => {
    try {
      const newFormData = {
        ...formData,
        tech_id: tech_id.map((tech) => tech.value),
      };
      await axios.post(`${base_url}/client/project/`, newFormData);
      getData();
      alert("Project Added Successfully");
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const updateDataToServer = async () => {
    try {
      const updatedFormData = {
        ...formData,
        tech_id: tech_id.map((tech) => tech.value),
      };
      await axios.put(`${base_url}/client/project/`, updatedFormData);
      alert("Project updated Successfully");
      getData();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const deleteDataFromServer = async (project_id) => {
    try {
      await axios.delete(`${base_url}/client/project/?delete=${project_id}`);
      getData();
      alert("Project deleted Successfully");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditMode(false);
    setFormData(initialFormData);
    settech_id([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setFormData(initialFormData);
    settech_id([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechChange = (selectedOptions) => {
    settech_id(selectedOptions);
    setFormData({
      ...formData,
      tech_id: selectedOptions,
    });
  };

  const handleChangeClientDropdown = (event) => {
    setClient_id(event.target.value);
    setFormData({
      ...formData,
      client_id: +event.target.value,
    });
  };

  const handleChangeTeamDropdown = (event) => {
    setTeam_id(event.target.value);
    setFormData({
      ...formData,
      team_id: +event.target.value,
    });
  };

  const handleSubmit = () => {
    if (editMode) {
      updateDataToServer();
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
    } else {
      postDataToServer();
      setTableData([...tableData, formData]);
    }
    setFormData(initialFormData);
    handleCloseModal();
  };

  const handleEdit = (index) => {
    const project = tableData[index];
    const selectedTech = project.tech_id.map((id) =>
      techOptions.find((option) => option.value === id)
    );
    setFormData(project);
    settech_id(selectedTech);
    setEditMode(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (project_id) => {
    deleteDataFromServer(project_id);
  };

  return (
    <Box sx={{ display: "block", p: 10, marginLeft: 30 }}>
      <NavBar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleOpenModal}
          size="medium"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#123270",
            borderRadius: 2,
            "&:hover": { color: "black", backgroundColor: "#53B789" },
          }}
        >
          ADD
        </Button>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            flexDirection: "column",
            position: "absolute",
            top: "60%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "3px solid #455a64",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-title" component="main" sx={{ flexGrow: 1 }}>
            {editMode ? "Edit Project" : "Add Project"}
          </Typography>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="project-name">Project Name</InputLabel>
            <Input
              id="project-name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="duration">Duration</InputLabel>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2, width: 200 }}>
            <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={client_id}
              variant="standard"
              label="Client Name"
              onChange={handleChangeClientDropdown}
            >
              {client.map((row, index) => (
                <MenuItem key={index} value={row.client_id}>
                  {row.client_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ margin: 2, width: 200 }}>
            <InputLabel htmlFor="team-id">Team Id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="team"
              value={team_id}
              variant="standard"
              label="Team"
              onChange={handleChangeTeamDropdown}
            >
              {team.map((row, index) => (
                <MenuItem key={index} value={row.team_id}>
                  {row.team_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              margin: 2,
              width: 200,
            }}
          >
            <label>Technologies</label>
            <ReactSelect
              isMulti
              name="tech_id"
              id="tech_id"
              options={techOptions}
              value={tech_id}
              onChange={handleTechChange}
            />
          </FormControl>
          <Box
            sx={{
              margin: 2,
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              onClick={handleSubmit}
              size="large"
              variant="contained"
              color="success"
            >
              {editMode ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table>
          <TableHead sx={{ m: 5, backgroundColor: "#53B789" }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Project Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Duration
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Client Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Team Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Tech Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  m: 5,
                  height: "3",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#dcf0e7" },
                }}
              >
                <TableCell sx={{ textAlign: "center" }}>
                  {row.project_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.duration}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.client_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.team_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.tech_id.join(", ")}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(index)}
                    sx={{ color: "grey" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row.project_id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Project;
