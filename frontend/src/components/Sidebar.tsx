// src/components/Sidebar.tsx

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 space-y-4">
      <h1 className="text-xl font-bold mb-6">My App</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/notes" className="block p-2 hover:bg-gray-700 rounded">
            Notes
          </Link>
        </li>
        <li>
          <Link href="/audio" className="block p-2 hover:bg-gray-700 rounded">
            Audio Summary
          </Link>
        </li>
      </ul>
    </div>
  );
}
