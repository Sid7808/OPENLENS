import DatasetCard from "../components/datasets/DatasetCard";
import type { Dataset } from "../types/dataset";

interface DatasetListProps {
    datasets: Dataset[];
    selectedId: number |null;
    onSelect: (id: number) => void;
    onArchive?: (id: number) => void;
    onRestore?: (id: number) => void;
    onDelete?: (id: number) => void;
}

function DatasetList({
    datasets,
    selectedId,
    onSelect,
    onArchive,
    onRestore,
    onDelete,
}: DatasetListProps) {
    return (
        <>
        {datasets.map((dataset) => (
            <DatasetCard
                key={dataset.id}
                dataset={dataset}
                selected={selectedId === dataset.id}
                onSelect={onSelect}
                onArchive={onArchive}
                onRestore={onRestore}
                onDelete={onDelete}
            />
        ))}
        </>
    );
}
export default DatasetList;