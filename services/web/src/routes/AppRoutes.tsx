import { Route, Routes, Navigate } from "react-router-dom";
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
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { useAuth } from "../components/auth/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/datasets" replace /> : <LoginPage />} 
      />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DatasetPage />} />
          <Route path="datasets" element={<DatasetPage />} />
          <Route path="datasets/:datasetId" element={<DatasetLayout />}>
            <Route index element={<DatasetTables />} />
            <Route path="tables" element={<DatasetTables />} />
            <Route path="tables/:tableId" element={<DatasetTables />} />
            <Route path="analysis" element={<DatasetAnalysis />} />
            <Route path="agents" element={<DatasetAgents />} />
          </Route>
          <Route path="analysis" element={<Analysis />} />
          <Route path="agents" element={<Agents />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      
      {/* Fallback to redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
