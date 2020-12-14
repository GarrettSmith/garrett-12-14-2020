import numeral from "numeral";
import { filesizeFormat } from "./constants";
import { FunctionDocument } from "./models";

// Format to lowercase to match designs
// Normally, I would have raised this concern with design,
// or follow company standards around displaying filesize.
export const formatFilesize = (size: number) =>
  numeral(size).format(filesizeFormat).toLowerCase();

// TODO this should be provided by the Firebase API
// TODO use an API that can scale down these images
const imageUrl = (name: string) =>
  `https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o/documents%2F${name}?alt=media`;

export const toAppDocument = (document: FunctionDocument) => ({
  ...document,
  url: imageUrl(document.name),
});
