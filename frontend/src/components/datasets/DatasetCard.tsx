import type { Dataset } from "../../types/dataset";
import Badge from "../UI/Badge";
import Button from "../UI/Button";

interface DatasetCardProps {
  dataset: Dataset;
  selected: boolean;
  onSelect: (id: number) => void;
}
  function DatasetCard({
  dataset,
  selected,
  onSelect,
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

      <div className="card-header">
        <h3>{dataset.name}</h3>

        <Badge status={dataset.status as "Active" | "Archived"} />
      </div>

      <p>{dataset.description}</p>

      <small>
        Updated {dataset.updatedAt}
      </small>

      <div className="actions">
        <Button>Archive</Button>
        <Button>Delete</Button>
      </div>

    </div>
  );
}
export default DatasetCard;