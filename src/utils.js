const logsContext = require.context(`./data/logs`, true, /.json$/);
const networkContext = require.context(`./data/network`, true, /.json$/);

export const getLogFiles = () => {
  const tempData = {};
  logsContext.keys().forEach((key) => {
    const fileName = key.replace("./", "");
    if (fileName !== "sampleFile.json") {
      const resource = require(`./data/logs/${fileName}`);
      const namespace = fileName.replace(".json", "");
      tempData[namespace] = JSON.parse(JSON.stringify(resource));
    }
  });
  return tempData;
};

export const getNetworkFiles = () => {
  const tempData = {};
  networkContext.keys().forEach((key) => {
    const fileName = key.replace("./", "");
    if (fileName !== "sampleFile.json") {
      const resource = require(`./data/network/${fileName}`);
      const namespace = fileName.replace(".json", "");
      tempData[namespace] = JSON.parse(JSON.stringify(resource));
    }
  });
  return tempData;
};
