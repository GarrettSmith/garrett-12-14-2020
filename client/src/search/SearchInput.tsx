import React from "react";
import { InputBase, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[400],
    borderWidth: 1,
    borderStyle: "solid",
  },
  inputRoot: {
    display: "flex",
  },
  inputInput: {
    padding: theme.spacing(1),
    display: "block",
  },
}));

interface Props {
  value: string;
  onChange: (search: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
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
    </div>
  );
};
