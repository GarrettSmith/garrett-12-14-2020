import numeral from "numeral";
import { filesizeFormat } from "./constants";

export const formatFilesize = (size: number) =>
  numeral(size).format(filesizeFormat);
