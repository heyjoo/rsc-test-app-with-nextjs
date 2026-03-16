# RSC Learning Lab

React Server Components 동작 원리를 코드 레벨에서 확인하기 위한 Next.js 데모.

## 실행

```bash
npm run dev
```

## 데모 페이지

| 경로 | 내용 |
|------|------|
| `/1-server` | Server Component — async/await, 서버 전용 환경, 터미널 로그 |
| `/2-client` | Client Component — `"use client"`, 하이드레이션 타이밍 |
| `/3-streaming` | Streaming — Suspense + 비동기 서버 컴포넌트 |
| `/4-composition` | Composition — 서버→클라이언트 props 전달, children 패턴 |

## 색상 규칙

- 파란색 박스 → Server Component
- 주황색 박스 → Client Component
