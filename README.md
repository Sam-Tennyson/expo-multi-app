# Expo multi-app POC

One Expo SDK 57 codebase produces two independently installable Todo apps. UI and application logic
are shared; identity, theme, EAS project, update URL, channel, and Firebase client configuration are
selected with `APP_VARIANT`.

| Variant | Android / iOS ID | Development | Preview | Production |
| --- | --- | --- | --- | --- |
| Red | `com.wecredit.multiapp.red` | `red-development` | `red-preview` | `red-production` |
| Blue | `com.wecredit.multiapp.blue` | `blue-development` | `blue-preview` | `blue-production` |

## Run locally

```bash
npm install
npm run start:red
npm run start:blue
```

Remote notifications and EAS Update require an installed development or release build. They are not
testable in Expo Go. Use one of the variant-specific build scripts in `package.json`.

## Build profiles

Each app exposes the same promotion path without sharing OTA channels:

- `build:<variant>:simulator`: iOS Simulator or Android debug development client from EAS.
- `build:<variant>:local`: local development-client build (`eas build --local`).
- `build:<variant>:preview`: internally distributed release build on the preview channel.
- `build:<variant>:testflight`: iOS store build that remains on the preview channel.
- `build:<variant>:production`: Android App Bundle or iOS release build on production.

Platform-explicit shortcuts mirror the usual release commands:

```bash
npm run build:red:local:android
npm run build:red:simulator:ios
npm run build:red:preview:android
npm run build:red:testflight:ios
```

Replace `red` with `blue` for the Blue app. Android local-development and preview shortcuts clear
the remote EAS build cache. Despite the profile name, `build:<variant>:local:android` is an EAS cloud
build, matching the supplied command pattern; `build:<variant>:local` is the actual `--local` build.

Simulator and local builds intentionally share the variant's development channel. A local profile
describes the binary; it does not need a separate update stream. Preview/TestFlight builds share a
release-mode channel so an OTA can be tested before publishing the corresponding bundle to
production.

Values used by application code should be configured in the EAS `development`, `preview`, and
`production` environments. Do not place secrets under an `EXPO_PUBLIC_` name: those values are
compiled into the client bundle and are readable by users.

Each variant keeps its editable release metadata as flat fields in `apps/<variant>/config.js`:

```js
otaUpdateNumberDev: "1",
otaUpdateNumberProd: "1",
versionDev: "1.0.0",
versionProd: "1.0.0",
versionProdIos: "1.0.0",
isDevelopment: false,
```

`isDevelopment` is the fallback when no environment is supplied. Build, update, and start scripts
set `EXPO_PUBLIC_APP_ENV`, which safely overrides the fallback: development and preview profiles use
the development values, while production uses the production values. `versionProdIos` allows the
iOS production marketing version to differ intentionally. The OTA number is an app-visible release
label; EAS runtime version and update ID remain the source of truth for OTA compatibility.

## Firebase / FCM setup

1. Register `com.wecredit.multiapp.red` and `com.wecredit.multiapp.blue` as separate Android apps in
   Firebase (they may belong to the same Firebase project).
2. Put each downloaded client file at `apps/<variant>/google-services.json`. The dynamic app config
   only includes the file when it exists.
3. Upload an FCM V1 service-account credential to each matching EAS project with `eas credentials`.
   Do not commit the service-account private key.
4. Configure APNs credentials in EAS for both iOS bundle identifiers.

The Diagnostics tab shows whether the active variant's Firebase client file was detected and lets
you create an Expo push token or schedule a local notification.

## OTA test

Create and install both preview builds, make a visible JavaScript-only change, then publish it to
exactly one app:

```bash
npm run update:red:preview -- --message "Red-only OTA test"
```

Use the Diagnostics tab in both installed apps to check/download the update. Only Red should receive
it. Repeat with `update:blue:preview` to verify the inverse. Once verified, publish or republish the
same commit to the variant's production channel. Changes to native dependencies or
app config require a new build and an incremented app version/runtime; they cannot be shipped OTA.
