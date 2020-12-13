import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import { DocumentList } from "./list";
import { UploadButton } from "./upload";
import { SearchInput } from "./search";

const useStyles = makeStyles((theme) => ({
  app: {
    padding: theme.spacing(2),
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    marginBottom: theme.spacing(1),
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="md" className={classes.app}>
      <Grid
        container
        direction="row-reverse"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={2} className={classes.actions}>
          <UploadButton />
        </Grid>
        <Grid item xs={12} md={6} className={classes.actions}>
          <SearchInput value={search} onChange={setSearch} />
        </Grid>
      </Grid>
      <DocumentList search={search} />
    </Container>
  );
};
