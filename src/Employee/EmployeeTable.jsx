import React from 'react';
import { Button, Box, Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function EmployeeTable({ data, edit, dlt, setOpen }) {
  function handleAddClick() {
    edit({});
    setOpen(true);
  }
  return (
    <>
     <Box sx={{ display: 'block'  }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleAddClick}
            size='medium'
            variant='contained'
            sx={{ color: 'white', backgroundColor: '#123270', borderRadius: 2, '&:hover': { color: 'black', backgroundColor: '#53B789' } }}
          >
            ADD
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: '100vh', marginTop: 5 }}>
          <Table>
            <TableHead sx={{ m: 5, backgroundColor: '#53B789' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Employee ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>User ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Age</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Salary</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>ID Proof</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Address</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Pincode</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>City ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>State ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Country ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Role ID</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((e, index) => (
                <TableRow key={index} sx={{ m: 5, height: '3', backgroundColor: '#fff', '&:hover': { backgroundColor: '#dcf0e7' } }}>
                  <TableCell sx={{ textAlign: 'center' }}>{e.id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.user_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.age}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.salary}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.id_proof}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.address}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.pincode}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.city_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.state_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.country_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.role_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => edit(e)} aria-label="edit" sx={{ color: 'grey' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dlt(e.id)} aria-label="delete" sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{ marginBottom: 2 }}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ m: 5, backgroundColor: "primary.main" }}>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">User Id</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Salary</TableCell>
              <TableCell align="center">ID Proof</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Pincode</TableCell>
              <TableCell align="center">City ID</TableCell>
              <TableCell align="center">State ID</TableCell>
              <TableCell align="center">Country ID</TableCell>
              <TableCell align="center">Role ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((e, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {e.id}
                  </TableCell>
                  <TableCell align="center">{e.user_id}</TableCell>
                  <TableCell align="center">{e.age}</TableCell>
                  <TableCell align="center">${e.salary}</TableCell>
                  <TableCell align="center">{e.id_proof}</TableCell>
                  <TableCell align="center">{e.address}</TableCell>
                  <TableCell align="center">{e.pincode}</TableCell>
                  <TableCell align="center">{e.city_id}</TableCell>
                  <TableCell align="center">{e.state_id}</TableCell>
                  <TableCell align="center">{e.country_id}</TableCell>
                  <TableCell align="center">{e.role_id}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" sx={{m:1}} onClick={() => edit(e)}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => dlt(e.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
