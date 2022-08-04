# What is this?

This utility is a simple charting utility that allows you to export logs from Flipper and view them in a timeline chart.
It was created using create-react-app.

# Getting started

## Prerequisites:

- Flipper (https://fbflipper.com/)
- Inkitt Flash App (https://github.com/inkitt/flash)

## How to use Console Logging Utility

1. Startup Flipper and select the 'React Native Logs' tab
2. Use console.log in the inkitt/flash app formatted like this

```
  const startTime = launchAppTimeStore.currentTimeFromAppStart

  methodToProfileHere()

  const logTitle = "withBootstrapper-init"
  const endTime = launchAppTimeStore.currentTimeFromAppStart
  console.log(
    `PERF-MONITOR-LOG|${logTitle}|${startTime}|${endTime}`,
  );
```

Note:

( TODO: Provide utility method in inkitt/flash to wrap this logic )

- Each element in this console must be `|` deliniated and follow the format below.
- `PERF-MONITOR-LOG` is a hardcoded string that you should not change.
- `logTitle` often the name of the method to be profiled
- `startTime` the best way to get this is to use the launchAppTimeStore as demonstrated above
- `endTime` the best way to get this is to use the launchAppTimeStore as demonstrated above

3. Run the inkitt/flash app
4. Enter `PERF-MONITOR-LOG` in the "Search" bar in flipper to filter the logs to only perf monitoring logs
5. Highlight all rows and select `Copy Row(s) -> Copy Row(s) JSON`
6. Add a new file to `src/data/logs/<FILE_NAME_HERE>.json`. File name can be anything you want it to be but should be unique across all files in this directory.
7. Run `npm run start` to start the app.
8. Select the `View Logs` button.
9. All files that exist in the `logs` directory will be available in the dropdown above the chart.

## How to use Network Logging Utility

1. Startup Flipper and select the 'Network' tab (it may be disabled)
2. Run the inkitt/flash app
3. Highlight desired rows in Flipper network logs and select `Copy Row(s) -> Copy Row(s) JSON`
4. Add a new file to `src/data/network/<FILE_NAME_HERE>.json`. File name can be anything you want it to be but should be unique across all files in this directory.
5. Run `npm run start` to start the app.
6. Select the `View Network Performance` button.
7. All files that exist in the `network` directory will be available in the dropdown above the chart.
