import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Document } from "../common/models";

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
  deleting: boolean;
  deleteDocument: (documentName: string) => void;
}

export const DocumentTile: React.FC<Props> = ({
  document,
  deleting,
  deleteDocument,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
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
            startIcon={deleting ? <CircularProgress size={14} /> : null}
            disabled={deleting}
            onClick={() => deleteDocument(document.name)}
            variant="contained"
          >
            {t("delete")}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
