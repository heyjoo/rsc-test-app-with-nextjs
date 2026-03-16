// "use client" 없음 → 이 래퍼는 Server Component
// 자식인 InteractiveCounter만 Client Component

// 매 요청마다 서버에서 렌더링 (서버 렌더 시간 vs 클라이언트 마운트 시간 비교를 위해)
export const dynamic = "force-dynamic";

import { InteractiveCounter } from "./_components/InteractiveCounter";

export default function ClientDemoPage() {
  // 서버에서 계산된 시간 → Client Component에 props로 전달
  const serverRenderTime = new Date().toISOString();

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-1">2. Client Component</h1>
      <p className="text-gray-400 text-sm mb-6">
        <code className="text-amber-400">&quot;use client&quot;</code> 지시어가
        있는 컴포넌트입니다.
        <br />
        서버에서 SSR(초기 HTML 생성) 후, 클라이언트에서 하이드레이션됩니다.
      </p>

      {/* Server Component가 Client Component를 감싸고 있음 */}
      <div className="border border-blue-700 rounded-lg p-5 bg-blue-950 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-blue-700 text-blue-100 px-2 py-0.5 rounded">
            SERVER
          </span>
          <code className="text-blue-300 text-xs">app/2-client/page.tsx</code>
        </div>
        <p className="text-blue-200 text-sm mb-4">
          이 Server Component에서{" "}
          <code className="text-white">serverRenderTime</code>을 계산해 Client
          Component에 props로 전달합니다.
        </p>

        {/* Client Component는 Server Component 안에 중첩될 수 있음 */}
        <InteractiveCounter serverRenderTime={serverRenderTime} />
      </div>

      <div className="space-y-3 text-sm text-gray-400">
        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">Client Component 특성</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              서버에서도 실행됨 (SSR — 초기 HTML 생성, 빠른 First Paint)
            </li>
            <li>클라이언트에서도 실행됨 (Hydration — 이벤트 핸들러 연결)</li>
            <li>
              <code>useState</code>, <code>useEffect</code>, 이벤트 핸들러 사용
              가능
            </li>
            <li>
              브라우저 API (<code>window</code>, <code>document</code>) 접근 가능
              (mount 후)
            </li>
            <li>컴포넌트 코드가 JS 번들에 포함됨</li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">SSR 중 window 접근 주의</p>
          <p>
            Client Component는{" "}
            <strong className="text-white">서버에서도 한 번 실행</strong>됩니다
            (SSR). 따라서 <code>window</code> 접근은{" "}
            <code>useEffect</code> 안에서 해야 합니다.
            <br />
            위 컴포넌트에서 &quot;클라이언트 마운트 시간&quot;이 서버 렌더 시간보다
            늦게 표시되는 것을 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
