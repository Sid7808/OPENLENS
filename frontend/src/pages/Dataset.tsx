import { useState } from "react";

export default function Datasets() {
  const [datasets, setDatasets] = useState([
    { id: 1, name: "Customer Data" },
    { id: 2, name: "Sales Report" },
    { id: 3, name: "Inventory" },
  ]);

  const [datasetName, setDatasetName] = useState("");

  function handleAddDataset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!datasetName.trim()) return;

    setDatasets([
      ...datasets,
      {
        id: Date.now(),
        name: datasetName,
      },
    ]);

    setDatasetName("");
  }

  function handleDelete(id: number) {
    setDatasets(datasets.filter((dataset) => dataset.id !== id));
  }

  function handleCardClick(name: string) {
    alert(`Opening ${name}`);
  }

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) {
    event.stopPropagation();
    handleDelete(id);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Datasets</h1>

      <input
        type="text"
        placeholder="Dataset Name"
        value={datasetName}
        onChange={(event) => setDatasetName(event.target.value)}
      />

      <form onSubmit={handleAddDataset}>
        <button type="submit">Add Dataset</button>
      </form>

      <hr />

      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          onClick={() => handleCardClick(dataset.name)}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{dataset.name}</h3>

          <button
            onClick={(event) => handleButtonClick(event, dataset.id)}
          >
            Delete
          </button>

          <button
            onDoubleClick={() => alert("Double Clicked")}
          >
            Double Click
          </button>
        </div>
      ))}
    </div>
  );
}