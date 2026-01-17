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
 ├ app/                    # Next.js App Router
 │  ├ layout.tsx           # 루트 레이아웃
 │  ├ page.tsx             # 홈 페이지
 │  ├ globals.css          # 전역 CSS
 ├ api/                    # API 요청 및 API 타입 정의
 │  ├ types/               # BaseResponse global 선언
 │  └ axios.ts             # axios 인스턴스 설정
 │  └ getQueryClient.ts    # 서버/클라이언트 별 QueryClient 관리 함수
 ├ assets/                 # 정적 자산
 ├ components/             # 컴포넌트
 │  └ common/              # 공통 컴포넌트
 ├ const/                  # 관련 상수 정의
 │  └ query-key/           # Tanstank-Query query-key 정의
 ├ hooks/                         
 │  └ queries/             # Query 훅
  ├ providers/                         
 │  └ QueryProvider.ts     # Tanstank-Query provider 정의
 └ utiles/                 # 유틸 함수
```

---

## 주요 기능

---

## 시작하기


```bash
npm run install
npm run dev
```
---

## 라우팅

- `/` - /app/page.tsx 

---

## 주요 구현 사항


