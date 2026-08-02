import { useState } from "react";

import DatasetHeader from "../components/datasets/DatasetHeader";
import DatasetToolbar from "../components/datasets/DatasetToolbar";
import DatasetCard from "../components/datasets/DatasetCard";
import { datasets as initialDatasets } from "../data/datasets";

export default function DatasetPage() {
  const [datasets] = useState(initialDatasets);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleSelectDataset(id: number) {
    console.log("Selected:", id);
    setSelectedId(id);
  }

  return (
    <>
      <DatasetHeader />
      <DatasetToolbar />
      <div className="dataset-grid">
        {datasets.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            selected={dataset.id === selectedId}
            onSelect={handleSelectDataset}
          />
        ))}
      </div>
    </>
  );
}
