export const leftbarStyles = (theme) => ({
  root: {
    fontFamily: "Raleway, sans-serif",
  },
  // drawer: {
  //   [theme.breakpoints.up("sm")]: {
  //     width: "200px",
  //   },
  // },
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
  logoStyle: {
    width: theme.spacing(18),
    height: theme.spacing(8),
  },
  sideLogo: {
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Roboto, sans-serif",
  },
  icons: {
    color: "#fff",
  },
  active: {
    boxShadow:
      "0 12px 20px -10px rgb(0 172 193 / 28%), 0 4px 20px 0 rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(0 172 193 / 20%)",
    backgroundColor: "#00acc1",
    width: "92%",
    margin: "8px 10px 8px 10px",
    borderRadius: "3px",
  },
  notactive: {
    // borderBottom: "1px solid #ccc",
  },
});
