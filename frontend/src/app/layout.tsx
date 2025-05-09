// src/app/layout.tsx
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import React from "react";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
