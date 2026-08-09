interface SearchInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search datasets...",
}: SearchInputProps) {
    return (
        <input
            type="text"
            className="search-input"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}