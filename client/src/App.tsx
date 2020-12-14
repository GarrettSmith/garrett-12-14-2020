import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import { DocumentList } from "./list/DocumentList";
import { ErrorAlerts } from "./errors/ErrorAlerts";
import { ErrorBoundary } from "./errors/ErrorBoundary";
import { ErrorPage } from "./errors/ErrorPage";
import { LoadingPage } from "./loading/LoadingPage";
import { SearchInput } from "./search/SearchInput";
import { UploadButton } from "./upload/UploadButton";
import { useDocuments } from "./common/useDocuments";

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
  const {
    state: { getting, uploading, deleting, documents, errors },
    uploadDocument,
    deleteDocument,
    clearError,
  } = useDocuments(search);

  if (!documents && errors.length > 0) {
    return <ErrorPage />;
  } else if (!documents) {
    return <LoadingPage />;
  }

  return (
    <ErrorBoundary>
      <ErrorAlerts errors={errors} clearError={clearError} />
      <Container maxWidth="md" className={classes.app}>
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={2} className={classes.actions}>
            <UploadButton
              uploadDocument={uploadDocument}
              uploading={uploading}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.actions}>
            <SearchInput value={search} onChange={setSearch} getting={getting} />
          </Grid>
        </Grid>
        <DocumentList
          documents={documents ?? []}
          deleting={deleting}
          deleteDocument={deleteDocument}
        />
      </Container>
    </ErrorBoundary>
  );
};
