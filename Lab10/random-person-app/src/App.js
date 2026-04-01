import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUsers(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="status">Loading users...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="app">
      <h1 className="heading">User Directory</h1>

      <div className="grid">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <img src={user.picture.large} alt="user" />

            <h3>
              {user.name.first} {user.name.last}
            </h3>

            <p>{user.email}</p>

            <p className="location">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;