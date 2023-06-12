import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Title from "./Title";

export default function Chart() {
  const [data, setData] = React.useState([1340, 2134, 2342, 1234]);
  console.log(data);

  // React.useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   axios
  //     .get(
  //       url + "/rest/api/customer/order/getListOfSales",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${savedToken}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     });
  // }, []);

  return (
    <>
    <Title>Operators Sales</Title>
      {data.map((order) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="indeterminate" value={order} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              order
            )}%`}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
