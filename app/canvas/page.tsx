"use client";

import { useState } from "react";

export default function Canvas() {
  interface User {
    uniqueUsername: string;
    jobStatus: boolean;
  }

  const [user, setUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUser({
      uniqueUsername: inputValue,
      jobStatus: true,
    });
    event.preventDefault();
    setInputValue("");
  };
  return (
    <div className="border border-blue-500 flex justify-center h-full w-full">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Unique ID Please"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-2 border-gray-300"
          />
          <button type="submit" className="ml-2 p-1 border border-gray-300">
            Submit
          </button>
        </form>

        {user?.uniqueUsername}
      </div>
    </div>
  );
}
