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
- 인증 상태에 따른 라우트 보호 처리

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

### 로그인 및 인증

- **JWT 토큰 기반 인증**:
  - `accessToken, refreshToken` 쿠키에 저장
  - 페이지 로드 시 (protected)/layout.tsx 에서 accessToken 값 확인
  - Protected.tsx 컴포넌트에서 hydrated 여부 체크 및 Zustand store에 accessToken 세팅
  - `app/api/auth` - 서버 쿠키에 접근하기위해 Next.js route handler 활용
    - 로그인 시 app/api/auth/signin/route.ts 를 통해 Next.js 서버에서 백엔드에 로그인 요청 및 쿠키 저장 및 토큰 리턴
- **라우트 보호**:
  - `proxt.ts` - refresh 토큰 기반 `PUBLIC_ROUTES`,`PROTECTED_ROUTES` 에 따라 페이지 리다이렉트
  - `(protected)/layout.tsx` - accessToken 없을 경우 checkToken 함수 실행 후 에러 시 로그인 페이지 리다이렉트

- **API / Axios**:
  - api 요청 시 header Authorization 토큰 주입
  - 토큰이 없거나 401 에러 발생 시 리프레시 토큰 체크 및 토큰 재발급 후 api 재요청
  - api 재요청도 실패하며 401,403 에러 시 로그아웃 처리 및 페이지 리다이렉트
  - 토큰 재발급 실패 시 로그아웃 및 로그인 페이지 리다이렉트 처리
  - 토큰 재발급 api 요청의 경우 실패 시 인터셉터에 걸려 재요청하지 않기 위해 `http` 인스턴스가 아닌 일반 `axios` 사용하여 요청
  - BaseResponse,EndPoint,RequestParams 등 API 관련 타입 정의
  - Vecel 배포 후 토큰 재발급 요청 시 CORS 에러를 회피하기 위해 proxy 적용
    - Axios 인스턴스 생성 시 baseUrl을 적용하지 않고 request interceptors 에서 url 세팅

### 상태 관리

- **서버 상태**:
  - Tanstack Query를 사용하여 서버 데이터 상태 관리 및 쿼리 키 정의 후 캐시 관리
  - 글 상세 조회 시 글 목록의 데이터를 활용하여 title, catecory, createdAt 정보 미리 랜더링
  - 서버 컴포넌트에서의 데이터 페칭을 위해 serverFetch.ts 정의
  - 서버 컴포넌트에서 데이터 prefetch 및 HydrationBoundary 활용하여 미리 데이터 요청
    - 글 목록 페이지 : 글 목록 및 카테고리 prefetch
    - 글 상세 페이지 : 게시글 상세 prefetch
  - 글 수정/삭제 시 Mutation - onMutate 사용하여 optimistic update 적용
    - 요청 실패 시 이전 데이터값을 전달하여 데이터 복원
    - 성공 시 데이터 갱신 및 해당 글로 페이지 이동 처리

- **클라이언트 상태**:
  - Zustand 를 사용하여 전역 상태 관리
  - 쿠키로 전달 받은 `accessToken` 저장
  - `hasHydrated` : 스토어의 hydration 여부 관리
  - 상태와 액션을 분리하여 저장
    - 상태 값 사용 시 `useAuthStore` 호출
    - 액션 사용 시 `useAuthActions` 호출

### 화면 구현

- 게시글 목록 IntersectionObserver, Infinite Query 기반 페이지네이션 구현
- 게시글 수정 시 작성 폼과 동일 컴포넌트 활용하여 재사용
- react-hook-form을 활용한 입력 필드 검증 및 필드 에러 시 에러 필드 UI 적용
- 게시글 조회,작성,수정 페이지 Modal Route (@modal) 활용 하여 Modal 형태로 구현
  - 모달이 열렸을 경우 글 목록의 스크롤 비활성화 처리
  - 사용자가 url 직접 입력으로 접근할 경우 리다이렉트
- 스켈레톤 UI 적용
  - 글 목록 첫 조회 시
  - 글 목록 다음 페이지 조회 시
  - 글 상세 내용 조회 시

---

## 실행 방법

.env.local 생성

```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url (과제 백엔드 서버 url을 입력해주세요)
NEXT_PUBLIC_API_ROUTE_URL=/api
```

AND

```bash
npm inatll
npm run dev
```

## 배포 링크

<https://bix-jet.vercel.app/>
