import SearchInput from "../UI/SearchInput";
import "./DatasetToolbar.scss";

export type StatusFilter = "All" | "Active" | "Archived";
export type sortOption = "name-asc" | "name-desc" | "size-asc" | "size-desc" | "updated-desc" | "updated-asc";

interface DatasetToolbarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange:(filter: StatusFilter) => void;
    sortBy: sortOption;
    onSortByChange: (sort: sortOption) => void;
    onAddDataset: () => void;
}

export default function DatasetToolbar({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    sortBy,
    onSortByChange,
    onAddDataset,
}: DatasetToolbarProps) {
    const filters: StatusFilter[] = ["All", "Active", "Archived"];

    return (
        <div className="dataset-toolbar">
            <h2 className="dataset-title"> Datasets</h2>
            <SearchInput value={searchQuery} onChange={onSearchChange} />
            <div className="filter-group">
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
                    className="filter-select"
                >
                    {filters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>
            <div className="sort-group">
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value as sortOption)}
                    className="sort-select"
                >
                    <option value="" disabled hidden>Sort by</option>
                    <option value="updated-desc">Latest Updated</option>
                    <option value="updated-asc">Oldest Updated</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="size-desc">Size (Largest)</option>
                    <option value="size-asc">Size (Smallest)</option>
                </select>
            </div>
          <select 
          className="btn btn-primary add-dataset-btn"
          defaultValue=""
          onChange={(e)=>{
            if(e.target.value === "new") onAddDataset();
            if(e.target.value === "upload existing")
                e.target.value = ""; //reset dropdown back to placeholder after click
        }}
        >
            <option value="" disabled hidden >Add Dataset</option>
            <option value="new">Create new dataset</option>
            <option value="upload existing">Upload existing dataset</option>
            </select>
            </div>
            );
        }

        