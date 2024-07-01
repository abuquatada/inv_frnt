import React, { useState,useEffect } from 'react';
import { Input, Box, Button, Typography, Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from '../NavBar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import base_url from '../utils/API';


function Project(props) {
  const initialFormData = {
    client_id: '',
    due_date: '',
    total_amount: '',
    status: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);


  useEffect(() => {
    getData();
     }, []);

  const getData= async()=>{
    try {
        const response = await axios.get(`${base_url}/client/invoice/`);
        console.log(response.data);
        setTableData(response.data);
    } catch (err) {
        console.log(err);
        console.error('Error fetching data:', err);
  
    }
   }

   function postDataToServer(values) {
    axios.post(`${base_url}/client/invoice/`, formData
    ).then((res)=>{
      console.log(res.data);
      getData();
      alert('Applicant Added Successfully')
    }).catch((err)=>{
      console.log(err);
      })
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

  const handleSubmit = () => {
    if (editMode) {
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
      setEditIndex(tableData.findIndex(item => item.id === invoiceData.id));
      setIsModalOpen(true);
      setIsInvoiceModalOpen(false);
    }
  };

  const handleDelete = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const handleInvoiceClick = (id) => {
    const invoice = tableData.find(item => item.id === id);
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
      head: [['Customer Name', 'Invoice Number', 'Order Number', 'Invoice Date', 'Due Date']],
      body: [[invoiceData.customer_name, invoiceData.invoice_number, invoiceData.order_number, invoiceData.invoice_date, invoiceData.due_date]]
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Description', 'Quantity', 'Price', 'Amount']],
      body: [[invoiceData.description, invoiceData.quantity, invoiceData.price, invoiceData.amount]]
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Notes']],
      body: [[invoiceData.notes]]
    });
    doc.save('invoice.pdf');
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['Customer Name', 'Invoice Number', 'Order Number', 'Invoice Date', 'Due Date']],
      body: [[invoiceData.customer_name, invoiceData.invoice_number, invoiceData.order_number, invoiceData.invoice_date, invoiceData.due_date]]
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Description', 'Quantity', 'Price', 'Amount']],
      body: [[invoiceData.description, invoiceData.quantity, invoiceData.price, invoiceData.amount]]
    });
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Notes']],
      body: [[invoiceData.notes]]
    });
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <Box sx={{ display: 'block', p: 10, marginLeft:30}}>
      <NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleOpenModal}
          size='medium'
          variant='contained'
          sx={{ color: 'white', backgroundColor: '#123270', borderRadius: 2, '&:hover': { color: 'black', backgroundColor: '#53B789', } }}
        >
          ADD
        </Button>
      </Box>

      <Modal open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box
          sx={{
            flexDirection: 'column',
            position: 'absolute',
            top: '60%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '3px solid #455a64',
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-title" component="main" sx={{ flexGrow: 1 }}>
            {editMode ? 'Edit Invoice' : 'Add Invoice'}
          </Typography>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="customer-name">Client Name</InputLabel>
            <Input
              id="client-id"
              name="client_id"
              value={formData.client_id}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  client_id: +e.target.value,
                });
              }}
            />
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
          {/* <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="order-number">Order Number</InputLabel>
            <Input
              id="order-number"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="invoice-date">Invoice Date</InputLabel>
            <Input
              id="invoice-date"
              name="invoice_date"
              value={formData.invoice_date}
              onChange={handleChange}
            />
          </FormControl>
          
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormControl>
          
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="notes">Notes</InputLabel>
            <Input
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormControl> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ maxHeight: '100vh', marginTop: 5 }}>
        <Table>
          <TableHead sx={{ m: 5, backgroundColor: '#53B789' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Client Name</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Due Date</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row, index) => (
              <TableRow key={index} sx={{ m: 5, height: '3', backgroundColor: '#fff', '&:hover': { backgroundColor: '#dcf0e7' } }}>
                <TableCell sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleInvoiceClick(row.id)}>{row.invoice_id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.client_id?.client_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.due_date}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.total_amount}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.status}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton onClick={() => handleEdit(index)} aria-label="edit" sx={{ color: 'grey' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} aria-label="delete" sx={{ color: 'red' }}>
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
            flexDirection: 'column',
            position: 'absolute',
            top: '60%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 450,
            bgcolor: 'background.paper',
            border: '3px solid #455a64',
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
              <Typography variant="body1">Customer Name: {invoiceData.customer_name}</Typography>
              <Typography variant="body1">Invoice Number: {invoiceData.invoice_number}</Typography>
              <Typography variant="body1">Order Number: {invoiceData.order_number}</Typography>
              <Typography variant="body1">Invoice Date: {invoiceData.invoice_date}</Typography>
              <Typography variant="body1">Due Date: {invoiceData.due_date}</Typography>
              <Typography variant="body1">Notes: {invoiceData.notes}</Typography>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePrintPDF}>
                  Print
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
                <Button variant="contained" color="info" onClick={handleEditInvoice}>
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
