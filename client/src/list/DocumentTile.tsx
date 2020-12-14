import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Fade,
  Grid,
  Grow,
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
    padding: theme.spacing(2),
  },
  filesize: {
    alignItems: "flex-end",
  },
  name: {
    textOverflow: "ellipsis",
  },
  button: {
    paddingRight: theme.spacing(4),
  }
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
      <Fade in>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography
              className={classes.name}
              noWrap
              gutterBottom
              variant="h5"
              component="h2"
            >
              {document.name}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Typography className={classes.filesize}>
              {t("filesize", { filesize: document.size })}
            </Typography>
            <Button
              className={`Delete-Button ${classes.button}`}
              size="small"
              color="primary"
              startIcon={
                <Grow in={deleting}>
                  <CircularProgress size={14} />
                </Grow>
              }
              disabled={deleting}
              onClick={() => deleteDocument(document.name)}
              variant="contained"
            >
              {t("delete")}
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Grid>
  );
};
