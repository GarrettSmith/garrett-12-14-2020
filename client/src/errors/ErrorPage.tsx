import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
  },
}));

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid
      id="Error-Page"
      className={classes.page}
      container
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item>
        <Typography variant="h3" component="h1">
          {t("error title")}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          {t("refresh")}
        </Button>
      </Grid>
    </Grid>
  );
};
