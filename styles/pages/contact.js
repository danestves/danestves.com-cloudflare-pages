const styles = theme => ({
  form: {
    padding: theme.spacing(0, 2)
  },
  defaultValueSelect: {
    color:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.54)"
        : "rgba(255, 255, 255, 0.54)"
  },
  helperGoogle: {
    color:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.54)"
        : "rgba(255, 255, 255, 0.54)",

    "& a": {
      textDecoration: "none",
      color: "#00A9E0"
    }
  },
  actionButtons: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    "& button": {
      flex: 1,

      "&:first-child": {
        marginRight: 4
      },

      "&:last-child": {
        marginLeft: 4
      }
    }
  }
});

export default styles;
