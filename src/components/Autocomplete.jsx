import React, { useState } from "react";

export const Autocomplete = ({ data, onSearch }) => {
  const [input, setInput] = useState("");

  const filtered = data
    .filter(doc => doc.name.toLowerCase().includes(input.toLowerCase()))
    .slice(0, 3);

  const handleSelect = (name) => {
    setInput(name);
    onSearch(name);
  };

  return (
    <div className="relative mb-6">
      <input
        data-testid="autocomplete-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
        placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {input && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow mt-1 z-10">
          {filtered.map(doc => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              onClick={() => handleSelect(doc.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};