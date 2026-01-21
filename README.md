# 빅스페이먼츠 과제

API 문서를 참고하여 사용자 회원가입, 로그인, 사용자 정보 표시, 글 등록/조회 하는 프론트엔드 과제 프로젝트입니다.

---

## 기술 스택

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Tanstank-Query**
- **Axios**
- **Zustand**

---

## 프로젝트 구조

```txt
src/
 ├ api/                    # API 요청 및 API 타입 정의
 │  ├ types/               # BaseResponse global 선언
 │  ├ auth/                # 인증 관련 api
 │  ├ posts/               # 게시글 관련 api
 │  ├ axios.ts             # axios 인스턴스 설정
 │  ├ getQueryClient.ts    # 서버/클라이언트 별 QueryClient 관리 함수
 │  └ serverFetch.ts       # 서버 컴포넌트에서 데이터 fetch 시 사용
 ├ app/                    # Next.js App Router
 │  ├ (protected)          # 인증된 경우만 접근 가능한 route
 │  ├ (public)             # 인증안됐을 경우 접근 가능한 route
 │  ├ @modal               # Modal용 route
 │  ├ api/                 # Next.js route handler
 │     └ auth/             # 로그인/토큰 재발급 시 쿠키에 접근 하기 위해 관련 route handler 작성
 │  └ globals.css          # 전역 CSS
 ├ assets/                 # 정적 자산
 ├ components/             # 컴포넌트
 │  ├ common/              # 공통 컴포넌트
 │  └ posts/               # 게시글 페이지 관련 컴포넌트
 ├ const/                  # 관련 상수 정의
 │  ├ query-key/           # Tanstank-Query query-key 정의
 │  ├ route.const.ts       # app router route path 정의
 │  └ url.const.ts         # baseUrl 정의
 ├ hooks/
    ├ auth/useAuth.tsx     # 인증 관련 훅
    ├ common/              # 공용 훅
    ├ mutations/           # Mutaion 관련 훅
    └ queries/             # Query 관련 훅
 ├ providers/
 │  └ QueryProvider.ts     # Tanstank-Query provider 정의
 ├ store/auth              # 인증 관련 store
 ├ utiles/                 # 유틸 함수
 └ proxy.ts                # 리프레시 토큰 기반 redirect proxy
```

---

## 라우팅

### 공개 라우트

- `/signin` [로그인] : app/(public)/signin/page.tsx
- `/signup` [회원가입] : app/(public)/signup/page.tsx

### 인증 라우트

- `/` [게시글 목록] : app/(protected)/page.tsx
- `/write` [게시글 작성] :
  - app/(protected)/page.tsx : 일반 페이지로 접근 시 redirect
  - app/@modal/(protected)/page.tsx : 작성 페이지 모달
- `/post/[id]` [게시글 조회] :
  - app/(protected)/post/[id]/page.tsx : 일반 페이지로 접근 시 redirect
  - app/@modal/(protected)/post/[id]/page.tsx : 게시글 상세 페이지 모달
- `/post/[id]/edit` [게시글 작성] :
  - app/(protected)/post/[id]/edit/page.tsx : 일반 페이지로 접근 시 redirect
  - app/@modal/(protected)/post/[id]/edit/page.tsx : 게시글 수정 페이지 모달

---

## 주요 기능

### 인증

- 회원가입 / 로그인
- JWT 토큰 기반 인증 처리
- Access Token 만료 시 Refresh Token을 통한 재발급
- 인증 상태에 따른 라우트 보호(Guard) 처리

### 상태관리

- Tanstank Query 및 Zustand 사용
- Tanstank Query 로 서버 상태 관리 및 서버 컴포넌트 prefetch data
- Zustand persist store 사용 및 accessToken 관리

### 게시글

- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 작성
- 게시글 삭제

### UI / UX

- Tailwind CSS 기반 반응형 UI
- 게시글 작성,수정,상세 페이지 우측에서 등장하는 모달 식으로 구현

---

## 주요 구현 사항

---

## 시작하기

```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
NEXT_PUBLIC_API_ROUTE_URL=/api
```

AND

```bash
npm run install
npm run dev
```

<!--
To-Do

삭제 혹은 수정 시
onMutate 사용하여 낙관적 업데이트 적용
 -->
