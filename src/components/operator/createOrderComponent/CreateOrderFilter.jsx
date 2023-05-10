import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box, Paper } from "@mui/material";
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

export default function CreateOrderFilter({
  handleChangeCategories,
  handleChangePackaging,
  handleChangePrice,
  handleChangeSugar,
  handleChangeVolume,
  price,
  volume,
}) {
  const theme = useTheme();
  return (
    <>
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
              input={<OutlinedInput id="select-multiple-chip" label="Volume" />}
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
    </>
  );
}
