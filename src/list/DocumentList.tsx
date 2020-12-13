import React from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useDocuments, Document } from "../common/documents";
import { DocumentTile } from "./DocumentTile";

const Error: React.FC<{ error: Error }> = ({ error }) => {
  return <Typography id="Document-List-Error" variant="h2">{error.message}</Typography>;
};

const Loading: React.FC = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
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

  const totalCount = documents.length;
  const totalSize = documents.reduce((size, doc) => size + doc.size, 0);
  return (
    <>
      <Grid id="Document-List-Header" container justify="space-between" alignContent="flex-end">
        <Grid item>
          <Typography id="Document-List-Header-Count" variant="h2">
            {t("document", { count: totalCount })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography id="Document-List-Header-Size">
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