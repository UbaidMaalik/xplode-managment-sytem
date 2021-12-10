export const leftbarStyles = (theme) => ({
  root: {
    fontFamily: "Raleway, sans-serif",
    "& .Mui-selected": {
      backgroundColor: "rgb(79 156 212 / 17%) !important",
      borderRight: "3px solid #1976d2 !important",
      "& .MuiListItemIcon-root": {
        color: "#1976d2",
      },
      color: "#1976d2",
    },
    "&.Mui-active": {
      backgroundColor: "rgb(79 156 212 / 17%) !important",
      borderRight: "3px solid #1976d2 !important",
    },
  },
  drawerPaper: {
    width: "250px",
    color: "white",
    background: "url(/images/side2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  logoDiv: {
    // borderBottom: "1px solid #fff",
    "&::after": {
      right: "15px",
      width: "calc(100% - 30px)",
      bottom: "0",
      height: "2px",
      content: "",
      position: "absolute",
      backgroundColor: "rgba(180, 180, 180, 0.3)",
    },
  },
  logo: {
    fontSize: "16px",
    fontWeight: "400",
    width: "50%",
    marginRight: "1.5em",
  },
  icons: {
    alignItems: "center",
    float: "right",
    color: "#000",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: theme.spacing(2),
    color: "#757575",
  },
  active: {
    backgroundColor: "rgb(79 156 212 / 17%)",
    borderRight: "3px solid #1976d2",
  },
  notactive: {
    // borderBottom: "1px solid #ccc",
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  typo: {
    color: "#383737",
    textAlign: "left",
  },
  iconButton: {
    color: "#757575 !important",
    "&:hover": {
      backgroundColor: "rgb(79 156 212 / 17%)",
    },
  },
  menu: {
    "&:active": {
      backgroundColor: "rgb(79 156 212 / 17%)",
      borderRight: "3px solid #1976d2",
    },
  },
  activeNavItem: {
    backgroundColor: "rgb(79 156 212 / 17%)",
    borderRight: "3px solid #1976d2",
  },
  topbar: {
    backgroundColor: "#fff !important",
  },
  logoutBtn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
