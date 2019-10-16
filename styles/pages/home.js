const styles = theme => ({
  bannerContainer: {
    padding: theme.spacing(4, 2, 0),
    backgroundColor:
      theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
    background: "url('/static/banner-background.png') bottom center no-repeat",
    backgroundSize: "140%",
    boxShadow:
      theme.palette.type === "dark"
        ? "0px 2px 5px -1px rgba(255,255,255,0.1), 0px 4px 5px 0px rgba(255,255,255,0.07), 0px 1px 10px 0px rgba(255,255,255,0.06)"
        : "0px 2px 5px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)",

    [theme.breakpoints.down("xs")]: {
      backgroundSize: "2000% 250%"
    }
  },
  title: {
    fontWeight: 700,
    background: "linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    marginBottom: theme.spacing(2)
  },
  subtitle: {
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.55)"
        : "rgba(0, 0, 0, 0.55)",
    marginBottom: theme.spacing(3)
  },
  bannerActionButtonContact: {
    fontWeight: 700,
    letterSpacing: 1
  },
  bannerImage: {
    width: "100%",
    maxWidth: 360,
    display: "block",
    margin: "16px auto 0",

    [theme.breakpoints.up("sm")]: {
      maxWidth: 720
    }
  },
  description: {
    margin: theme.spacing(4, 0, 4),
    fontWeight: 400,
    transition: "all 0.3s ease-in-out",

    "& p": {
      margin: 0
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem"
    }
  },
  knowMore: {
    left: "50%",
    transform: "translateX(-50%)",
    margin: theme.spacing(2, 0, 4),
    color: theme.palette.type === "dark" ? "#fff" : "#0090DA",
    border:
      theme.palette.type === "dark"
        ? "1px solid rgba(255, 255, 255, 0.5)"
        : "1px solid #0090DA",

    "&:hover": {
      border: theme.palette.type === "dark" ? "1px solid #fff" : null,
      backgroundColor:
        theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.1)" : null
    }
  },
  containerSkills: {
    margin: theme.spacing(2, 0)
  },
  titlePricing: {
    marginBottom: theme.spacing(4)
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "15px 25px",
    position: "relative",
    width: "100%",
    zIndex: 10
  },
  pricingTable: {
    boxShadow:
      "0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02)",
    display: "flex",
    flexDirection: "column",

    "& *": {
      textAlign: "center",
      textTransform: "uppercase"
    },

    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  pricingPlan: {
    borderBottom: "1px solid #e1f1ff",
    padding: 25,

    "&:last-child": {
      borderBottom: "none"
    },

    [theme.breakpoints.up("sm")]: {
      borderBottom: "none",
      borderRight: "1px solid #e1f1ff",
      flexBasis: "100%",
      padding: "25px 50px",

      "&:last-child": {
        borderRight: "none"
      }
    }
  },
  pricingImg: {
    marginBottom: 25,
    width: "100%",
    maxWidth: 90
  },
  pricingHeader: {
    color: "#888",
    fontWeight: 600,
    letterSpacing: 1
  },
  pricingFeatures: {
    color: "#00a3e1",
    fontWeight: 600,
    letterSpacing: 1,
    margin: "50px 0 25px"
  },
  pricingFeaturesItem: {
    borderTop: "1px solid #e1f1ff",
    fontSize: 12,
    lineHeight: 1.5,
    padding: "15px 0",

    "&:last-child": {
      borderBottom: "1px solid #e1f1ff"
    }
  }
});

export default styles;
