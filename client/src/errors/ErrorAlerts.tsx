import React from "react";
import { Snackbar } from "@material-ui/core";
import { errorDisplayDuration } from "../common/constants";

export interface Props {
  errors: Array<Error>;
  clearError: (error: Error) => void;
}

export const ErrorAlerts: React.FC<Props> = ({ errors, clearError }) => {
  return (
    <>
      {errors.map((e) => (
        <Snackbar
          className="Document-Error"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={true}
          message={e.message}
          key={e.message}
          autoHideDuration={errorDisplayDuration}
          onClose={() => clearError(e)}
        />
      ))}
    </>
  );
};
