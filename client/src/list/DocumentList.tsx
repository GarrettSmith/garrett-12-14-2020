import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Document } from "../common/models";
import { DocumentTile } from "./DocumentTile";

const useStyles = makeStyles((theme) => ({
  totalSize: {
    display: "flex",
    alignItems: "flex-end",
  },
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export interface Props {
  documents: Array<Document>;
  deleting: Array<string>;
  deleteDocument: (documentName: string) => void;
}

export const DocumentList: React.FC<Props> = ({
  documents,
  deleting,
  deleteDocument,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const totalCount = documents.length;
  const totalSize = documents.reduce((size, doc) => size + doc.size, 0);
  const sortedDocuments = documents.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <>
      <Grid
        id="Document-List-Header"
        className={classes.header}
        container
        justify="space-between"
        alignContent="flex-end"
        spacing={2}
      >
        <Grid item>
          <Typography
            id="Document-List-Header-Count"
            variant="h3"
            component="h1"
          >
            {t("document", { count: totalCount })}
          </Typography>
        </Grid>
        <Grid item className={classes.totalSize}>
          <Typography id="Document-List-Header-Size" variant="h5">
            {t("total size", { totalSize })}
          </Typography>
        </Grid>
      </Grid>
      <Grid id="Document-List-Documents" container spacing={2}>
        {sortedDocuments.map((d) => (
          <DocumentTile
            key={d.name}
            document={d}
            deleting={deleting.includes(d.name)}
            deleteDocument={deleteDocument}
          />
        ))}
      </Grid>
    </>
  );
};
