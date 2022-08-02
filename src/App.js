import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const context = require.context("./data/logs", true, /.json$/);

const getLogData = (fileName, allFileData) => {
  const selectedFileData = allFileData[fileName];

  if (!selectedFileData) {
    return [];
  }

  const columns = [
    { type: "string", id: "President" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];

  const data = selectedFileData.map((item) => {
    const [_, key, start, end] = item.message.split("|");
    return [key, new Date(+start), new Date(+end)];
  });

  const dataSorted = [...data].sort((l, r) => {
    // sort by earliest startDate
    if (l[1] < r[1]) {
      return -1;
    }
    if (l[1] > r[1]) {
      return 1;
    }
    // if equal start dates, sort by end date
    return l[2] > r[2] ? -1 : 1;
  });
  return { chartData: [columns, ...dataSorted] };
};

function App() {
  const [allFileData, setAllFileData] = useState({});
  const [fileName, setFileName] = useState();

  useEffect(() => {
    const tempData = {};
    context.keys().forEach((key) => {
      const fileName = key.replace("./", "");
      if (fileName !== "sampleFile.json") {
        const resource = require(`./data/logs/${fileName}`);
        const namespace = fileName.replace(".json", "");
        tempData[namespace] = JSON.parse(JSON.stringify(resource));
      }
    });
    setAllFileData(tempData);
    setFileName(Object.keys(tempData)[0]);
  }, []);

  const { chartData } = getLogData(fileName, allFileData);

  if (!chartData || chartData.length === 0) {
    return <h1>No json found in 'src/data/logs'</h1>;
  }

  return (
    <div style={{ height: "90vh", width: "90vw" }}>
      <label>Choose a run: </label>
      <select name={0} id={0} onChange={(d) => setFileName(d.target.value)}>
        {Object.keys(allFileData || {}).map((key) => {
          return (
            <option key={key} value={key}>
              {key.toString()}
            </option>
          );
        })}
      </select>
      <Chart chartType="Timeline" width="100%" height="100%" data={chartData} />
    </div>
  );
}

export default App;
