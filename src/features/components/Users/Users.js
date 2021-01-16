import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import Loader from "./Loader";
import { ThemeContext } from "../../Theme/ThemeProvider";
import { getUsers, fetchUsers, getfilteredList } from "../FeatureSlice";
import UserTable from "./UserTable";
import Filter from "./Filter";

const Users = () => {
  let contentItems;
  const { bodyTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.feature.status);
  const error = useSelector((state) => state.feature.error);
  const filtered = useSelector((state) => state.feature.filtered);
  const userList = useSelector(getUsers);
  const filteredUsers = useSelector(getfilteredList);

  useEffect(() => {
    if (status === "none") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading" || status === "failed") {
    contentItems = (
      <div>
        <Typography variant="caption" style={{ color: bodyTheme.headText }}>
          Loading Users
        </Typography>
        <Loader />
        {status === "failed" ? (
          <Typography variant="caption" style={{ color: bodyTheme.headText }}>
            {error}
          </Typography>
        ) : null}
      </div>
    );
  } else if (status === "succeeded") {
    contentItems = (
      <div>
        <Filter />

        {filtered ? (
          <UserTable users={filteredUsers} />
        ) : (
          <UserTable users={userList} />
        )}
      </div>
    );
  }
  return (
    <div className="user-holder">
      <Typography
        variant="h5"
        style={{ color: bodyTheme.headText }}
        className="font-bold"
      >
        User List
      </Typography>

      {contentItems}
    </div>
  );
};

export default Users;
