import { maxFileSize, validFileTypes } from "./constants";
import { formatFilesize } from "./format";

export const validateFile = (file: File) => {
  const errors = [];

  if (!validFileTypes.includes(file.type)) {
    errors.push(new Error(`Invalid File Type: '${file.type}'`));
  }

  if (file.size > maxFileSize) {
    errors.push(new Error(`File size too large: ${formatFilesize(file.size)}`));
  }

  return errors.length > 0 ? errors : null;
};
