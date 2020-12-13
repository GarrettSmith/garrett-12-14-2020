import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Document } from "../common/documents";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
}));

export interface Props {
  document: Document;
}

export const DocumentTile: React.FC<Props> = ({ document }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid className="Document-Tile" item xs={12} md={4}>
      <Card className={classes.card}>
        <CardHeader title={document.name} />
        <CardContent>
          <Typography>{t("filesize", { filesize: document.size })}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
