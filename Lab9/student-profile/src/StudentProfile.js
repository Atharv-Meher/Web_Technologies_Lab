import React from "react";
import "./StudentProfile.css";

function StudentProfile() {
  // Student Data (variables)
  const name = "Atharv Meher";
  const department = "CSE (AI/ML)";
  const year = "3rd Year";
  const section = "A";

  return (
    <div className="gothic-container">
      <h1 className="title">Student Profile</h1>

      <div className="profile-card">
        <p><span>Name:</span> {name}</p>
        <p><span>Department:</span> {department}</p>
        <p><span>Year:</span> {year}</p>
        <p><span>Section:</span> {section}</p>
      </div>
    </div>
  );
}

export default StudentProfile;