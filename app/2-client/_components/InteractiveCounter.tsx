"use client";

import { useState, useEffect } from "react";

interface Props {
  serverRenderTime: string;
}

export function InteractiveCounter({ serverRenderTime }: Props) {
  const [count, setCount] = useState(0);
  const [mountTime, setMountTime] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // 이 코드는 클라이언트(브라우저)에서만 실행됩니다.
    // 서버 SSR 중에는 실행되지 않습니다.
    setMountTime(new Date().toISOString());
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="border border-amber-700 rounded-lg p-5 bg-amber-950">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold bg-amber-700 text-amber-100 px-2 py-0.5 rounded">
          CLIENT
        </span>
        <code className="text-amber-300 text-xs">
          _components/InteractiveCounter.tsx
        </code>
      </div>

      {/* 타이밍 비교 */}
      <div className="space-y-2 text-sm mb-5">
        <div>
          <span className="text-amber-400">서버 렌더 시간 (props):</span>{" "}
          <span className="text-white font-mono text-xs">{serverRenderTime}</span>
        </div>
        <div>
          <span className="text-amber-400">클라이언트 마운트 시간:</span>{" "}
          <span className="text-white font-mono text-xs">
            {mountTime ?? (
              <span className="text-gray-500 italic">useEffect 실행 전...</span>
            )}
          </span>
        </div>
        <div>
          <span className="text-amber-400">typeof window:</span>{" "}
          <span className="text-white font-mono">{typeof window}</span>
          <span className="text-amber-700 text-xs ml-2">
            (클라이언트에서는 &quot;object&quot;)
          </span>
        </div>
        <div>
          <span className="text-amber-400">window.innerWidth:</span>{" "}
          <span className="text-white font-mono">
            {windowWidth ?? (
              <span className="text-gray-500 italic">useEffect 실행 전...</span>
            )}
          </span>
        </div>
      </div>

      {/* 인터랙션 영역 */}
      <div className="border-t border-amber-800 pt-4">
        <p className="text-amber-300 text-xs mb-3">
          인터랙션 (Server Component에서는 불가):
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-8 h-8 border border-amber-700 rounded text-amber-300 hover:bg-amber-900 transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold text-white w-12 text-center">
            {count}
          </span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-8 h-8 border border-amber-700 rounded text-amber-300 hover:bg-amber-900 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => setCount(0)}
            className="text-xs text-amber-600 hover:text-amber-400 ml-2"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
