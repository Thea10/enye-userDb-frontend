import React, { useState, useContext } from "react";
import { ThemeContext } from "../../Theme/ThemeProvider";
import {  makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import UserDetails from "./UserDetails";
import Filter from "./Filter";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    borderBottom: 0,
    fontWeight: 600,
    color: "inherit"
  },
  body: {
    fontSize: 14,
    cursor: "pointer",
    borderBottom: 0,
    fontWeight: 600,
    color: "inherit",
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    transition: "all 0.5s ease-in-out",
    "&:hover": {
      backgroundColor: "rgb(238,241,247, 0.18)",
      transform: "scale(1.01)",
    },
  },
}))(TableRow);

export const userTableStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  container: {
    borderRadius: "10px",
    marginTop: theme.spacing(2),
    padding: "0.5rem",
  },
  table: {
    minWidth: 700,
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const UserTable = ({ users }) => {
  const { bodyTheme } = useContext(ThemeContext);
  const styleClass = userTableStyles();
  const order ="asc";
  const orderBy ="FirstName";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper className={styleClass.body}>
      <TableContainer
        style={{ background: bodyTheme.tableBg }}
        className={styleClass.container}
      >
        <Table className={styleClass.table}>
          <TableHead>
            <TableRow style={{ color: bodyTheme.tableText }}>
              <StyledTableCell >
                S/N
              </StyledTableCell>
              <StyledTableCell  >
                First Name
              </StyledTableCell>
              <StyledTableCell  >
                Last Name
              </StyledTableCell>
              <StyledTableCell  >
                Email Address
              </StyledTableCell>

              <StyledTableCell  >
                Gender
              </StyledTableCell>
              <StyledTableCell  >
               Payment Method
              </StyledTableCell>

              <StyledTableCell  >
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(users, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, i) => {
                let { FirstName, LastName, Email, Gender, PaymentMethod } = user;

                return (
                  <StyledTableRow
                    key={i}
                    style={{ color: bodyTheme.tableText }}
                  >
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>{FirstName}</StyledTableCell>
                    <StyledTableCell>{LastName}</StyledTableCell>
                    <StyledTableCell>{Email}</StyledTableCell>
                    <StyledTableCell>{Gender}</StyledTableCell>
                    <StyledTableCell>{PaymentMethod}</StyledTableCell>
                    
                    <StyledTableCell>
                      <UserDetails user={user} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
       
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10]}
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{
          color: bodyTheme.tableText,
        }}
      />
    </Paper>
  );
};

export default UserTable;
