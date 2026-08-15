import type { Dataset } from "../../types/dataset";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import "./DatasetCard.scss";

interface DatasetCardProps {
  dataset: Dataset;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function DatasetCard({
  dataset,
  onArchive,
  onRestore,
  onDelete,
}: DatasetCardProps) {
  const navigate = useNavigate();

  // Safe date formatter supporting ISO format and falling back if plain text
  const formatUpdatedDate = () => {
    try {
      const date = new Date(dataset.updatedAt);
      if (isNaN(date.getTime())) {
        return dataset.updatedAt;
      }
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dataset.updatedAt;
    }
  };

  return (
    <div 
      className="dataset-card"
      onClick={() => navigate(`/datasets/${dataset.id}`)}
    >
      <div>
        <div className="card-header">
          <h3 className="card-title">{dataset.name}</h3>
          <Badge status={dataset.status} />
        </div>
        <p className="card-description">{dataset.description}</p>
      </div>

      <div className="card-footer">
        <div className="card-meta">
          <span>Updated: <strong>{formatUpdatedDate()}</strong> by {dataset.updatedBy}</span>
          <span>Size: <strong>{dataset.size}</strong></span>
        </div>
        <div className="card-actions">
          {dataset.status === "Active" ? (
            <Button className="action-btn" onClick={(event) => { event.stopPropagation(); onArchive(dataset.id); }}>Archive</Button>
          ) : (
            <Button className="action-btn" onClick={(event) => { event.stopPropagation(); onRestore(dataset.id); }}>Restore</Button>
          )}
          <Button className="action-btn" onClick={(event) => { event.stopPropagation(); onDelete(dataset.id); }}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
