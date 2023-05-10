import React from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Autocomplete from "@mui/material/Autocomplete";

export default function CreateOrderForm({open, handleClose, company, setSelectCustomer, handleChange, hanldeCreateOrder,}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <Box
          sx={{
            width: 400,
            height: 270,
          }}
        >
          <Grid container>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={company}
              sx={{ mt: 2, mb: 1, ml: 2, mr: 2 }}
              onInputChange={(event, newInputValue) => {
                setSelectCustomer(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={handleChange}
                  label="Select Customer"
                />
              )}
            />
          </Grid>
          <DialogActions>
            <Button
              onClick={(event) => {
                hanldeCreateOrder(event), handleClose();
              }}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 15, mb: 2, ml: 2, mr: 2 }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
