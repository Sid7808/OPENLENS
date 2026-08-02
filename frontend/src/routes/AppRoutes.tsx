import {Route, Routes} from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts";
import Dashboard from "../pages/Dashboard";
import Analysis from "../pages/Analysis";
import DatasetsDetails from "../pages/DatasetsDetails";
import DatasetPage from "../pages/DatasetPage";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="datasets" element={<DatasetPage />} />
                <Route path="datasets/:datasetId"
                 element={<DatasetsDetails />} />
                <Route path="analysis" element={<Analysis />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;