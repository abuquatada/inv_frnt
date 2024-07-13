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
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import base_url from "../utils/API";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Project(props) {
  const initialFormData = {
    client_id: "",
    due_date: "",
    total_amount: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [client, setclient] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [client_id, setclient_id] = React.useState("");

  useEffect(() => {
    getData();
    getclient();
  }, []);

  const getclient = async () => {
    try {
      const response = await axios.get(`${base_url}/client/client/`);
      setclient(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const getData = async () => {
    try {
      const response = await axios.get(`${base_url}/client/invoice/`);
      console.log(response.data);
      setTableData(response.data);
    } catch (err) {
      console.log(err);
      console.error("Error fetching data:", err);
    }
  };

  function postDataToServer(values) {
    axios
      .post(`${base_url}/client/invoice/`, formData)
      .then((res) => {
        console.log(res.data);
        getData();
        alert("Invoice Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateDataToServer = async () => {
    try {
      await axios.put(`${base_url}/client/invoice/`, formData);
      getData();
      alert("Invoice updated Successfully");
    } catch (err) {
      console.error("Error updating client:", err);
    }
  };

  const deleteDataFromServer = async (invoice_id) => {
    try {
      await axios.delete(`${base_url}/client/invoice/?delete=${invoice_id}`);
      getData();
      alert("Client deleted Successfully");
    } catch (err) {
      console.error("Error deleting client:", err);
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

  const handleChangeClientDropdown = (event) => {
    setclient_id(event.target.value);
    setFormData({
      ...formData,
      client_id: +event.target.value,
    });
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
      updateDataToServer();
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
    } else {
      postDataToServer();
      setTableData([...tableData, { ...formData, id: tableData.length + 1 }]);
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

  const handleEditInvoice = () => {
    if (invoiceData) {
      setFormData(invoiceData);
      setEditMode(true);
      setEditIndex(tableData.findIndex((item) => item.id === invoiceData.id));
      setIsModalOpen(true);
      setIsInvoiceModalOpen(false);
    }
  };

  const handleDelete = (invoice_id) => {
    deleteDataFromServer(invoice_id);
  };

  const handleInvoiceClick = (id) => {
    const invoice = tableData.find((item) => item.id === id);
    setInvoiceData(invoice);
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceData(null);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Customer Name",
          "Invoice Number",
          "Order Number",
          "Invoice Date",
          "Due Date",
        ],
      ],
      body: [
        [
          invoiceData.customer_name,
          invoiceData.invoice_number,
          invoiceData.order_number,
          invoiceData.invoice_date,
          invoiceData.due_date,
        ],
      ],
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Description", "Quantity", "Price", "Amount"]],
      body: [
        [
          invoiceData.description,
          invoiceData.quantity,
          invoiceData.price,
          invoiceData.amount,
        ],
      ],
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Notes"]],
      body: [[invoiceData.notes]],
    });
    doc.save("invoice.pdf");
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Customer Name",
          "Invoice Number",
          "Order Number",
          "Invoice Date",
          "Due Date",
        ],
      ],
      body: [
        [
          invoiceData.customer_name,
          invoiceData.invoice_number,
          invoiceData.order_number,
          invoiceData.invoice_date,
          invoiceData.due_date,
        ],
      ],
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Description", "Quantity", "Price", "Amount"]],
      body: [
        [
          invoiceData.description,
          invoiceData.quantity,
          invoiceData.price,
          invoiceData.amount,
        ],
      ],
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Notes"]],
      body: [[invoiceData.notes]],
    });
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url);
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
            {editMode ? "Edit Invoice" : "Add Invoice"}
          </Typography>
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
                <MenuItem value={row.client_id}>{row.client_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="due-date">Due Date</InputLabel>
            <Input
              // type='date'
              id="due-date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="amount">Total Amount</InputLabel>
            <Input
              id="total-amount"
              name="total_amount"
              value={formData.total_amount}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="invoice-number">status</InputLabel>
            <Input
              id="status"
              name="status"
              value={formData.status}
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
                ID
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Client Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Due Date
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData

              .filter((e) => {
                return search.toLowerCase() === ""
                  ? e
                  : e.client_id?.client_name.toLowerCase().includes(search);
              })
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    m: 5,
                    height: "3",
                    backgroundColor: "#fff",
                    "&:hover": { backgroundColor: "#dcf0e7" },
                  }}
                >
                  <TableCell
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => handleInvoiceClick(row.id)}
                  >
                    {row.invoice_id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.client_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.due_date}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.total_amount}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.status}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleEdit(index)}
                      aria-label="edit"
                      sx={{ color: "grey" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.invoice_id)}
                      aria-label="delete"
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

      <Modal open={isInvoiceModalOpen} onClose={handleCloseInvoiceModal}>
        <Box
          sx={{
            flexDirection: "column",
            position: "absolute",
            top: "60%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 450,
            bgcolor: "background.paper",
            border: "3px solid #455a64",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-title" component="h2">
            Invoice Details
          </Typography>
          {invoiceData && (
            <>
              <Typography variant="body1">
                Customer Name: {invoiceData.customer_name}
              </Typography>
              <Typography variant="body1">
                Invoice Number: {invoiceData.invoice_number}
              </Typography>
              <Typography variant="body1">
                Order Number: {invoiceData.order_number}
              </Typography>
              <Typography variant="body1">
                Invoice Date: {invoiceData.invoice_date}
              </Typography>
              <Typography variant="body1">
                Due Date: {invoiceData.due_date}
              </Typography>
              <Typography variant="body1">
                Notes: {invoiceData.notes}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{invoiceData.description}</TableCell>
                    <TableCell>{invoiceData.quantity}</TableCell>
                    <TableCell>{invoiceData.price}</TableCell>
                    <TableCell>{invoiceData.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrintPDF}
                >
                  Print
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleEditInvoice}
                >
                  Edit
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Project;
