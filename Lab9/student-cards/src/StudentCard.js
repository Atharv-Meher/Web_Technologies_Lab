import React from "react";
import "./StudentCard.css";

function StudentCard({ name, department, marks }) {
  return (
    <div className="card">
      <div className="card-glow"></div>

      <h2 className="card-name">{name}</h2>

      <div className="divider"></div>

      <p className="card-item">
        <span>Department</span>
        {department}
      </p>

      <p className="card-item">
        <span>Marks</span>
        {marks}
      </p>
    </div>
  );
}

export default StudentCard;