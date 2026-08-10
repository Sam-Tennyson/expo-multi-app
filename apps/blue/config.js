export const blueConfig = {
  id: "blue",

  name: "MultiApp Blue",
  slug: "multiapp-blue",
  scheme: "multiappblue",

  otaUpdateNumberDev: "1",
  otaUpdateNumberProd: "1",
  versionDev: "2.0.0",
  versionProd: "2.0.0",
  versionProdIos: "2.0.0",
  isDevelopment: false,

  projectId: "bf7da3ec-5477-4d58-9998-626e33fe0861",

  updates: {
    url: "https://u.expo.dev/bf7da3ec-5477-4d58-9998-626e33fe0861",
  },

  // Add the google service firebase file
  googleServicesFile: "./apps/blue/google-services.json",
  android: {
    package: "com.wecredit.multiapp.blue",
    versionCode: 10,
  },

  ios: {
    bundleIdentifier: "com.wecredit.multiapp.blue",
    buildNumber: "10",
  },

  theme: {
    primaryColor: "#1976D2",
  },

  notifications: {
    androidChannelId: "todos",
    googleServicesFile: "./apps/blue/google-services.json",
  },
};
