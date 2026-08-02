import Button from "../UI/Button";
import SearchInput from "../UI/SearchInput";

export default function DatasetToolbar() {
    return (
        <div className="toolbar">
            <SearchInput />
            <Button>Upload Dataset</Button>
        </div>
    );
}