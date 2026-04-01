import React from "react";
import StudentCard from "./StudentCard";
import "./App.css";

function App() {
  const students = [
    { name: "Atharv Meher", department: "CSE (AI/ML)", marks: 92 },
    { name: "Rahul Sharma", department: "ECE", marks: 85 },
    { name: "Sneha Reddy", department: "IT", marks: 88 },
    { name: "Kiran Kumar", department: "CSE", marks: 90 }
  ];

  return (
    <div className="app">
      <h1 className="heading">Student Records</h1>

      <div className="grid">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;