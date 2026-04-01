import React, { useState } from "react";
import "./UserForm.css";

function UserForm() {
  // State for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input change (controlled component)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Validation logic
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // If no errors → submit
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        {/* Name */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserForm;