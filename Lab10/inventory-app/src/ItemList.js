import React from "react";

function ItemList({ items, removeItem }) {
  // Empty state handling
  if (items.length === 0) {
    return <p className="empty">No items added yet.</p>;
  }

  return (
    <div className="list">
      {items.map((item) => (
        <div className="list-item" key={item.id}>
          <span>{item.text}</span>
          <button onClick={() => removeItem(item.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;