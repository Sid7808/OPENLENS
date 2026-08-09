import Button from "../UI/Button";
import SearchInput from "../UI/SearchInput";

export type StatusFilter = "All" | "Active" | "Archived";

interface DatasetToolbarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange:(filter: StatusFilter) => void;
    onAddDataset: () => void;
}

export default function DatasetToolbar({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    onAddDataset,
}: DatasetToolbarProps) {
    const filters: StatusFilter[] = ["All", "Active", "Archived"];

    return (
        <div className="toolbar">
            <SearchInput value= {searchQuery} onChange={onSearchChange} />
            <div className="filter-group">
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        className={statusFilter === filter ? "btn btn-active" : "btn"}
                        onClick={() => onStatusFilterChange(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
            <Button className="btn btn-primary" onClick={onAddDataset}>
                Add Dataset
            </Button>
        </div>
    );
}
