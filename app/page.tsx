import Link from "next/link";

const demos = [
  {
    href: "/1-server",
    title: "1. Server Component",
    description:
      "기본 서버 컴포넌트. async/await, 서버 전용 리소스 접근. console.log가 터미널에 출력됨.",
    badge: "SERVER",
  },
  {
    href: "/2-client",
    title: "2. Client Component",
    description:
      '"use client" 지시어. useState/useEffect, 브라우저 API 접근, 하이드레이션 타이밍 확인.',
    badge: "CLIENT",
  },
  {
    href: "/3-streaming",
    title: "3. Streaming",
    description:
      "Suspense + 느린 비동기 서버 컴포넌트. HTML이 준비되는 순서대로 스트리밍됨.",
    badge: "SUSPENSE",
  },
  {
    href: "/4-composition",
    title: "4. Composition",
    description:
      "서버가 데이터 패치 후 클라이언트에 props로 전달. children으로 서버 컴포넌트 삽입.",
    badge: "SERVER + CLIENT",
  },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">RSC Learning Lab</h1>
      <p className="text-gray-400 mb-8 text-sm">
        React Server Components 동작 원리를 코드 레벨에서 확인합니다.
      </p>

      <div className="grid gap-3 mb-10">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="block border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-colors bg-gray-900 hover:bg-gray-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-white font-semibold mb-1">{demo.title}</h2>
                <p className="text-gray-400 text-sm">{demo.description}</p>
              </div>
              <span className="text-xs border border-gray-700 rounded px-2 py-1 text-gray-500 whitespace-nowrap shrink-0">
                {demo.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="border border-gray-800 rounded-lg p-5 bg-gray-900">
        <h2 className="text-gray-300 font-semibold mb-3 text-sm">핵심 규칙</h2>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>
            <span className="text-blue-400">Server Component</span> — 기본값.
            서버에서만 실행. async 가능. useState/useEffect 불가.
          </li>
          <li>
            <span className="text-amber-400">Client Component</span> —{" "}
            <code>&quot;use client&quot;</code> 필요. 서버(SSR) + 클라이언트
            양쪽 실행. 인터랙션 처리.
          </li>
          <li>
            <span className="text-gray-500">데이터 흐름</span> — 서버 →
            클라이언트 방향만. 클라이언트 state는 서버 컴포넌트로 못 올림.
          </li>
          <li>
            <span className="text-gray-500">직렬화</span> — 서버→클라이언트
            props는 직렬화 가능해야 함. 함수, 클래스 인스턴스 전달 불가.
          </li>
        </ul>
      </div>
    </div>
  );
}
