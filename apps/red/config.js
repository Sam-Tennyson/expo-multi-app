export const redConfig = {
  id: "red",

  name: "MultiApp Red",
  slug: "multiapp-red",
  scheme: "multiappred",

  otaUpdateNumberDev: "1",
  otaUpdateNumberProd: "1",
  versionDev: "1.0.0",
  versionProd: "1.0.0",
  versionProdIos: "1.0.0",
  isDevelopment: false,

  projectId: "443ae17e-057f-4918-9515-25ebb4d120de",

  // Add the google service firebase file
  googleServicesFile: "./apps/red/google-services.json",
  updates: {
    url: "https://u.expo.dev/443ae17e-057f-4918-9515-25ebb4d120de",
  },
  android: {
    package: "com.wecredit.multiapp.red",
    versionCode: 1,
  },

  ios: {
    bundleIdentifier: "com.wecredit.multiapp.red",
    buildNumber: "1",
  },

  theme: {
    primaryColor: "#E53935",
  },

  notifications: {
    androidChannelId: "todos",
    googleServicesFile: "./apps/red/google-services.json",
  },
};
