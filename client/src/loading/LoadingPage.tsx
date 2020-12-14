import React from "react";
import { CircularProgress, Grid, Grow, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "100vh"
  },
}));

export const LoadingPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.loading}
    >
      <Grow in>        
        <CircularProgress />
      </Grow>
    </Grid>
  );
};
