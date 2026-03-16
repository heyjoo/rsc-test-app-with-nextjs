// Server Component — "use client" 없음
// async 함수로 지연된 데이터를 시뮬레이션합니다.

interface Props {
  label: string;
  delay: number;
  itemCount: number;
  color: "teal" | "green";
}

async function fetchWithDelay(delay: number, count: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: `항목 ${i + 1}`,
  }));
}

export async function SlowServerData({ label, delay, itemCount, color }: Props) {
  const data = await fetchWithDelay(delay, itemCount);
  const resolvedAt = new Date().toISOString();

  const styles = {
    teal: {
      border: "border-teal-700",
      bg: "bg-teal-950",
      badge: "bg-teal-700 text-teal-100",
      label: "text-teal-400",
      item: "text-teal-100",
    },
    green: {
      border: "border-green-700",
      bg: "bg-green-950",
      badge: "bg-green-700 text-green-100",
      label: "text-green-400",
      item: "text-green-100",
    },
  };

  const s = styles[color];

  return (
    <div className={`border ${s.border} rounded-lg p-4 ${s.bg}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold ${s.badge} px-2 py-0.5 rounded`}>
          SERVER
        </span>
        <span className={`${s.label} text-xs`}>
          {label} — {delay}ms 후 완료 at{" "}
          {resolvedAt.split("T")[1].slice(0, 12)}
        </span>
      </div>
      <ul className="space-y-1">
        {data.map((item) => (
          <li key={item.id} className={`text-sm ${s.item}`}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
