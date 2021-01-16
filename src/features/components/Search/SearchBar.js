import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../Theme/ThemeProvider";
import {
  makeStyles,
  Paper,
  InputBase,
  Button,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { setSearchText, getSearchText, setDefaultStatus, searchUsers } from "./SearchSlice";
import { getUsers } from "../FeatureSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    boxShadow: "none"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const SearchBar = () => {
  const searchBarClass = useStyles();
  const { bodyTheme } = useContext(ThemeContext);
  const searchText = useSelector(getSearchText);
  const [feedbackText, setfeedbackText] = useState(null);
  const dispatch = useDispatch();
  const userList = useSelector(getUsers);


  const setDefault = () => {
    setfeedbackText("Enter a search term to search for a patient");
    dispatch(setDefaultStatus({ status: "none", list: [] }));
    setTimeout(() => {
      setfeedbackText(null);
    }, 4000);
  };
  const handleChange = (event) => {
    if (event.target.value === "") {
      setDefault();
      return;
    }
    dispatch(setSearchText(event.target.value));
    searchForUsers(event.target.value);
  };

  const handleBtnClick = () => {
    if (searchText === "") {
      setDefault();
      return;
    }
    searchForUsers(searchText);
  };

  const searchForUsers = (query) => {
    dispatch(searchUsers({list: userList, text: query}));
  };

  return (
    <div>
      <Paper className={searchBarClass.paper} style={{border: `1px solid ${bodyTheme.searchBd}`}}>
        <InputBase
          placeholder="Type to search for a patient"
          inputProps={{ "aria-label": "search for a patient" }}
          className={searchBarClass.input}
          style={{color: bodyTheme.headText}}
          onInput={handleChange}
        />
        <Button
          aria-label="search"
          className={searchBarClass.button}
          style={{ background: bodyTheme.iconBg,  color: bodyTheme.icons }}
          onClick={handleBtnClick}
        >
          <SearchIcon />
        </Button>
      </Paper>

      {feedbackText ? (
        <Typography style={{ color: bodyTheme.headText }} variant="caption">
          {feedbackText}
        </Typography>
      ) : null}
    </div>
  );
};

export default SearchBar;
