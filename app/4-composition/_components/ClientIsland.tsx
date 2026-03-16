"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

interface Props {
  user: User;
  fetchedAt: string;
  children: React.ReactNode;
}

export function ClientIsland({ user, fetchedAt, children }: Props) {
  const [likes, setLikes] = useState(0);
  const [note, setNote] = useState("");

  return (
    <div className="border border-amber-700 rounded-lg p-5 bg-amber-950">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold bg-amber-700 text-amber-100 px-2 py-0.5 rounded">
          CLIENT
        </span>
        <code className="text-amber-300 text-xs">
          _components/ClientIsland.tsx
        </code>
      </div>

      {/* 서버로부터 받은 props */}
      <div className="space-y-1 text-sm mb-5">
        <p className="text-amber-400 text-xs mb-2">서버로부터 받은 props:</p>
        <div>
          <span className="text-amber-400">user.id:</span>{" "}
          <span className="text-white font-mono">{user.id}</span>
        </div>
        <div>
          <span className="text-amber-400">user.name:</span>{" "}
          <span className="text-white font-mono">{user.name}</span>
        </div>
        <div>
          <span className="text-amber-400">user.role:</span>{" "}
          <span className="text-white font-mono">{user.role}</span>
        </div>
        <div>
          <span className="text-amber-400">fetchedAt:</span>{" "}
          <span className="text-white font-mono text-xs">{fetchedAt}</span>
        </div>
      </div>

      {/* 클라이언트 인터랙션 */}
      <div className="border-t border-amber-800 pt-4 mb-4 space-y-3">
        <p className="text-amber-300 text-xs">클라이언트 인터랙션 (state 변경):</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLikes((l) => l + 1)}
            className="border border-amber-700 rounded px-3 py-1.5 text-sm text-amber-300 hover:bg-amber-900 transition-colors"
          >
            좋아요{likes > 0 && <span className="font-bold text-white ml-2">{likes}</span>}
          </button>
        </div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="메모 입력 (클라이언트 state)..."
          className="w-full bg-amber-900/30 border border-amber-800 rounded px-3 py-2 text-sm text-white placeholder-amber-700 focus:outline-none focus:border-amber-600"
        />
        {note && (
          <p className="text-amber-200 text-xs">
            state: &quot;{note}&quot; — 이 state가 바뀌어도 children(ServerNote)은
            재실행되지 않습니다.
          </p>
        )}
      </div>

      {/* children (Server Component) */}
      <div>
        <p className="text-amber-400 text-xs mb-2">children (Server Component):</p>
        {children}
      </div>
    </div>
  );
}
