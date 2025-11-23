import React, { useState } from "react";
import "./App.css";

// Import components
import TableComponent from "./components/TableComponent";

function App() {
  // Sample data
  const [userData] = useState([
    { userId: 1, userName: "John Doe", age: 28 },
    { userId: 2, userName: "Jane Smith", age: 34 },
    { userId: 3, userName: "Sara Lee", age: 25 },
  ]);

  const [jobData] = useState([
    { userId: 1, jobTitle: "Engineer" },
    { userId: 2, jobTitle: "Designer" },
    { userId: 4, jobTitle: "Manager" }, // Notice userId 4 has no match in userData
  ]);

  // LEFT JOIN - All users, even if they don't have a job
  const leftJoin = userData.map((user) => {
    const job = jobData.find((job) => job.userId === user.userId);
    return { ...user, jobTitle: job ? job.jobTitle : "No Job" };
  });

  // RIGHT JOIN - All jobs, even if they don't have a user
  const rightJoin = jobData.map((job) => {
    const user = userData.find((user) => user.userId === job.userId);
    return { ...job, userName: user ? user.userName : "No User" };
  });

  // INNER JOIN - Only users who have a job
  const innerJoin = userData
    .filter((user) => jobData.some((job) => job.userId === user.userId))
    .map((user) => {
      const job = jobData.find((job) => job.userId === user.userId);
      return { ...user, jobTitle: job.jobTitle };
    });

  return (
    <div className="App">
      <h1>React App with SQL Joins</h1>

      <h2>LEFT JOIN: All users with their job (if available)</h2>
      <TableComponent data={leftJoin} />

      <h2>RIGHT JOIN: All jobs with their users (if available)</h2>
      <TableComponent data={rightJoin} />

      <h2>INNER JOIN: Users with jobs</h2>
      <TableComponent data={innerJoin} />
    </div>
  );
}

export default App;
