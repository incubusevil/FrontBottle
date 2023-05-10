import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import url from "../url";
import { OrderId } from "../../StackContext";
import InfoColapse from "./createOrderComponent/InfoColapse";

export const ProductList = ({ bottle, setNumberOfPosition, setOpenAdd, handleClickOpen }) => {

  const [openAddItem, setOpenAddItem] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [amountBottle, setAmountBottle] = React.useState();
  const [stock , setStock] = React.useState(bottle.stock);
  const {orderId, setOrderId} = React.useContext(OrderId);
  const savedToken = localStorage.getItem("token");

  const handleClickOpenN = () => {
    if(!orderId){
      handleClickOpen()
    }
    else{
    setOpenAddItem(true);
    }
  };

  const handleClose = () => {
    setOpenAddItem(false);
  };

  const hanldeAddItemToOrder = async () => {
    const bottleId = bottle.bottleId;
    console.log(amountBottle);
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
        setNumberOfPosition(prevCount => prevCount + 1);
        setStock(stock-amountBottle)
        handleClose()
        setOpenAdd(true)
      });
      
  };

  const handleSearch = async (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setAmountBottle(value)
  };

  console.log(bottle)
  
  return (
    <Grid item xs={2} sm={4} md={4} key={bottle.bottleId}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
      component="img"
      height="250"
        sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
        alt={"alt"}
        image={bottle.bottlePhoto}
        title={bottle.nameBottle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bottle.nameBottle}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {bottle.price} LEI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bottle.producer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClickOpenN} size="small">Add to cart</Button>
        <Dialog
        open={openAddItem}
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
                <TextField fullWidth label="Ammount" id="search" onChange={handleSearch}/>
              </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose(), hanldeAddItemToOrder()}} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
        <Button size="small" onClick={() => {setOpenInfo(true)}}>Available Amount</Button>
        <InfoColapse openInfo={openInfo} setOpenInfo={setOpenInfo} stock={stock}/>
      </CardActions>
    </Card>
  </Grid>
  );
};
