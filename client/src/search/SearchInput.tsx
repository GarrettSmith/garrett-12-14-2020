import React from "react";
import { CircularProgress, InputBase, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[400],
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    paddingRight: theme.spacing(1),
  },
  inputRoot: {
    display: "flex",
    flexGrow: 1,
  },
  inputInput: {
    padding: theme.spacing(1),
    display: "block",
  },
}));

interface Props {
  value: string;
  onChange: (search: string) => void;
  getting: boolean;
}

export const SearchInput: React.FC<Props> = ({ value, onChange, getting }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <InputBase
        id="Document-Search"
        placeholder={t("search placeholder")}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {getting ? <CircularProgress size={24} /> : null}
    </div>
  );
};
