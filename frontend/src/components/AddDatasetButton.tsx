interface AddDatasetButtonProps {
    onAddDataset: () => void;
}

function AddDatasetButton({
    onAddDataset,
}: AddDatasetButtonProps) {
    return (
        <button onClick = {onAddDataset}> 
        Add Dataset
        </button>
    );
}
export default AddDatasetButton;