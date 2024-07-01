import React from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function TableMethod({ data, edit, dlt, setOpen }) {
  const handleAddClick = () => {
    edit({});
    setOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "block" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleAddClick}
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
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100vh", marginTop: 5 }}
        >
          <Table>
            <TableHead sx={{ m: 5, backgroundColor: "#53B789" }}>
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Method ID
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Payment Type
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((e, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      m: 5,
                      height: "3",
                      backgroundColor: "#fff",
                      "&:hover": { backgroundColor: "#dcf0e7" },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>{e.id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {e.payment_type}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => edit(e)}
                        aria-label="edit"
                        sx={{ color: "grey" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => dlt(e.id)}
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
      </Box>
    </>
  );
}
