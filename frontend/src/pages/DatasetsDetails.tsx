import {useState} from "react";
import {useParams} from "react-router-dom";
type Dataset = {
    id: string;
    name: string;
    description: string;
    status: string;
};
function DatasetsDetails() {
    const{datasetId} = useParams();
    const [dataset , setDataset] = useState<Dataset>({
        id: datasetId ?? "",
        name: "Customer Aanalytics",
        description: "This dataset contains customer analytics data.",
        status: "Active",
    });
    const [loading] = useState(false);
    const [error] = useState("");
    function handleToggleStatus() {
        setDataset((previousDataset) => {
            return {
                ...previousDataset,
                status: previousDataset.status === "Active" 
                ? "Archived" : "Active",
            };
        });
    }
    return (
        <div>
            <h1>Dataset Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <p>ID: {dataset.id}</p>
            <p>Name: {dataset.name}</p>
            <p>Status: {dataset.status}</p>
            <button onClick={handleToggleStatus}>
                {dataset.status ==="Active"
                ?"Archive Dataset":
                "Activate Dataset"}
            </button>
        </div>
    );
}
export default DatasetsDetails;