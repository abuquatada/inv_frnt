import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Input,
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Table,
  TableBody,
  TableCell,IconButton, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
// import { Button, Box, Table, TableBody, TableCell, TextField, IconButton, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from "../NavBar";
function Project(props) {
  const { register, handleSubmit, reset } = useForm();
  let [data, setData] = useState([]);
  let [edit, setEdit] = useState({});
  let [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
    reset({
      project_id: edit?.project_id || "",
      project_name: edit?.project_name || "",
      duration: edit?.duration || "",
      client_id: edit?.client_id || "",
      team_id: edit?.team_id || "",
      tech_id: edit?.tech_id || "",
    });
  }, [edit, reset]);

  function addData(data, editable) {
    if (editable) {
      axios
        .put(`https://wcegn1j5l04f.share.zrok.io/client/project/edit.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          fetchData();
          setEdit({});
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      axios
        .post(`https://wcegn1j5l04f.share.zrok.io/client/project/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          fetchData();
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }

  function editData(data) {
    setEdit({ ...data });
    setOpen(true);
    
  }
  const handleAddClick = () => {
    edit({});
    setOpen(true);
  };
  function deleteData(id) {
    axios
      .delete(`https://wcegn1j5l04f.share.zrok.io/client/project/${id}`)
      .then((response) => {
        fetchData();
        setData(data.filter((e) => e.id !== id));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  async function fetchData() {
    try {
      const response = await axios.get("https://wcegn1j5l04f.share.zrok.io/client/project/");
      setData(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }
  const onSubmit = (data) => {
    addData(data, Object.keys(edit || {}).length > 0);
    // onClose();
  };
  const handleCloseModal = () => {
    setOpen(false);
    setEdit({});
  };
  return(
    <>
     <Box sx={{ display: 'block', p: 10, marginLeft:30 }}>
      <NavBar/>
      <Box sx={{display:'flex', justifyContent:'flex-end'}}>
      <Button
            onClick={handleAddClick}
            size='medium'
            variant='contained'
            sx={{ color: 'white', backgroundColor: '#123270', borderRadius: 2, '&:hover': { color: 'black', backgroundColor: '#53B789' } }}
          >
            ADD
          </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
            <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
        
          {/* <Typography id="modal-title" component="main" sx={{flexGrow:1}}>
            {editMode ? 'Edit Project' : 'Add Project'}
          </Typography> */}
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="project-id">Project Name</InputLabel>
            <Input
              id="project-name"
              name="project_name"
              {...register("project_name")}
            />
          </FormControl>
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="duration">Duration</InputLabel>
            <Input
              id="duration"
              name="duration"
              {...register("duration")}
            />
          </FormControl>
          <FormControl sx={{margin:2}}>
            <InputLabel htmlFor="client-id">Client Id</InputLabel>
            <Input
              id="client-id"
              name="client_id"
              {...register("client_id")}
            />
          </FormControl>
          <FormControl sx={{margin:2}}>
            <InputLabel htmlFor="team-id">Team Id</InputLabel>
            <Input
              id="team-id"
              name="team_id"
              {...register("team_id")}
            />
          </FormControl>
          <FormControl  sx={{margin:2}}>
            <InputLabel htmlFor="tech-id">Tech Id</InputLabel>
            <Input
              id="tech-id"
              name="tech_id"
             {...register("tech_id")}
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {/* {editMode ? 'Update' : 'Save'} */}
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
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Project ID</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Project Name</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Duration</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Client Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Team Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tech Id</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((e, index) => (
              <TableRow key={index} sx={{ m: 5, height:'3',backgroundColor: '#fff', '&:hover': { backgroundColor: '#dcf0e7' } }}>
                <TableCell sx={{textAlign: 'center' }}>{e.project_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{e.project_name}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{e.duration}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{e.client_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{e.team_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>{e.tech_id}</TableCell>
                <TableCell sx={{textAlign: 'center' }}>
                  <IconButton onClick={() => editData(e)} aria-label="edit" sx={{ color: 'grey' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteData(e.id)} aria-label="delete" sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
    
    </>
  );
}

export default Project;

// import React, { useState , useEffect} from 'react';
// import { Input, Box, Button, Typography, Table, TableBody, TableCell, IconButton,TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import NavBar from '../NavBar';
// import axios from "axios";
// import base_url from "../utils/API";
// function Project(props) {

//   const initialFormData = {
//     project_name: '',
//     duration: '',
//     client_id: '',
//     team_id: '',
//     tech_id: '',
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [tableData, setTableData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(`${base_url}/client/project/`);
//       setTableData(response.data);
//       console.log(response.data,'#$%^##');
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//     setEditMode(false);
//     setFormData(initialFormData); 
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditMode(false); 
//     setFormData(initialFormData); 
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     if (editMode) {
      
//       const updatedData = [...tableData];
//       updatedData[editIndex] = formData;
//       setTableData(updatedData);
//     } else {
//       setTableData([...tableData, formData]);
//     }
//     setFormData(initialFormData);
//     handleCloseModal();
//   };

//   const handleEdit = (index) => {
//     setFormData(tableData[index]);
//     setEditMode(true);
//     setEditIndex(index);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...tableData];
//     updatedData.splice(index, 1);
//     setTableData(updatedData);
//   };

//   return (
    // <Box sx={{ display: 'block', p: 10, marginLeft:30 }}>
    //   <NavBar />
    //   <Box sx={{display:'flex', justifyContent:'flex-end'}}>
    //     <Button
          
    //       onClick={handleOpenModal}
    //       size='medium'
    //       variant='contained'
    //       sx={{ color: 'white', backgroundColor: '#123270', borderRadius: 2, '&:hover': { color: 'black', backgroundColor: '#53B789' ,} }}
    //     >
    //       ADD
    //     </Button>
    //   </Box>

    //   <Modal open={isModalOpen}
    //     onClose={handleCloseModal}
    //     aria-labelledby="modal-title"
    //     aria-describedby="modal-description">
    //         <Box
    //       sx={{
    //         flexDirection: 'column',
    //         position: 'absolute',
    //         top: '60%',
    //         left: '60%',
    //         transform: 'translate(-50%, -50%)',
    //         width: 800,
    //         bgcolor: 'background.paper',
    //         border: '3px solid #455a64',
    //         boxShadow: 24,
    //         p: 4,
    //         borderRadius: 4,
    //       }}
    //     >
    //       <Typography id="modal-title" component="main" sx={{flexGrow:1}}>
    //         {editMode ? 'Edit Project' : 'Add Project'}
    //       </Typography>
    //       <FormControl  sx={{margin:2}}>
    //         <InputLabel htmlFor="project-id">Project Name</InputLabel>
    //         <Input
    //           id="project-name"
    //           name="project_name"
    //           value={formData.project_name}
    //           onChange={handleChange}
    //         />
    //       </FormControl>
    //       <FormControl  sx={{margin:2}}>
    //         <InputLabel htmlFor="duration">Duration</InputLabel>
    //         <Input
    //           id="duration"
    //           name="duration"
    //           value={formData.duration}
    //           onChange={handleChange}
    //         />
    //       </FormControl>
    //       <FormControl sx={{margin:2}}>
    //         <InputLabel htmlFor="client-id">Client Id</InputLabel>
    //         <Input
    //           id="client-id"
    //           name="client_id"
    //           value={formData.client_id}
    //           onChange={handleChange}
    //         />
    //       </FormControl>
    //       <FormControl sx={{margin:2}}>
    //         <InputLabel htmlFor="team-id">Team Id</InputLabel>
    //         <Input
    //           id="team-id"
    //           name="team_id"
    //           value={formData.team_id}
    //           onChange={handleChange}
    //         />
    //       </FormControl>
    //       <FormControl  sx={{margin:2}}>
    //         <InputLabel htmlFor="tech-id">Tech Id</InputLabel>
    //         <Input
    //           id="tech-id"
    //           name="tech_id"
    //           value={formData.tech_id}
    //           onChange={handleChange}
    //         />
    //       </FormControl>
    //       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
    //         <Button variant="contained" color="success" onClick={handleSubmit}>
    //           {editMode ? 'Update' : 'Save'}
    //         </Button>
    //         <Button variant="outlined" color="error" onClick={handleCloseModal}>
    //           Cancel
    //         </Button>
    //       </Box>
    //     </Box>
    //     </Modal>

    //   <TableContainer component={Paper} sx={{maxHeight:'100vh', marginTop: 5,}}>
    //     <Table>
    //       <TableHead sx={{ m: 5, backgroundColor: '#53B789'}}>
    //         <TableRow>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Project Name</TableCell>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Duration</TableCell>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Client Id</TableCell>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Team Id</TableCell>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tech Id</TableCell>
    //           <TableCell sx={{ color: 'white', textAlign: 'center' }}>Action</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {tableData.map((row, index) => (
    //           <TableRow key={index} sx={{ m: 5, height:'3',backgroundColor: '#fff', '&:hover': { backgroundColor: '#dcf0e7' } }}>
    //             <TableCell sx={{textAlign: 'center' }}>{row.project_name}</TableCell>
    //             <TableCell sx={{textAlign: 'center' }}>{row.duration}</TableCell>
    //             <TableCell sx={{textAlign: 'center' }}>{row.client_id}</TableCell>
    //             <TableCell sx={{textAlign: 'center' }}>{row.team_id}</TableCell>
    //             <TableCell sx={{textAlign: 'center' }}>{row.tech_id}</TableCell>
    //             <TableCell sx={{textAlign: 'center' }}>
    //               <IconButton onClick={() => handleEdit(index)} aria-label="edit" sx={{ color: 'grey' }}>
    //                 <EditIcon />
    //               </IconButton>
    //               <IconButton onClick={() => handleDelete(index)} aria-label="delete" sx={{ color: 'red' }}>
    //                 <DeleteIcon />
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>

    // </Box>
//   );
// }

// export default Project;















// {/* <Modal open={isModalOpen}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description">
//             <Box
//           sx={{
//             flexDirection: 'column',
//             position: 'absolute',
//             top: '60%',
//             left: '60%',
//             transform: 'translate(-50%, -50%)',
//             width: 800,
//             bgcolor: 'background.paper',
//             border: '3px solid #01579b',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="modal-title" component="main" sx={{flexGrow:1}}>
//             {editMode ? 'Edit Tax' : 'Add Tax'}
//           </Typography>
//           <FormControl  sx={{margin:2}}>
//             <InputLabel htmlFor="tax-name">Tax Name</InputLabel>
//             <Input
//               id="tax-name"
//               name="tax_name"
//               value={formData.tax_name}
//               onChange={handleChange}
//             />
//           </FormControl>
//           <FormControl  sx={{margin:2}}>
//             <InputLabel htmlFor="project_name">Project Name</InputLabel>
//             <Input
//               id="tax-rate"
//               name="tax_rate"
//               value={formData.tax_rate}
//               onChange={handleChange}
//             />
//           </FormControl>
//           <FormControl sx={{margin:2}}>
//             <InputLabel htmlFor="tax-rate">Tax Rate</InputLabel>
//             <Input
//               id="tax-rate"
//               name="tax_rate"
//               value={formData.tax_rate}
//               onChange={handleChange}
//             />
//           </FormControl>
//           <FormControl sx={{margin:2}}>
//             <InputLabel htmlFor="tax-rate">Tax Rate</InputLabel>
//             <Input
//               id="tax-rate"
//               name="tax_rate"
//               value={formData.tax_rate}
//               onChange={handleChange}
//             />
//           </FormControl>
//           <FormControl  sx={{margin:2}}>
//             <InputLabel htmlFor="tax-rate">Tax Rate</InputLabel>
//             <Input
//               id="tax-rate"
//               name="tax_rate"
//               value={formData.tax_rate}
//               onChange={handleChange}
//             />
//           </FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" color="success" onClick={handleSubmit}>
//               {editMode ? 'Update' : 'Save'}
//             </Button>
//             <Button variant="outlined" color="error" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//         </Modal> */}