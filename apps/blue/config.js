export const blueConfig = {
  id: "blue",

  name: "MultiApp Blue",
  slug: "multiapp-blue",
  scheme: "multiappblue",

  version: "2.0.0",

  projectId: undefined,

  android: {
    package: "com.wecredit.multiapp.blue",
    versionCode: 10,
  },

  ios: {
    bundleIdentifier: "com.wecredit.multiapp.blue",
    buildNumber: "10",
  },

  ota: {
    development: 1,
    production: 1,
  },

  theme: {
    primaryColor: "#1976D2",
  },
};
