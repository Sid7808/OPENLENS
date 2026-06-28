// Imports the navigation component that changes the URL
//  without a full page reload.
import {Link} from "react-router-dom";
function Dataset() {
    const datasets = [
        {id: "1", name: "Customer Sales"},
        {id: "2", name: "Marketing Analysis"},
        {id: "3", name: "Employee Records"},
    ];
    return (
        <div>
            <h1>Datasets</h1>
            <ul>
                {datasets.map((dataset) => (
                    <li key={dataset.id}>
                        <Link to={`/datasets/${dataset.id}`}>
                        {dataset.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Dataset;