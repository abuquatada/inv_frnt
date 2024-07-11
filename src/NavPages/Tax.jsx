import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Modal,
} from "@mui/material";

import NavBar from "../NavBar";
import axios from "axios";
import base_url from "../utils/API";

function Tax(props) {
  const initialFormData = {
    tax_name: "",
    rate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${base_url}/client/api/tax/`);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
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

  const handleSubmit = () => {
    if (editMode) {
      const updatedData = [...tableData];

      setTableData(updatedData);
    } else {
      setTableData([...tableData, formData]);
    }
    setFormData(initialFormData);
    handleCloseModal();
  };

  return (
    <Box sx={{ display: "block", p: 10, marginLeft: 30 }}>
      <NavBar />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "3px solid #455a64",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {editMode ? "Edit Tax" : "Add Tax"}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="tax-name">Tax Name</InputLabel>
            <Input
              id="tax-name"
              name="tax_name"
              value={formData.tax_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="tax-rate">Tax Rate</InputLabel>
            <Input
              id="tax-rate"
              name="tax_rate"
              value={formData.tax_rate}
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
          <TableHead sx={{ m: 5, backgroundColor: "#53B789" }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Tax Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Tax Rate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.tax_id}
                sx={{
                  m: 5,
                  height: "3",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#dcf0e7" },
                }}
              >
                <TableCell sx={{ textAlign: "center" }}>
                  {row.tax_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.rate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tax;
