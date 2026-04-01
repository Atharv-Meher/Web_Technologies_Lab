import React, { useState } from "react";
import ItemList from "./ItemList";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Add item
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(), // unique key
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <h1 className="heading">Task Manager</h1>

      {/* Input Section */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      {/* List Component */}
      <ItemList items={items} removeItem={removeItem} />
    </div>
  );
}

export default App;