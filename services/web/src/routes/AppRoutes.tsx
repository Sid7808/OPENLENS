import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts";
import DatasetLayout from "../Layouts/DatasetLayout";
import LoginPage from "../pages/LoginPage";
import DatasetPage from "../pages/DatasetPage";
import Settings from "../pages/Settings";
import Analysis from "../pages/Analysis";
import Agents from "../pages/Agents";
import DatasetTables from "../pages/DatasetTables";
import DatasetAnalysis from "../pages/DatasetAnalysis";
import DatasetAgents from "../pages/DatasetAgents";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<MainLayout />}>
      <Route index element={<DatasetPage />} />
        <Route path="datasets" element={<DatasetPage />} />
        <Route path="datasets/:datasetId" element={<DatasetLayout />}>
        
          <Route index element={<DatasetTables />} />
          <Route path="tables" element={<DatasetTables />} />
          <Route path = "tables/:tableId" element={<DatasetTables />}/>
          <Route path="analysis" element={<DatasetAnalysis />} />
          <Route path="agents" element={<DatasetAgents />} />
        </Route>
        <Route path="analysis" element={<Analysis />} />
        <Route path="agents" element={<Agents />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
