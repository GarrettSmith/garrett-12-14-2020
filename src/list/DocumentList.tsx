import React from "react";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useDocuments, Document } from "../common/documents";
import { DocumentTile } from "./DocumentTile";

const useStyles = makeStyles((theme) => ({
  loading: {
    minHeight: "100%",
  },
  totalSize: {
    display: "flex",
    alignItems: "flex-end",
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const Error: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <Snackbar
      id="Document-List-Error"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={true}
      message={error.message}
      key="document-list-error"
    />
  );
};

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.loading}
    >
      <CircularProgress />
    </Grid>
  );
};

interface ReadyProps {
  documents: Array<Document>;
}

const Ready: React.FC<ReadyProps> = ({ documents }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const totalCount = documents.length;
  const totalSize = documents.reduce((size, doc) => size + doc.size, 0);
  return (
    <>
      <Grid
        id="Document-List-Header"
        className={classes.header}
        container
        justify="space-between"
        alignContent="flex-end"
      >
        <Grid item>
          <Typography
            id="Document-List-Header-Count"
            variant="h3"
            variantMapping={{ h3: "h1" }}
          >
            {t("document", { count: totalCount })}
          </Typography>
        </Grid>
        <Grid item className={classes.totalSize}>
          <Typography
            id="Document-List-Header-Size"
            variant="h5"
          >
            {t("total size", { totalSize })}
          </Typography>
        </Grid>
      </Grid>
      <Grid id="Document-List-Documents" container spacing={2}>
        {documents.map((d) => (
          <DocumentTile key={d.name} document={d} />
        ))}
      </Grid>
    </>
  );
};

export const DocumentList: React.FC = () => {
  const { loading, error, documents } = useDocuments();

  if (error) {
    return <Error error={error} />;
  } else if (loading) {
    return <Loading />;
  } else {
    return <Ready documents={documents ?? []} />;
  }
};
