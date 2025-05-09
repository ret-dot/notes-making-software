"use client";

import { useState } from "react";
import axios from "axios";
import React from "react";

export default function AudioPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId] = useState("user123");

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAudioFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("user_id", userId);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTranscribedText(res.data.transcription);
    } catch (err) {
      console.error("Error transcribing audio:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🎙️ Audio to Note</h1>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          className="text-white"
        />
      
        <button
          onClick={handleUpload}
          disabled={!audioFile || loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Transcribing..." : "Transcribe Audio"}
        </button>

        {transcribedText && (
          <div className="mt-6 w-full max-w-xl bg-gray-900 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📝 Transcribed Note</h2>
            <p>{transcribedText}</p>
          </div>
        )}
      </div>
      <div className="p-4">This is the Audio page.</div>;
    </main>
  );
}
