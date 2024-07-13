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
  Checkbox,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../NavBar";
import axios from "axios";
import base_url from "../utils/API";

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
      console.log(response.data, "111111111");
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
      await axios.post(`${base_url}/client/project/`, formData);
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
        tech_id: formData.tech_id.map((tech) =>
          typeof tech === "string"
            ? techOptions.find((option) => option.label === tech).value
            : tech
        ),
      };
      await axios.put(`${base_url}/client/project/`, updatedFormData);
      getData();
      alert("Project updated Successfully");
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      tech_id: typeof value === "string" ? value.split(",") : value,
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
    setFormData(tableData[index]);
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
          <FormControl sx={{ margin: 2, width: 200 }}>
            <InputLabel htmlFor="tech-id">Tech Id</InputLabel>
            <Select
              labelId="tech-id-label"
              id="tech-id"
              label="tech_id"
              multiple
              value={formData.tech_id}
              onChange={handleTechChange}
              renderValue={(selected) =>
                selected
                  .map((techId) => {
                    const tech = techOptions.find(
                      (option) => option.value === techId
                    );
                    return tech ? tech.label : techId;
                  })
                  .join(", ")
              }
            >
              {techOptions.map((tech) => (
                <MenuItem key={tech.value} value={tech.value}>
                  <Checkbox checked={formData.tech_id.includes(tech.value)} />
                  <ListItemText primary={tech.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ margin: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleSubmit}
              size="large"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#123270",
                borderRadius: 2,
                "&:hover": { color: "black", backgroundColor: "#53B789" },
              }}
            >
              {editMode ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Tech Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.project_name}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.client_name}</TableCell>
                <TableCell>{row.team_name}</TableCell>
                <TableCell>{row.tech_id.join(", ")}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row.project_id)}
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
