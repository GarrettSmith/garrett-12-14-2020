import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Document, useDeleteDocument } from "../common/documents";
import { errorDisplayDuration } from "../common/constants";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filesize: {
    alignItems: "flex-end",
  },
}));

export interface Props {
  document: Document;
}

export const DocumentTile: React.FC<Props> = ({ document }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { loading, error, deleteDocument, clearError } = useDeleteDocument(
    document.name
  );

  return (
    <>
      <Snackbar
        className="Document-Delete-Error"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!error}
        message={error?.message}
        key={`delete-error-${document.name}`}
        autoHideDuration={errorDisplayDuration}
        onClose={clearError}
      />
      <Grid className="Document-Tile" item xs={12} md={4}>
        <Card className={classes.card} variant="outlined">
          <CardHeader title={document.name} />
          <CardActions className={classes.actions}>
            <Typography className={classes.filesize}>
              {t("filesize", { filesize: document.size })}
            </Typography>
            <Button
              className="Delete-Button"
              size="small"
              color="primary"
              startIcon={loading ? <CircularProgress size={14} /> : null}
              disabled={loading}
              onClick={deleteDocument}
              variant="contained"
            >
              {t("delete")}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
