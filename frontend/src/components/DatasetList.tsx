import DatasetCard from "../components/datasets/DatasetCard";
import type { Dataset } from "../types/dataset";

interface DatasetListProps {
    datasets: Dataset[];
    selectedId: number |null;
    onSelect: (id: number) => void;
}

function DatasetList({
    datasets,
    selectedId,
    onSelect,
}: DatasetListProps) {
    return (
        <>
        {datasets.map((dataset) => (
            <DatasetCard
                key={dataset.id}
                dataset={dataset}
                selected={selectedId === dataset.id}
                onSelect={onSelect}
            />
        ))}
        </>
    );
}
export default DatasetList;