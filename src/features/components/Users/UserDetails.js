import React, { useState, useContext } from "react";
import { ThemeContext } from "../../Theme/ThemeProvider";
import {
  makeStyles,
  Button,
  IconButton,
  Tooltip,
  Drawer,
  Divider,
  Typography
} from "@material-ui/core";
import { CloseOutlined, VisibilityOutlined } from "@material-ui/icons";

const detailStyles = makeStyles(() => ({
  root: {
    "& .MuiButton-root": {
      minWidth: "unset",
    },
  },
  drawer: {
    flexShrink: 0,

    "& .MuiBackdrop-root":{
      backgroundColor: "unset"
    },
    "& .MuiDrawer-paper": {
      background: "transparent",
      boxShadow: "none"
    },
  },

  userDetails: {
    padding: "0.5rem",
    height: "80vh",
    minWidth: "300px",
    width: "30vw",
    borderRadius: "10px",
    marginTop: "2rem",
    overflowY: "auto",
   
  },
  userInfos: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent:"start",

   "& .info-label": {
     margin: "1rem",
     
    }
  }
}));

const UserDetails = ({ user }) => {
  const detailStyle = detailStyles();
  const { bodyTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={detailStyle.root}>
      <Tooltip title="Details">
        <Button
          size="medium"
          aria-label="View user details"
          onClick={handleDrawerOpen}
          style={{
            color: bodyTheme.icons,
            background: bodyTheme.iconBg,
          }}
        >
          <VisibilityOutlined />
        </Button>
      </Tooltip>

      <Drawer className={detailStyle.drawer} anchor="right" open={open}>
        <div
          className={detailStyle.userDetails}
          style={{ background: bodyTheme.tableBg,  boxShadow: `0 7.5px 3px ${bodyTheme.detailShadow}` }}
        >
          <Tooltip title="Close">
            <IconButton
              onClick={handleDrawerClose}
              style={{
                color: bodyTheme.icons,
                background: bodyTheme.iconBg,
              }}
              aria-label="Close"
            >
              <CloseOutlined />
            </IconButton>
          </Tooltip>

          <Typography variant="subtitle1" style={{color: bodyTheme.headText}}>
              User Details for {user.FirstName}
          </Typography>

          <Divider />

          <div className={detailStyle.userInfos}>
            {
              Object.entries(user).map(([key, value])=>{
                return(
                  <div className="info-label" key={key}>
                      <Typography variant="caption" style={{color: bodyTheme.detailLabel, opacity: 0.7}}
                      >
                        {key}
                      </Typography>
                      <Typography variant="subtitle1" style={{color: bodyTheme.detailText, fontWeight: 600}}
                      >
                        {value}
                      </Typography>
                  </div>
                )
              })
            }

          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default UserDetails;
