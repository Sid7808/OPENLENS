import { useState } from "react";
import type { Dataset } from "../types/dataset";
import DatasetHeader from "../components/datasets/DatasetHeader";
import DatasetToolbar, {type StatusFilter,}
 from "../components/datasets/DatasetToolbar";
import DatasetCard from "../components/datasets/DatasetCard";
import AddDatasetButton from "../components/AddDatasetButton";
import { datasets as initialDatasets } from "../data/datasets";

export default function DatasetPage() {
  const [datasets, setDatasets] = useState(initialDatasets);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  function handleAddDataset() {
    // Logic to add a new dataset
    const newDataset: Dataset = {
      id: Date.now(),
      name: `Dataset ${datasets.length + 1}`,
      description: 'New dataset description',
      status: 'Active',
      updatedAt: 'Just now',
    };
    setDatasets([...datasets, newDataset]);
  }
  function handleArchiveDataset(id: number) {
    setDatasets((prevDatasets) =>
      prevDatasets.map((dataset) =>
        dataset.id === id ? { ...dataset, status: "Archived" } : dataset
      )
    );
  }
  function handleRestoreDataset(id: number) {
    setDatasets((prevDatasets) =>
      prevDatasets.map((dataset) =>
        dataset.id === id ? { ...dataset, status: "Active" } : dataset
      )
    );
  }
  function handleDeleteDataset(id: number) {
    setDatasets((prevDatasets) =>
      prevDatasets.filter((dataset) => dataset.id !== id)
    );
  }
  function handleSelectDataset(id: number) {
    setSelectedId(id);
  }
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }
  function handleStatusFilterChange(filter: StatusFilter) {
    setStatusFilter(filter);
  }
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch=
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase())||
    dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || dataset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <DatasetHeader />
      <DatasetToolbar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onAddDataset={handleAddDataset}
      />
      <AddDatasetButton onAddDataset={handleAddDataset} />
      <div className="dataset-grid">
        {filteredDatasets.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            selected={dataset.id === selectedId}
            onSelect={handleSelectDataset}
            onArchive={handleArchiveDataset}
            onRestore={handleRestoreDataset}
            onDelete={handleDeleteDataset}
          />
        ))}
      </div>
    </>
  );
}
