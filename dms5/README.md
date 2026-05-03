# Wando React App

React + Vite + TypeScript 기반 웹앱입니다.

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run typecheck
npm run build
```

## 주요 구조

- `src/main.tsx`: React 앱 진입점
- `src/app/App.tsx`: 앱 화면 전환과 최상위 상태 관리
- `src/app/components`: 화면 컴포넌트와 공용 UI 컴포넌트
- `src/app/types.ts`: 앱에서 공유하는 타입
- `src/imports`: 화면에서 사용하는 이미지 에셋
- `src/styles`: Tailwind, 테마, 전역 스타일
