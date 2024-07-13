// import React, { useEffect, useState } from "react";
// import NavBar from "../NavBar";
// import Box from "@mui/material/Box";
// import Plot from "react-plotly.js";
// import axios from "axios";
// import base_url from "../utils/API";

// function Home(props) {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(`${base_url}/client/chart/`);
//       console.log(response.data);
//       setTableData(response.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   return (
//     <div>
//       <Box sx={{ display: "flex", p: 10 }}>
//         <NavBar />
//         <Box component="main" sx={{ flexGrow: 1 }}>
//           {/* <h1>Total Sales</h1> */}
//           <Plot
//             data={[
//               {
//                 x: tableData.due,
//                 y: tableData.total_amount,
//                 type: "bar",
//                 mode: "lines+markers",
//                 marker: { color: "123270" },
//               },
//             ]}
//             layout={{
//               title: "TOTAL SALES",
//               width: 800,
//               height: 450,
//               xaxis: { title: "Invoices - Month Wise" },
//               yaxis: { title: "Amount" },
//             }}
//           />

//           <Plot
//             data={[
//               {
//                 labels: tableData.tech_count_name,
//                 values: tableData.tech_count_num,
//                 type: "pie",
//               },
//             ]}
//             layout={{
//               title: "TECHNOLOGIES",
//               width: 850,
//               height: 500,
//               margin: { l: 50, r: 50, b: 100, t: 120 },
//             }}
//           />
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Box from "@mui/material/Box";
import Plot from "react-plotly.js";
import axios from "axios";
import base_url from "../utils/API";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Home(props) {
  const [tableData, setTableData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("technologies");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${base_url}/client/chart/`);
      console.log(response.data);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <div>
      <Box sx={{ display: "flex", p: 10 }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Plot
            data={[
              {
                x: tableData.due,
                y: tableData.total_amount,
                type: "bar",
                mode: "lines+markers",
                marker: { color: "123270" },
              },
            ]}
            layout={{
              title: "TOTAL SALES",
              width: 800,
              height: 450,
              xaxis: { title: "Invoices - Month Wise" },
              yaxis: { title: "Amount" },
            }}
          />

          <FormControl fullWidth sx={{ marginTop: 5 }}>
            <InputLabel id="select-chart-label">Select Chart</InputLabel>
            <br />
            <Select
              labelId="select-chart-label"
              id="select-chart"
              value={selectedChart}
              onChange={handleChartChange}
            >
              <MenuItem value="technologies">Technologies</MenuItem>
              <MenuItem value="anotherChart">Another Chart</MenuItem>
            </Select>
          </FormControl>

          {selectedChart === "technologies" && (
            <Plot
              data={[
                {
                  labels: tableData.tech_count_name,
                  values: tableData.tech_count_num,
                  type: "pie",
                },
              ]}
              layout={{
                title: "TECHNOLOGIES",
                width: 850,
                height: 500,
                margin: { l: 50, r: 50, b: 100, t: 120 },
              }}
            />
          )}

          {selectedChart === "anotherChart" && (
            <Plot
              data={[
                {
                  labels: tableData.due_date,
                  values: tableData.total_amount,
                  type: "pie",
                },
              ]}
              layout={{
                title: "ANOTHER CHART",
                width: 850,
                height: 500,
                margin: { l: 50, r: 50, b: 100, t: 120 },
              }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
