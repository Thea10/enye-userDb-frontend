import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { Brightness3Outlined, WbSunnyRounded } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",

    "& > *": {
      cursor: "pointer",
      outline: "none !important",
    },
  },
}));

const SwitchTheme = ({ color, switchTheme, checked, toggleCheck }) => {
  const switchClass = useStyles();

  return (
    <div className={switchClass.root}>
      <Tooltip title={checked ? "Dark Mode" : "Light Mode"}>
        <IconButton
          aria-label="Switch theme"
          style={{ color: color }}
          onClick={() => {
            switchTheme();
            toggleCheck();
          }}
        >
          {checked ? < Brightness3Outlined  /> : <WbSunnyRounded />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SwitchTheme;

