import React from "react";
import "./App.css";
import { Container, Grid, makeStyles } from "@material-ui/core";

import { DocumentList } from "./list";
import { UploadButton } from "./upload";

const useStyles = makeStyles((theme) => ({
  app: {
    padding: theme.spacing(2),
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.app}>
      <Grid container direction="row-reverse" justify="space-between">
        <Grid item xs={12} md={2}>
          <UploadButton />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <DocumentList />
    </Container>
  );
}

export default App;
