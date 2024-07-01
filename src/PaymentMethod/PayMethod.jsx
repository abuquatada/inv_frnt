import React, { useState, useEffect } from "react";
import Form from "./Form";
import { Routes, Route } from "react-router-dom";
import TableMethod from "./TableMethod";
import axios from "axios";
export default function PayMethod() {
  let [data, setdata] = useState([]);
  let [edit, setEdit] = useState({});
  let [open, setOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  function addData(data, editable) {
    if (editable) {
      axios
        .put(`http://localhost:3000/Paymethod/${edit.id}`, data, {
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
          console.log("error");
        });
    } else {
      axios.post(`http://localhost:3000/Paymethod/`, data,{
        headers:{
          "Content-Type":"application/json",
        }
      })
        .then((response)=>{
          fetchData()
          setOpen(false)
        })
        .catch((error)=>{
          console.log("error");
        })
    }
  }
  function editData(data) {
    setEdit({ ...data });
    setOpen(true);
  }
  function deleteData(id) {
    axios
      .delete(`http://localhost:3000/Paymethod/${id}`)
      .then((response) => {
        fetchData();
        setdata(data.filter((e) => e.id !== id));
      })
      .catch((error) => {
        console.log("error");
      });
  }
  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3000/Paymethod/`);
      setdata(response.data);
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <>
      <Form
        open={open}
        onClose={() => setOpen(false)}
        addData={addData}
        edit={edit}
      />
      <Routes>
        <Route
          path="/"
          element={
            <TableMethod
              data={data}
              edit={editData}
              dlt={deleteData}
              setOpen={setOpen}
            />
          }
        />
      </Routes>
    </>
  );
}
