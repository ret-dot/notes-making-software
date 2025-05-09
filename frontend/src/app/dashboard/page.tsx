"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [userId] = useState("user123"); // Later: dynamic user

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:8000/notes/${userId}`);
    setNotes(res.data);
  };
  
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  

  const totalNotes = notes.length;

  const tagFrequency: { [key: string]: number } = {};
  notes.forEach((note) => {
    if (note.tags) {
      note.tags.split(",").forEach((tag: string) => {
        tag = tag.trim();
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.entries(tagFrequency).sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Total Notes */}
        <div className="bg-gray-900 p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Notes</h2>
          <p className="text-3xl font-bold text-purple-400">{totalNotes}</p>
        </div>

        {/* Top Tags */}
        <div className="bg-gray-900 p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-center">Top Tags</h2>
          <ul className="flex flex-col gap-2">
            {sortedTags.slice(0, 5).map(([tag, count]) => (
              <li key={tag} className="flex justify-between">
                <span className="text-sm">{tag}</span>
                <span className="text-sm text-gray-400">{count}x</span>
              </li>
            ))}
            {sortedTags.length === 0 && (
              <p className="text-center text-gray-500">No tags yet</p>
            )}
          </ul>
        </div>

        {/* Weekly Activity (Simple Placeholder) */}
        <div className="bg-gray-900 p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-center">Weekly Notes</h2>
          <p className="text-center text-gray-400">
            (Coming Soon: Graph showing notes/week 📈)
          </p>
        </div>
      </div>

      {/* Future: Scheduled Content */}
      <h2 className="text-2xl font-bold mt-16 mb-6 text-center">📅 Upcoming Ideas</h2>
      <div className="bg-gray-900 p-6 rounded max-w-4xl mx-auto">
        <p className="text-center text-gray-400">
          (You can schedule notes in the Calendar page soon!)
        </p>
      </div>
      <div className="p-4">This is the dashboard.</div>;
    </main>
  );
}
