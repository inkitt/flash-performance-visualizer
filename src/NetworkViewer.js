import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getNetworkFiles } from "./utils";

const getNetworkData = (fileName, allFileData) => {
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
    return [
      item.domain,
      new Date(item.requestTime).getTime(),
      new Date(item.responseTime).getTime(),
    ];
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

export const NetworkViewer = () => {
  const [allFileData, setAllFileData] = useState({});
  const [fileName, setFileName] = useState();

  useEffect(() => {
    const networkFiles = getNetworkFiles();
    setAllFileData(networkFiles);
    setFileName(Object.keys(networkFiles)[0]);
  }, []);

  const { chartData } = getNetworkData(fileName, allFileData);

  if (!chartData || chartData.length === 0) {
    return <h1>No json found in 'src/data/network'</h1>;
  }

  return (
    <>
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
      <Chart
        chartType="Timeline"
        width="100vw"
        height="100vh"
        data={chartData}
      />
    </>
  );
};
