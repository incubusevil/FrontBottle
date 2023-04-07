import { Typography, Link } from "@mui/material";


export const Copyright = (props) => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    {...props}
  >
    {"Copyright © "}
    <Link color="inherit" href="https://mui.com/">
      FreshWater Corp.
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

    