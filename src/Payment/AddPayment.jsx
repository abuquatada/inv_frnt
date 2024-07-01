import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import PaymentTable from "./PaymentTable";

export default function AddPayment() {
  let [data, setData] = useState([]);
  let [edit, setEdit] = useState({});
  let [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function addData(data, editable) {
    if (editable) {
      axios
        .put(`http://localhost:3000/payment/${edit.id}`, data, {
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
        .post(`http://localhost:3000/payment/`, data, {
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

  function deleteData(id) {
    axios
      .delete(`http://localhost:3000/payment/${id}`)
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
      const response = await axios.get("http://localhost:3000/payment/");
      setData(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <>
      <PaymentForm
        open={open}
        onClose={() => setOpen(false)}
        addData={addData}
        edit={edit}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PaymentTable
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