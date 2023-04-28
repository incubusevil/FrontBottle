import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import url from "./url";

export const CurrentOrderProductList = ({ bottle }) => {
  const [open, setOpen] = React.useState(false);
  const [amountBottle, setAmountBottle] = React.useState();
  const [bottleId, setBottleId] = React.useState();
  const [openInfo, setOpenInfo] = React.useState(false);

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeEditItemInOrder = async () => {
    const savedToken = localStorage.getItem("token");
    const orderId = localStorage.getItem("orderId");
    console.log(bottleId);
    axios
      .post(
        url+"/rest/api/customer/order/addItemToOrder",
        {
          orderId: orderId,
          bottleId: bottleId,
          amountBottle: amountBottle,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handleDetails = () => {
    console.log(bottle);
  };

  const handleSearch = async (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    console.log(bottle);
    setAmountBottle(value);
    setBottleId(bottle.bottleId);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell onClick={handleDetails} align="right">
      <IconButton variant="contained" component="label" onClick={handleClickOpenInfo}>
        <Avatar
          src={bottle.bottlePhoto}
          style={{
            margin: "10px",
            width: "60px",
            height: "60px",
          }}
        />
        </IconButton>
      </TableCell>
      <TableCell align="center" >
        {bottle.bottleId}
      </TableCell>
      <TableCell >{bottle.nameBottle}</TableCell>
      <TableCell >{bottle.producer}</TableCell>
      <TableCell align="center" onClick={handleClickOpen}>
      {bottle.amountBottle}
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Write Bottle Ammount"}
          </DialogTitle>
          <DialogContent>
            <Grid
              sx={{
                ml: 5,
                mt: 1,
                mb: 1,
                mr: 5,
                paddingBottom: 2,
              }}
            >
              <TextField
                fullWidth
                label="Ammount"
                id="search"
                onChange={handleSearch}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                hanldeEditItemInOrder(), handleClose();
              }}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
      <TableCell align="center" >
        {bottle.price}
      </TableCell>
      <TableCell align="right" >
        {bottle.amountBottle * bottle.price}
      </TableCell>
      <Dialog
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            alt={"alt"}
            image={bottle.bottlePhoto}
            title={bottle.nameBottle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {bottle.nameBottle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bottle.producer}
            </Typography>
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            handleCloseInfo();
          }}
          autoFocus
        >
          Close
        </Button>
      </Dialog>
    </TableRow>
  );
};
