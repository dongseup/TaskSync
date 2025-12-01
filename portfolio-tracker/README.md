# Portfolio Tracker

포트폴리오 프로젝트를 관리하고 이슈를 추적하는 모노레포 프로젝트입니다.

## 🏗️ 프로젝트 구조

이 프로젝트는 [Turborepo](https://turbo.build/)를 사용한 모노레포 구조입니다.

```
portfolio-tracker/
├── apps/
│   ├── api/          # NestJS 백엔드 API 서버
│   ├── web/          # Next.js 프론트엔드 애플리케이션
│   └── docs/         # Next.js 문서 사이트
├── packages/
│   ├── ui/           # 공유 UI 컴포넌트
│   ├── eslint-config/    # 공유 ESLint 설정
│   └── typescript-config/ # 공유 TypeScript 설정
└── turbo.json        # Turborepo 설정
```

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18
- npm >= 11.6.2

### 설치

```bash
# 루트 디렉토리에서 의존성 설치
npm install
```

### 환경 변수 설정

#### API 서버 (`apps/api`)

`apps/api/.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# Supabase 데이터베이스 연결
DATABASE_URL="postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-northeast-2.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres"
```

> **참고:** `DATABASE_URL`은 마이그레이션용 직접 연결(5432 포트), `DIRECT_URL`은 앱 실행용 Connection Pooler(6543 포트)입니다.

### 데이터베이스 마이그레이션

```bash
cd apps/api
npx prisma migrate dev
```

### 개발 서버 실행

```bash
# 모든 앱 동시 실행
npm run dev

# 특정 앱만 실행
cd apps/api && npm run start:dev
cd apps/web && npm run dev
```

## 📦 주요 기술 스택

### Backend (`apps/api`)
- **NestJS** 11.0 - Node.js 프레임워크
- **Prisma** 6.0 - ORM (Supabase 권장 버전)
- **PostgreSQL** - Supabase 데이터베이스
- **TypeScript** 5.7

### Frontend (`apps/web`)
- **Next.js** 16.0 - React 프레임워크
- **React** 19.2
- **TypeScript** 5.9

### 공유 패키지
- `@repo/ui` - 재사용 가능한 UI 컴포넌트
- `@repo/eslint-config` - 공유 ESLint 설정
- `@repo/typescript-config` - 공유 TypeScript 설정

## 🗄️ 데이터베이스 스키마

### 주요 모델

- **User** - 사용자 정보
- **Project** - 프로젝트
- **Issue** - 이슈/할 일 (칸반 보드용)
- **Comment** - 댓글

### 이슈 상태 (Status)
- `TODO` - 할 일
- `IN_PROGRESS` - 진행 중
- `DONE` - 완료

### 우선순위 (Priority)
- `LOW` - 낮음
- `MEDIUM` - 보통
- `HIGH` - 높음
- `URGENT` - 긴급

## 📜 사용 가능한 스크립트

### 루트 레벨

```bash
npm run dev          # 모든 앱 개발 모드 실행
npm run build        # 모든 앱 빌드
npm run lint         # 모든 앱 린트 검사
npm run format       # 코드 포맷팅
npm run check-types  # 타입 체크
```

### API 서버 (`apps/api`)

```bash
npm run start:dev    # 개발 모드 실행
npm run build        # 빌드
npm run start:prod   # 프로덕션 모드 실행
npm run test         # 테스트 실행
```

### 웹 앱 (`apps/web`)

```bash
npm run dev          # 개발 서버 실행 (포트 3000)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
```

## 🔧 개발 가이드

### Prisma 사용

```bash
cd apps/api

# 스키마 변경 후 마이그레이션 생성
npx prisma migrate dev --name migration_name

# Prisma Client 재생성
npx prisma generate

# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio
```

### 코드 스타일

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **TypeScript** - 타입 안정성

## 📝 라이선스

UNLICENSED

