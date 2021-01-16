import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { ThemeContext } from "../../Theme/ThemeProvider";
import SearchResultCard from "./SearchResultCard";
import { getSearchText, getSearchedUsers } from "./SearchSlice";

const SearchResultCards = () => {
  const { bodyTheme } = useContext(ThemeContext);
  const searchText = useSelector(getSearchText);
  const userResults = useSelector(getSearchedUsers);

  return (
    <div className="results">
      {userResults.length < 1 ? (
        <Typography variant="caption" style={{ color: bodyTheme.headText }}>
          Search Results will appear here
        </Typography>
      ) : (
        <div>
          <Typography variant="caption" style={{ color: bodyTheme.headText }}>
            Search Results for "{searchText}"
          </Typography>
          {userResults.map((user, i) => {
            return <SearchResultCard user={user} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};


export default SearchResultCards;
