import React from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { useUploadDocument } from "../common/documents";
import { useTranslation } from "react-i18next";
import { errorDisplayDuration, validFileTypes } from "../common/constants";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    textAlign: "center",
  },
  input: {
    display: "none",
  },
}));

export const UploadButton: React.FC = () => {
  const {
    loading,
    errors,
    uploadDocument,
    clearErrors,
    lastUploaded,
    clearLastUploaded,
  } = useUploadDocument();
  const { t } = useTranslation();
  const classes = useStyles();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadDocument(file);
    }
  };

  return (
    <>
      <Snackbar
        id="Upload-Error"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!errors}
        message={errors?.reduce((msg, e) => `${msg}\n${e.message}`, "")}
        key="upload-error"
        autoHideDuration={errorDisplayDuration}
        onClose={clearErrors}
      />
      <Snackbar
        id="Upload-Success"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!lastUploaded}
        message={t("upload success", { filename: lastUploaded })}
        key="upload-success"
        autoHideDuration={errorDisplayDuration}
        onClose={clearLastUploaded}
      />
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
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} /> : null}
          color="primary"
        >
          {t("Upload")}
        </Button>
      </label>
    </>
  );
};
