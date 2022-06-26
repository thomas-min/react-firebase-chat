# React Firebase Chat

## 프로젝트 설명

### 사용 기술

- Typescript
- ReactJS
- ChakraUI
- Recoil
- Firebase
- Vite

### 다이렉토리 구조

```
- src
  - app : 공용 컴포넌트, 훅, 스토어, 타입, 상수, 유틸
  - features : 기능 별 컴포넌트, 훅, 스토어, 서비스
    - auth : 로그인
    - chat : 채팅
    - search : 유저 검색
  - routes : 페이지 컴포넌트
```

### 백엔드 & 배포

백엔드를 구현하기 위해 firestore 및 firebase auth를 사용했으며,
firebase에 서비스를 호스팅 했습니다

### ERD

![erd](erd.png 'erd')

Entity 관계는 subCollection으로 처리했으며, 쿼리 편의를 위해 간단한 역정규화를 적용했습니다.

## 구동 방법

### 세팅

1. 패키지 설치

```bash
npm install
```

2. API 키 업데이트

```bash
# .env sample
VITE_API_KEY = ''
VITE_AUTH_DOMAIN = ''
VITE_PROJECT_ID = ''
VITE_STORAGE_BUCKET = ''
VITE_MESSAGING_SENDER_ID = ''
VITE_APP_ID = ''
```

### 실행

1. Dev

```
npm run dev
```

2. Preview

```
npm run build && npm run preview
```

### 배포

```
npm install -g firebase

firebase login
firebase deploy
```
