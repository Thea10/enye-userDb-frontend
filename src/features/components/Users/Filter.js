import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../Theme/ThemeProvider";
import {
  makeStyles,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import {
  setFilterBy,
  filterByGender,
  filterByPaymentMethod,
  clearFilters,
} from "../FeatureSlice";
import { Clear } from "@material-ui/icons";

const filterActionStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    display: "block",
    marginLeft: "0.5rem",
  },
}));

const Filter = () => {
  const actionStyles = filterActionStyles();
  const { bodyTheme } = useContext(ThemeContext);
  const filtered = useSelector((state) => state.feature.filtered);
  const filterBy = useSelector((state) => state.feature.filterBy);
  const filterValue = useSelector((state) => state.feature.filterValue);
  const dispatch = useDispatch();

  const changeFilter = (event) => {
    dispatch(setFilterBy(event.target.value));
  };

  const filterGender = (event) => {
    dispatch(filterByGender(event.target.value));
  };

  const filterPayment = (event) => {
    dispatch(filterByPaymentMethod(event.target.value));
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
  };
  return (
    <div className={actionStyles.root}>
      {filtered ? (
        <Tooltip title="Clear Filters">
          <IconButton
            aria-label="Clear Filters"
            onClick={clearAllFilters}
            style={{ color: bodyTheme.headText, padding: 0 }}
          >
            <Clear />
          </IconButton>
        </Tooltip>
      ) : null}

      <Typography variant="caption" style={{ color: bodyTheme.headText }}>
        Filter By:
      </Typography>
      <FormControl className={actionStyles.formControl}>
        <Select
          value={filterBy}
          onChange={changeFilter}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{ color: bodyTheme.tableText }}
        >
          <MenuItem value="" disabled>
            Filter By
          </MenuItem>
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Gender"}>Gender</MenuItem>
          <MenuItem value={"Payment Method"}>Payment Method</MenuItem>
        </Select>
      </FormControl>

      {filterBy === "Gender" ? (
        <FormControl className={actionStyles.formControl}>
          <Select
            value={filterValue}
            onChange={filterGender}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ color: bodyTheme.tableText }}
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Prefer to skip"}>Prefer to skip</MenuItem>
          </Select>
        </FormControl>
      ) : filterBy === "Payment Method" ? (
        <FormControl className={actionStyles.formControl}>
          <Select
            value={filterValue}
            onChange={filterPayment}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ color: bodyTheme.tableText }}
          >
            <MenuItem value="" disabled>
              Select Payment Method
            </MenuItem>
            <MenuItem value={"cc"}>CC</MenuItem>
            <MenuItem value={"paypal"}>Paypal</MenuItem>
            <MenuItem value={"money order"}>Money Order</MenuItem>
          </Select>
        </FormControl>
      ) : null}
    </div>
  );
};

export default Filter;
