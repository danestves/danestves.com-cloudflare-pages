const styles = theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  image: {
    width: "100%",
    maxWidth: 400,
    height: 400,
    borderRadius: 16,
    objectFit: "cover",
    objectPosition: "top center",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px"
  }
});

export default styles;
