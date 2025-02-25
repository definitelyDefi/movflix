import "i18next";
import en from "../locales/en.json"; // Import translation file

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en; // Set type based on imported JSON
    };
  }
}
