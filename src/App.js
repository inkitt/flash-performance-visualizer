import { LogViewer } from "./LogViewer";
import { NetworkViewer } from "./NetworkViewer";
import { LandingPage } from "./LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/logs" element={<LogViewer />} />
        <Route path="/network" element={<NetworkViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
