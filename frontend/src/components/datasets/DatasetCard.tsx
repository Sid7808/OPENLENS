import type { Dataset } from "../../types/dataset";
import Badge from "../UI/Badge";
import Button from "../UI/Button";

interface DatasetCardProps {
  dataset: Dataset;
  selected: boolean;
  onSelect: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}
  function DatasetCard({
  dataset,
  selected,
  onSelect,
  onArchive,
  onRestore,
  onDelete,
}: DatasetCardProps) {
  return (
    <div className={`dataset-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(dataset.id)}
      style={{
        border: selected 
        ? "2px solid blue"
        : "1px solid gray",
      padding: "16px",
      marginBottom: "12px" ,
      cursor: "pointer",
      }}
    >
      <div className="actions">
        {dataset.status === "Active" ? (
          <Button onClick={(event) => { event.stopPropagation(); onArchive(dataset.id); }}>Archive</Button>
        ) : (
          <Button onClick={(event) => { event.stopPropagation(); onRestore(dataset.id); }}>Restore</Button>
        )}
        <Button onClick={(event) => { event.stopPropagation(); onDelete(dataset.id); }}>Delete</Button>
      </div>

      <div className="card-header">
        <h3>{dataset.name}</h3>

        <Badge status={dataset.status as "Active" | "Archived"} />
      </div>

      <p>{dataset.description}</p>

      <small>Updated {dataset.updatedAt}</small>
    </div>
  );
}
export default DatasetCard;