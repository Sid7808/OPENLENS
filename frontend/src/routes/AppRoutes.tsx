import {Route, Routes} from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts";
import Dashboard from "../pages/Dashboard";
import Dataset from "../pages/Dataset";
import Analysis from "../pages/Analysis";
import DatasetsDetails from "../pages/DatasetsDetails";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="datasets" element={<Dataset />} />
                <Route path="datasets/:datasetId"
                 element={<DatasetsDetails />} />
                <Route path="analysis" element={<Analysis />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;