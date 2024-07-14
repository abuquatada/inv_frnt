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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../NavBar";
import axios from "axios";
import base_url from "../utils/API";

function Project(props) {
  const initialFormData = {
    client_name: "",
    company_address: "",
    user_id: {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      contact: "",
      password: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${base_url}/client/client/`);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const postDataToServer = async () => {
    try {
      await axios.post(`${base_url}/client/client/`, formData);
      alert("Client Added Successfully");
      getData();
    } catch (err) {
      console.error("Error adding client:", err);
    }
  };

  const updateDataToServer = async (client_id) => {
    const { password, ...updateData } = formData;
    try {
      await axios.patch(
        `${base_url}/client/client/?client_update=${client_id}`,
        updateData
      );
      alert("Client updated Successfully");
      getData();
    } catch (err) {
      console.error("Error updating client:", err);
    }
  };

  const deleteDataFromServer = async (client_id) => {
    try {
      await axios.delete(
        `${base_url}/client/client/?delete_client=${client_id}`
      );
      getData();
      alert("Client deleted Successfully");
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  const handleOpenModal = (client = null) => {
    if (client) {
      setFormData(client);
      setEditMode(true);
      setCurrentClientId(client.client_id);
    } else {
      setFormData(initialFormData);
      setEditMode(false);
      setCurrentClientId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setEditMode(false);
    setCurrentClientId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData((prevFormData) => {
        const updatedData = { ...prevFormData };
        let nestedObject = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
          nestedObject = nestedObject[keys[i]];
        }

        nestedObject[keys[keys.length - 1]] = value;
        return updatedData;
      });
    }
  };

  const handleSubmit = () => {
    if (editMode && currentClientId) {
      updateDataToServer(currentClientId);
    } else {
      postDataToServer();
    }
    handleCloseModal();
  };

  const handleEdit = (client) => {
    handleOpenModal(client);
  };

  const handleDelete = (client_id) => {
    deleteDataFromServer(client_id);
  };

  return (
    <Box sx={{ display: "block", p: 10, marginLeft: 30 }}>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          type="search"
          placeholder="Enter the Client Name"
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{
            flex: 1,
            mr: 2,
            "& .MuiOutlinedInput-root": {
              height: "43px",
              width: 780,
              borderRadius: 16,
            },
          }}
        />
        <Button
          onClick={() => handleOpenModal()}
          size="medium"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#123270",
            borderRadius: 2,
            height: "40px",
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "3px solid #455a64",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-title" component="h2">
            {editMode ? "Edit Client" : "Add Client"}
          </Typography>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="client-name">Client Name</InputLabel>
            <Input
              id="client-name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="user_id.user_name">User Name</InputLabel>
            <Input
              id="user_id.user_name"
              name="user_id.user_name"
              value={formData.user_id.user_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="user_id.first_name">First Name</InputLabel>
            <Input
              id="user_id.first_name"
              name="user_id.first_name"
              value={formData.user_id.first_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="user_id.last_name">Last Name</InputLabel>
            <Input
              id="user_id.last_name"
              name="user_id.last_name"
              value={formData.user_id.last_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="user_id.email">Email</InputLabel>
            <Input
              id="user_id.email"
              name="user_id.email"
              value={formData.user_id.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="user_id.contact">Contact</InputLabel>
            <Input
              id="user_id.contact"
              name="user_id.contact"
              value={formData.user_id.contact}
              onChange={handleChange}
            />
          </FormControl>
          {!editMode && (
            <FormControl sx={{ margin: 2 }}>
              <InputLabel htmlFor="user_id.password">Password</InputLabel>
              <Input
                id="user_id.password"
                name="user_id.password"
                value={formData.user_id.password}
                onChange={handleChange}
                type="password"
              />
            </FormControl>
          )}
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="company-address">Company Address</InputLabel>
            <Input
              id="company-address"
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {editMode ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#53B789" }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Client Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                User Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                First Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Contact
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Company Address
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData
                .filter((client) =>
                  client.client_name
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((client) => (
                  <TableRow key={client.client_id}>
                    <TableCell>{client.client_name}</TableCell>
                    <TableCell>{client.user_id.user_name}</TableCell>
                    <TableCell>{client.user_id.first_name}</TableCell>
                    <TableCell>{client.user_id.last_name}</TableCell>
                    <TableCell>{client.user_id.email}</TableCell>
                    <TableCell>{client.user_id.contact}</TableCell>
                    <TableCell>{client.company_address}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(client)}
                        sx={{ color: "gray" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(client.client_id)}
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
}

export default Project;
