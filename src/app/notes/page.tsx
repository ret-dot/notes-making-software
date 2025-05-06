// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [manualTag, setManualTag] = useState("");
  const [userId] = useState("user123"); // Replace with dynamic user ID if needed
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:8000/notes/${userId}`);
    setNotes(res.data);
  };

  const handleTagNote = async () => {
    const res = await axios.post("http://localhost:8000/auto-tag", {
      user_id: userId,
      note: note,
    });
    setTags(res.data.tags);
    setNote("");
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8000/notes/${id}`);
    fetchNotes();
  };

  const handleManualAdd = () => {
    if (manualTag && !tags.includes(manualTag)) {
      setTags([...tags, manualTag]);
      setManualTag("");
    }
  };

  const handleManualRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const filteredNotes = searchTag
    ? notes.filter((n) => n.tags && n.tags.includes(searchTag))
    : notes;

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create a Note</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note here..."
        className="w-full h-40 p-4 rounded border border-gray-300 mb-4 resize-none"
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={manualTag}
          onChange={(e) => setManualTag(e.target.value)}
          placeholder="Add manual tag"
          className="p-2 border rounded w-60"
        />
        <button
          onClick={handleManualAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Tag
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-green-200 px-2 py-1 rounded text-sm flex items-center gap-1"
          >
            {tag}
            <button onClick={() => handleManualRemove(tag)}>×</button>
          </span>
        ))}
      </div>

      <button
        onClick={handleTagNote}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Save Note with Tags
      </button>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Notes</h2>

      <input
        type="text"
        placeholder="Search by tag..."
        className="mb-4 p-2 border rounded w-60"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2"
          >
            <p>{note.note}</p>
            <div className="flex flex-wrap gap-1">
              {note.tags?.split(",").map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="mt-2 text-red-600 text-sm self-end"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="p-4">This is the Notes page.</div>;
    </main>
  );
}
