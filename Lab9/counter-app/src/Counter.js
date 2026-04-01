import React, { useState } from "react";
import "./Counter.css";

function Counter() {
  // State initialization
  const [count, setCount] = useState(0);

  // Event handlers
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h1 className="title">CSSounter</h1>

      <div className="counter-box">
        <p className="count">{count}</p>

        <div className="buttons">
          <button className="btn decrease" onClick={decrement}>
            Decrease
          </button>

          <button className="btn increase" onClick={increment}>
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;