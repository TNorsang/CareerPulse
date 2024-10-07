// app/components/Canvas.tsx
"use client";

import { useState, useEffect } from "react";

interface User {
  uniqueUsername: string;
  jobStatus: boolean;
  createdAt: string;
}

export default function Canvas() {
  // State variables
  const [username, setUsername] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // To display all users
  const [error, setError] = useState<string | null>(null);

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        console.error(err);
        setError(err.Message);
      }
    };

    fetchUsers(); // Call the fetchUsers function
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle checkbox state change
  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobStatus(event.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Basic validation
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueUsername: username, jobStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const createdUser: User = await response.json();
      setUser(createdUser);
      setUsers([createdUser, ...users]); // Add the new user to the list
      setUsername(""); // Clear the input field
      setJobStatus(false); // Reset the checkbox
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error(err);
      setError(err.Message);
    }
  };

  return (
    <div className="border border-blue-500 flex flex-col items-center h-full w-full p-4">
      {/* User Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Unique Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-2 border-gray-300 p-2 rounded"
        />
        <label className="flex items-center">
          <span className="ml-1">Job Status: (Check if employed)</span>

          <input
            type="checkbox"
            className="ml-2"
            checked={jobStatus}
            onChange={handleCheckBoxChange}
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display the last submitted user */}
      {user && (
        <div className="flex flex-col mt-4 p-4 border border-green-500 rounded w-full max-w-md">
          <p>
            <strong>Your Username is:</strong> {user.uniqueUsername}
          </p>
          <p>
            <strong>Your Job Status is:</strong>{" "}
            {user.jobStatus ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Display All Users */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">All Users:</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u.uniqueUsername}
                className="border-b border-gray-200 pb-2"
              >
                <p>
                  <strong>Username:</strong> {u.uniqueUsername}
                </p>
                <p>
                  <strong>Job Status:</strong>{" "}
                  {u.jobStatus ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(u.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
