import { useState } from "react";

interface Dataset {
  id: number;
  name: string;
}

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: 1, name: "Sales Data" },
    { id: 2, name: "Customer Data" },
    { id: 3, name: "Product Data" },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleClick() {
    alert("Button Clicked!");
  }

  function handleDelete(id: number) {
    setDatasets((prev) => prev.filter((dataset) => dataset.id !== id));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputValue.trim()) return;

    const newDataset: Dataset = {
      id: Date.now(),
      name: inputValue,
    };

    setDatasets((prev) => [...prev, newDataset]);
    setInputValue("");
  }

  function handleOuterClick() {
    alert("Outer Div Clicked");
  }

  function handleInnerClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    alert("Inner Button Clicked");
  }

  function handleFocus() {
    console.log("Input Focused");
  }

  function handleBlur() {
    console.log("Input Lost Focus");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log("Key Down:", event.key);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log("Key Up:", event.key);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Datasets</h1>

      <button onClick={handleClick}>
        Click Me
      </button>

      <button
        onDoubleClick={() => alert("Double Clicked")}
      >
        Double Click
      </button>

      <hr />

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Dataset name"
      />

      <p>Current Input: {inputValue}</p>

      <form onSubmit={handleSubmit}>
        <button type="submit">
          Add Dataset
        </button>
      </form>

      <hr />

      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>
            {dataset.name}

            <button
              onClick={() => handleDelete(dataset.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <div
        onClick={handleOuterClick}
        style={{
          border: "2px solid black",
          padding: "30px",
        }}
      >
        Outer Div

        <button
          onClick={handleInnerClick}
        >
          Inner Button
        </button>
      </div>
    </div>
  );
}