// Server Component
// 서버→클라이언트 Composition 패턴을 보여줍니다.

// 매 요청마다 서버에서 렌더링 (fetchedAt 타임스탬프 변화를 확인하기 위해)
export const dynamic = "force-dynamic";

import { ClientIsland } from "./_components/ClientIsland";

interface User {
  id: number;
  name: string;
  role: string;
}

async function fetchUser(): Promise<User> {
  // 서버에서만 실행되는 데이터 패치 로직
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { id: 42, name: "Kim Joo", role: "developer" };
}

// children으로 전달될 순수 서버 컴포넌트
function ServerNote() {
  return (
    <div className="border border-blue-800 rounded p-3 bg-blue-950">
      <span className="text-xs font-bold bg-blue-700 text-blue-100 px-2 py-0.5 rounded mr-2">
        SERVER
      </span>
      <span className="text-blue-200 text-sm">
        이 ServerNote는 Server Component입니다. ClientIsland의{" "}
        <code>children</code>으로 전달됩니다.
        ClientIsland의 state가 바뀌어도 이 컴포넌트는 재실행되지 않습니다.
      </span>
    </div>
  );
}

export default async function CompositionPage() {
  // 서버에서 데이터를 패치
  const user = await fetchUser();
  const fetchedAt = new Date().toISOString();

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-1">4. Composition</h1>
      <p className="text-gray-400 text-sm mb-6">
        서버 컴포넌트가 데이터를 패치하고 클라이언트 컴포넌트에 props로
        전달하는 패턴.
        <br />
        그리고 클라이언트 컴포넌트의{" "}
        <code className="text-amber-400">children</code>으로 서버 컴포넌트를
        삽입하는 패턴.
      </p>

      {/* Server Component가 ClientIsland를 감싸고 있음 */}
      <div className="border border-blue-700 rounded-lg p-5 bg-blue-950 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-blue-700 text-blue-100 px-2 py-0.5 rounded">
            SERVER
          </span>
          <code className="text-blue-300 text-xs">
            app/4-composition/page.tsx
          </code>
        </div>
        <p className="text-blue-200 text-sm mb-4">
          서버에서 user 데이터 패치 완료 (
          <code className="text-blue-400">
            {fetchedAt.split("T")[1].slice(0, 12)}
          </code>
          ) → ClientIsland에 props로 전달:
        </p>

        <ClientIsland user={user} fetchedAt={fetchedAt}>
          {/* 패턴 2: Server Component를 children으로 전달 */}
          <ServerNote />
        </ClientIsland>
      </div>

      <div className="space-y-3 text-sm text-gray-400">
        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">
            패턴 1: Server → Client props
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>서버에서 데이터를 패치하고 직렬화 가능한 값을 props로 전달</li>
            <li>
              함수, 클래스 인스턴스, <code>Date</code> 객체 등은 전달 불가
              (직렬화 불가)
            </li>
            <li>클라이언트 번들에 데이터 패치 로직이 포함되지 않음</li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded p-4 bg-gray-900">
          <p className="text-gray-300 font-semibold mb-2">
            패턴 2: Server Component as children
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Client Component는 <code>children</code>으로 Server Component를
              받을 수 있음
            </li>
            <li>
              Client Component가 state 변경으로 리렌더링되어도{" "}
              <code>children</code> (서버)은 영향 없음
            </li>
            <li>서버 컴포넌트는 이미 서버에서 렌더링된 결과로만 존재</li>
            <li>
              반대로 Client Component 안에서 직접 Server Component를{" "}
              <strong className="text-white">import하는 것은 불가</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
