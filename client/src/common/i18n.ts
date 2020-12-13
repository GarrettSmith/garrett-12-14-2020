import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { formatFilesize } from "./format";

const resources: Resource = {
  en: {
    translation: {
      document: "{{count}} document",
      document_plural: "{{count}} documents",
      filesize: "{{filesize, filesize}}",
      "total size": "Total size: {{totalSize, filesize}}",
      upload: "UPLOAD",
      "upload error": "Failed to upload file!",
      "upload success": "Successfully uploaded '{{ filename }}'!",
      delete: "Delete",
      "search placeholder": "Search documents...",
      "error title": "An error has occurred!",
      "refresh": "Refresh"
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss

      format: (value, format, lang) => {
        switch (format) {
          case "filesize":
            return formatFilesize(value);
          default:
            return value;
        }
      },
    },
  });

export default i18n;
