// 매 요청마다 동적으로 렌더링 (스트리밍 동작 확인을 위해)
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { SlowServerData } from "./_components/SlowServerData";

export default function StreamingPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-1">3. Streaming</h1>
      <p className="text-gray-400 text-sm mb-6">
        <code className="text-green-400">Suspense</code> + 비동기 서버 컴포넌트.
        <br />
        페이지를 새로고침하여 콘텐츠가 스트리밍되는 순서를 확인하세요.
        (느린 데이터가 먼저 fallback UI를 보여주다가 완료 시 교체됩니다.)
      </p>

      {/* 즉시 렌더링되는 콘텐츠 */}
      <div className="border border-blue-700 rounded-lg p-4 bg-blue-950 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-700 text-blue-100 px-2 py-0.5 rounded">
            SERVER
          </span>
          <span className="text-blue-400 text-xs">즉시 렌더링 (대기 없음)</span>
        </div>
        <p className="text-blue-200 text-sm">
          이 블록은 데이터 패치 없이 즉시 렌더링됩니다. Suspense 경계 밖의
          콘텐츠는 바로 스트리밍됩니다.
        </p>
      </div>

      {/* 빠른 데이터 — 500ms */}
      <p className="text-gray-600 text-xs mb-2">↓ Suspense boundary (500ms)</p>
      <div className="mb-4">
        <Suspense
          fallback={
            <div className="border border-dashed border-gray-700 rounded-lg p-4 text-gray-500 text-sm">
              빠른 데이터 로딩 중... (fallback UI)
            </div>
          }
        >
          <SlowServerData label="빠른 데이터" delay={500} itemCount={2} color="teal" />
        </Suspense>
      </div>

      {/* 느린 데이터 — 2000ms */}
      <p className="text-gray-600 text-xs mb-2">↓ Suspense boundary (2000ms)</p>
      <div className="mb-6">
        <Suspense
          fallback={
            <div className="border border-dashed border-gray-700 rounded-lg p-4 text-gray-500 text-sm animate-pulse">
              느린 데이터 로딩 중... (fallback UI) ████████████
            </div>
          }
        >
          <SlowServerData label="느린 데이터" delay={2000} itemCount={4} color="green" />
        </Suspense>
      </div>

      {/* 설명 */}
      <div className="space-y-3 text-sm text-gray-400">
        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">Streaming 동작 방식</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Next.js가 HTML을{" "}
              <strong className="text-white">청크 단위로 스트리밍</strong>합니다.
            </li>
            <li>Suspense 바깥 콘텐츠는 즉시 전송됩니다.</li>
            <li>
              각 Suspense의 async 컴포넌트가 완료되면 해당 청크가 스트리밍됩니다.
            </li>
            <li>
              여러 Suspense 경계가{" "}
              <strong className="text-white">병렬로</strong> 데이터를 패치합니다
              (순차 아님).
            </li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">Network 탭에서 확인</p>
          <p>
            DevTools → Network → 이 페이지 요청 → Response 탭에서 HTML이 여러
            청크로 나뉘어 전달되는 것을 확인할 수 있습니다.
            <br />
            <code className="text-green-400">Transfer-Encoding: chunked</code>{" "}
            헤더도 확인해보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
