import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
    backgroundPosition: "center",
    backgroundSize: "cover",
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
  },
  media: {
    paddingTop: "60%",
  },
  image: {
    display: "none",
    visibility: "hidden",
    width: 0,
    height: 0,
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
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const onImageLoad = () => setLoaded(true);

  // Use a hidden img element to listen to an image load effect and fade in the media component
  useEffect(() => {
    const ref = imageRef.current;
    if (ref) {
      ref.addEventListener("load", onImageLoad);
      return () => ref.removeEventListener("load", onImageLoad);
    }
  }, [imageRef]);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid className="Document-Tile" item xs={12} sm={6} md={4}>
      <Fade in>
        <Card className={classes.card} variant="outlined">
          <Fade in={loaded}>
            <CardMedia
              className={classes.media}
              image={document.url}
              title={document.name}
            >
              <img
                src={document.url}
                className={classes.image}
                ref={imageRef}
                alt={document.name}
              />
            </CardMedia>
          </Fade>
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
