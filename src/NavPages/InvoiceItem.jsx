import React, { useState } from 'react';
import { Input, Box, Button, Typography, Table, TableBody, TableCell, IconButton,TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from '../NavBar';

function Project(props) {

  const initialFormData = {
    invoice_id: '',
    project_id: '',
    item_price: '',
    tax_id: '',
    tax_amount: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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

  const handleDelete = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  return (
    <Box sx={{ display: 'block', p: 10, marginLeft:30}}>
      <NavBar />
      <Box sx={{display:'flex', justifyContent:'flex-end'}}>
        <Button
          
          onClick={handleOpenModal}
          size='medium'
          variant='contained'
          sx={{ color: 'white', backgroundColor: '#123270', borderRadius: 2, '&:hover': { color: 'black', backgroundColor: '#53B789' ,} }}
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
          <Typography id="modal-title" component="main" sx={{flexGrow:1}}>
            {editMode ? 'Edit Invoice' : 'Add Invoice'}
          </Typography>
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="project-id">Invoice Id</InputLabel>
            <Input
              id="invoice-id"
              name="invoice_id"
              value={formData.invoice_id}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="project_id">Project Id</InputLabel>
            <Input
              id="project-id"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{margin:2}}>
            <InputLabel htmlFor="client-id">Item Price</InputLabel>
            <Input
              id="item-price"
              name="item_price"
              value={formData.item_price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{margin:2}}>
            <InputLabel htmlFor="team-id">Tax Id</InputLabel>
            <Input
              id="tax-id"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="tech-id">Tax Amount</InputLabel>
            <Input
              id="tax-amount"
              name="tax_amount"
              value={formData.tax_amount}
              onChange={handleChange}
            />
          </FormControl>
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

      <TableContainer component={Paper} sx={{maxHeight:'100vh', marginTop: 5,}}>
        <Table>
          <TableHead sx={{ m: 5, backgroundColor: '#53B789'}}>
            <TableRow>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Invoice Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Project Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Item Price</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tax Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tax Amount</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} sx={{ m: 5, height:'3',backgroundColor: '#fff', '&:hover': { backgroundColor: '#dcf0e7' } }}>
                <TableCell sx={{textAlign: 'center' }}>{row.invoice_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{row.project_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{row.item_price}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{row.tax_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{row.tax_amount}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>
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

    </Box>
  );
}

export default Project;















    