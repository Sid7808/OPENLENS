import { useState } from "react";
import type { Dataset } from "../types/dataset";
import DatasetHeader from "../components/datasets/DatasetHeader";
import DatasetToolbar, { type StatusFilter, type sortOption } from "../components/datasets/DatasetToolbar";
import DatasetCard from "../components/datasets/DatasetCard";
import { datasets as initialDatasets } from "../data/mockDatasets";
import "./DatasetPage.scss";
import AddDatasetModal from "../components/datasets/AddDatasetModal";


// Helper function to parse human-readable file sizes into bytes for numerical sorting
function parseSizeToBytes(sizeStr: string): number {
  const match = sizeStr.match(/^([\d.]+)\s*(KB|MB|GB|TB)?$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2]?.toUpperCase();
  switch (unit) {
    case "KB": return value * 1024;
    case "MB": return value * 1024 * 1024;
    case "GB": return value * 1024 * 1024 * 1024;
    case "TB": return value * 1024 * 1024 * 1024 * 1024;
    default: return value;
  }
}

export default function DatasetPage() {
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortBy, setSortBy] = useState<sortOption>("updated-desc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  function handleAddDataset() {
    setIsAddModalOpen(true);
  }

  function handleSaveDataset(name: string, description: string) {
  const newDataset: Dataset = {
    id: Date.now(),
    name: name,
    description: description || "No description provided.",
    status: "Active",
    updatedAt: new Date().toISOString(),
    updatedBy: "Current User",
    size: "0.00 KB", // Initial size for new datasets
  };
  setDatasets([...datasets, newDataset]);
  setIsAddModalOpen(false);
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

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleStatusFilterChange(filter: StatusFilter) {
    setStatusFilter(filter);
  }

  function handleSortByChange(sort: sortOption) {
    setSortBy(sort);
  }

  // Filter datasets by search terms and active/archived status
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || dataset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort datasets dynamically based on selected criteria
  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "updated-desc":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "updated-asc":
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case "size-desc":
        return parseSizeToBytes(b.size) - parseSizeToBytes(a.size);
      case "size-asc":
        return parseSizeToBytes(a.size) - parseSizeToBytes(b.size);
      default:
        return 0;
    }
  });

  return (
    <div className="dataset-page">
      <DatasetHeader />
      <DatasetToolbar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        onAddDataset={handleAddDataset}
      />
      <AddDatasetModal
      isOpen={isAddModalOpen}
      onClose={()=>setIsAddModalOpen(false)}
      onAdd={handleSaveDataset}
      />
      <div className="dataset-grid">
        {sortedDatasets.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            onArchive={handleArchiveDataset}
            onRestore={handleRestoreDataset}
            onDelete={handleDeleteDataset}
          />
        ))}
      </div>
    </div>
  );
}
