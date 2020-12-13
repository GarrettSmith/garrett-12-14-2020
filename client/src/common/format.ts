import numeral from "numeral";
import { filesizeFormat } from "./constants";

// Format to lowercase to match designs
// Normally, I would have raised this concern with design, 
// or follow company standards around displaying filesize.
export const formatFilesize = (size: number) =>
  numeral(size).format(filesizeFormat).toLowerCase();
