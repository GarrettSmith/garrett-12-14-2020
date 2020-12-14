import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { validFileTypes } from "../common/constants";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    textAlign: "center",
  },
  input: {
    display: "none",
  },
}));

export interface Props {
  uploadDocument: (file: File) => void;
  uploading: boolean;
}

export const UploadButton: React.FC<Props> = ({
  uploading,
  uploadDocument,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadDocument(file);
    }
  };

    /* <Snackbar
        id="Upload-Success"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!lastUploaded}
        message={t("upload success", { filename: lastUploaded })}
        key="upload-success"
        autoHideDuration={errorDisplayDuration}
        onClose={clearLastUploaded}
      /> */

  return (
    <>
      <input
        id="Upload-Input"
        className={classes.input}
        accept={validFileTypes.join(", ")}
        type="file"
        hidden
        onChange={onChange}
      />
      <label htmlFor="Upload-Input">
        <Button
          id="Upload-Button"
          variant="contained"
          className={classes.button}
          component="div"
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={14} /> : null}
          color="primary"
        >
          {t("Upload")}
        </Button>
      </label>
    </>
  );
};
