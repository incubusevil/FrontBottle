import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ProductList } from "./ProductList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Autocomplete from "@mui/material/Autocomplete";
import url from "./url";

function valuetext(value) {
  return `${value}`;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "0.33",
  "0.5",
  "0.7",
  "1",
  "1.5",
  "2",
  "3",
  "5",
  "7",
  "9",
  "12",
  "15",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateOrder({ setNumberOfPosition, user , transferData, setTransferData}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [price, setPrice] = React.useState([7, 50]);
  const [minPrice, setMinPrice] = React.useState(7);
  const [maxPrice, setMaxPrice] = React.useState(50);
  const [packaging, setPackaging] = React.useState({
    Plastic: false,
    Paper: false,
    Glass: false,
    Can: false,
  });
  const [volume, setVolume] = React.useState([]);
  const [categories, setCategories] = React.useState({
    Mineral: false,
    Soda: false,
    Juice: false,
    Energy: false,
  });
  const [sugar, setSugar] = React.useState();
  const theme = useTheme();
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectCustomer, setSelectCustomer] = React.useState();

  const handleClickOpen = () => {
    setCompany(companies.map(({ company }) => ({ label: company })));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .get(
        url+"/rest/api/user/getSearchListOfCustomersForOperator",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            search: value,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCompany(
          response.data.map(({ company }) => ({
            label: company,
          }))
        );
      });
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    axios
      .get(
        url+"/rest/api/user/getListOfCustomersForOperator",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      });
  }, []);

  const hanldeCreateOrder = async () => {
    const customer = companies.find((customer) => {
      return customer.company === selectCustomer;
    });
    const savedToken = localStorage.getItem("token");
    const createStatus = "Created";
    console.log(user);
    axios
      .post(
        url+"/rest/api/customer/order/createOrder",
        {
          profileId: customer.profileId,
          address: customer.address,
          status: createStatus,
          operatorEmail: user.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("orderId", response.data.orderId);
        setTransferData(response.data)
        setNumberOfPosition(0);
        console.log(response.data);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(typeof value === "string" ? value.split(",") : value);
    setMinPrice(event.target.value?.[0]);
    setMaxPrice(event.target.value?.[1]);
    console.log(minPrice);
    console.log(maxPrice);
  };

  const handleChangeVolume = (event) => {
    const {
      target: { value },
    } = event;
    setVolume(typeof value === "string" ? value.split(",") : value);
    console.log(volume);
  };

  const handleChangeCategories = (event) => {
    const {
      target: { value },
    } = event;
    setCategories({ ...categories, [value]: !categories[value] });
    console.log(categories);
  };

  const handleChangePackaging = (event) => {
    const {
      target: { value },
    } = event;
    setPackaging({ ...packaging, [value]: !packaging[value] });
    console.log(packaging);
  };

  const handleChangeSugar = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event);
    setSugar(value);
    console.log(sugar);
  };

  React.useEffect(() => {
    console.log(categories);
    const savedToken = localStorage.getItem("token");
    const categoriesQuery = Object.keys(categories).filter(
      (key, index) => Object.values(categories)[index]
    );
    const packagingQuery = Object.keys(packaging).filter(
      (key, index) => Object.values(packaging)[index]
    );
    console.log(url)
    axios
      .post(
        url+"/rest/api/bottles/getListOfFilterBottles",
        {
          categories: categoriesQuery,
          minPrice,
          maxPrice,
          packaging: packagingQuery,
          sugar,
          page: page + 1,
          size: rowsPerPage,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        setData(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  }, [categories, packaging, minPrice, maxPrice, sugar, page, rowsPerPage]);

  const handleSearch = async (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .get(url+"/rest/api/bottles/getSearchBottleByBrand", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          search: value,
          page: page + 1,
          size: rowsPerPage,
        },
      })
      .then((response) => {
        setData(response.data.content);
        setCount(response.data);
        console.log(response.data.content);
      });
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 4,
        }}
      >
        <Box
          m="left"
          sx={{
            width: 300,
            ml: 4,
          }}
        >
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              mb: 2,
            }}
          >
            <Grid
              sx={{
                ml: 5,
                mt: 1,
                mb: 1,
                mr: 5,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClickOpen}
              >
                Create Order
              </Button>
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
            </Grid>
          </Paper>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Grid
              sx={{
                ml: 5,
                mt: 1,
                mb: 1,
                mr: 5,
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Select Category
              </Typography>
              <FormGroup onChange={handleChangeCategories}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mineral Water"
                  value="Mineral"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Soda"
                  value="Soda"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Juice"
                  value="Juice"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Soft Energy Drink"
                  value="Energy"
                />
              </FormGroup>
              <Typography gutterBottom variant="h5" component="div">
                Select Price Range
              </Typography>
              <Slider
                getAriaLabel={() => "Price range"}
                value={price}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={7}
                max={50}
              />
              <Typography gutterBottom variant="h5" component="div">
                Packaging
              </Typography>
              <FormGroup onChange={handleChangePackaging}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Plastic Bottle"
                  value="Plastic"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Paper Bottle"
                  value="Paper"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Glass Bottle"
                  value="Glass"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Can Bottle"
                  value="Can"
                />
              </FormGroup>
              <Typography gutterBottom variant="h5" component="div">
                Select Volume
              </Typography>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label">Volume</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={volume}
                  onChange={handleChangeVolume}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Volume" />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, volume, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography gutterBottom variant="h5" component="div">
                Sugar
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleChangeSugar}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="With Sugar"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="ZeroSugar"
                />
              </RadioGroup>
            </Grid>
          </Paper>
        </Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Container>
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
                  label="Search"
                  id="search"
                  onChange={handleSearch}
                />
              </Grid>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {data.map((bottle) => (
                  <ProductList
                    bottle={bottle}
                    setNumberOfPosition={setNumberOfPosition}
                  />
                ))}
              </Grid>
              <TablePagination
                rowsPerPageOptions={[9, 18, 36]}
                component="div"
                count={count.totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Container>
          </Paper>
        </Container>
      </Stack>
    </>
  );
}
