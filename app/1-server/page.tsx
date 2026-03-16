// "use client" 없음 → 기본값으로 Server Component
// console.log는 브라우저가 아닌 터미널(서버)에서 출력됩니다.

// 매 요청마다 서버에서 렌더링 (타임스탬프 변화를 확인하기 위해)
export const dynamic = "force-dynamic";

import { Suspense } from "react";

console.log("[SERVER] 1-server/page.tsx 모듈 로드됨");

async function fetchItems(): Promise<{ id: number; name: string }[]> {
  // 서버에서 직접 DB/API 호출하는 패턴을 시뮬레이션 (800ms 지연)
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: 1, name: "React Server Components" },
    { id: 2, name: "Next.js App Router" },
    { id: 3, name: "Async Server Components" },
  ];
}

// 비동기 자식 서버 컴포넌트 — 별도로 await함
async function AsyncDataSection() {
  console.log("[SERVER] AsyncDataSection — 데이터 패치 시작");
  const items = await fetchItems();
  console.log("[SERVER] AsyncDataSection — 데이터 패치 완료");

  return (
    <div className="mt-4 border-t border-blue-800 pt-4">
      <p className="text-blue-300 text-xs mb-2">
        async 서버 컴포넌트에서 데이터 패치 (800ms 지연 시뮬레이션):
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className="text-sm text-blue-100">
            #{item.id} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServerPage() {
  console.log("[SERVER] ServerPage 렌더링 시작");
  const renderTime = new Date().toISOString();

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-1">1. Server Component</h1>
      <p className="text-gray-400 text-sm mb-6">
        이 파일에는 <code className="text-blue-400">&quot;use client&quot;</code>
        가 없습니다. 기본값으로 Server Component입니다.
        <br />
        <span className="text-yellow-500">터미널</span>에서 console.log 출력을
        확인하세요. 브라우저 콘솔에는 나타나지 않습니다.
      </p>

      {/* 서버 컴포넌트 박스 */}
      <div className="border border-blue-700 rounded-lg p-5 bg-blue-950 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold bg-blue-700 text-blue-100 px-2 py-0.5 rounded">
            SERVER
          </span>
          <code className="text-blue-300 text-xs">app/1-server/page.tsx</code>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-blue-400">렌더 시간 (서버):</span>{" "}
            <span className="text-white font-mono">{renderTime}</span>
          </div>
          <div>
            <span className="text-blue-400">process.env.NODE_ENV:</span>{" "}
            <span className="text-white font-mono">{process.env.NODE_ENV}</span>
          </div>
          <div>
            <span className="text-blue-400">typeof window:</span>{" "}
            <span className="text-white font-mono">{typeof window}</span>
            <span className="text-blue-600 text-xs ml-2">
              (서버에서는 항상 &quot;undefined&quot;)
            </span>
          </div>
        </div>

        {/* 비동기 자식 컴포넌트 */}
        <Suspense
          fallback={
            <div className="mt-4 border-t border-blue-800 pt-4 text-blue-600 text-sm">
              데이터 패치 중...
            </div>
          }
        >
          <AsyncDataSection />
        </Suspense>
      </div>

      {/* 설명 */}
      <div className="space-y-3 text-sm text-gray-400">
        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">Server Component 특성</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>서버에서 렌더링 → HTML/RSC Payload 생성 → 클라이언트로 전송</li>
            <li>컴포넌트 코드가 JS 번들에 포함되지 않음 (클라이언트로 안 감)</li>
            <li>
              <code>async/await</code>로 데이터 직접 패치 가능 (DB, 파일시스템
              등)
            </li>
            <li>
              <code>useState</code>, <code>useEffect</code>, 이벤트 핸들러 사용
              불가
            </li>
            <li>
              <code>window</code>, <code>document</code> 등 브라우저 API 접근
              불가
            </li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">RSC Payload 확인하기</p>
          <p>
            서버 컴포넌트는 HTML이 아닌{" "}
            <strong className="text-white">RSC Payload</strong> (특수한 스트림
            포맷)로 직렬화됩니다.
            <br />
            브라우저 DevTools → Network 탭 → 이 페이지 요청의 Response를
            확인하거나,
            <br />
            클라이언트 내비게이션 시{" "}
            <code className="text-blue-400">?_rsc=...</code> 파라미터가 붙은
            요청을 확인해보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
