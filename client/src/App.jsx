import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportHazard from "./pages/ReportHazard";
import RiskMap from "./pages/RiskMap";
import RouteComparison from "./pages/RouteComparison";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<ReportHazard />} />
        <Route path="/map" element={<RiskMap />} />
        <Route path="/routes" element={<RouteComparison />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;