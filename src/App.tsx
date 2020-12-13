import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Grid } from "@material-ui/core";

import { DocumentList } from "./list";
import { UploadButton } from "./upload";

function App() {
  return (
    <Container maxWidth="md">
      <Grid container direction="row-reverse" justify="space-between">
        <Grid item xs={12} md={2}>          
          <UploadButton />
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
      <DocumentList />
    </Container>
  );
}

export default App;
