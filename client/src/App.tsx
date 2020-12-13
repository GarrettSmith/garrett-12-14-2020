import React, { useState } from "react";
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
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="md" className={classes.app}>
      <Grid container direction="row-reverse" justify="space-between">
        <Grid item xs={12} md={2}>
          <UploadButton />
        </Grid>
        <Grid item xs={12} md={6}>
          <input value={search} onChange={e => setSearch(e.target.value)} />
        </Grid>
      </Grid>
      <DocumentList search={search} />
    </Container>
  );
}

export default App;
