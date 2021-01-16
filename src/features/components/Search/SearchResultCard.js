import React, { useContext } from "react";
import { ThemeContext } from "../../Theme/ThemeProvider";
import { Typography } from "@material-ui/core";
import UserDetails from '../Users/UserDetails'

const SearchResultCard = ({user}) => {
  const { bodyTheme } = useContext(ThemeContext);
  let { FirstName, LastName } = user;
  return (
    <div
      className="result-card"
      style={{
        background: bodyTheme.searchResultBg,
        borderLeft: `5px solid ${bodyTheme.headText}`,
      }}
    >
      <Typography variant="caption" style={{ color: bodyTheme.headText }}>
       {FirstName} {LastName}
      </Typography>
      <UserDetails user={user} />
    </div>
  );
};

export default SearchResultCard;
