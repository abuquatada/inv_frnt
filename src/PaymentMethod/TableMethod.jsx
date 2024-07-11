import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function TableMethod({ data, edit, dlt, setOpen }) {
  return (
    <>
      <Box sx={{ display: "block" }}>
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
                    <TableCell sx={{ textAlign: "center" }}>
                      {e.payment_method_id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {e.payment_type}
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
