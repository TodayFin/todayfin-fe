## 📚 프로젝트 소개

사용자에게 뉴스 요약 및 분석, 금융 정보를 제공하는 SNS 서비스입니다.
뉴스 및 금융 데이터 API와 통합되어 사용자 맞춤형 정보를 제공합니다.

### 주요 기능
- 최신 뉴스 요약 제공
- 금융 정보 시각화 및 분석
- 사용자 맞춤형 추천 기능
- 뉴스 및 금융 정보를 공유하고 토론할 수 있는 SNS 기능

## 💻 개발 환경

### 필수 개발 도구 및 버전
- **Node.js**: 버전 22
- **Next.js**: 버전 14
- **NPM**: 의존성 관리를 위해 사용

## 🤝 의존성 설치

프로젝트의 의존성은 `npm`을 통해 관리됩니다. 다음 명령어로 필요한 패키지를 설치할 수 있습니다:

```bash
npm install
```

의존성 리스트는 `package.json` 파일에 정의되어 있습니다.

## ⚙️ 환경 변수 설정

환경 변수는 프로젝트 루트 폴더에 위치한 `.env.local` 파일에서 관리됩니다. 다음과 같은 환경 변수를 설정할 수 있습니다:

```plaintext
ALPHA_VANTAGE_API_KEY=demo
HUGGINGFACE_API_KEY=demo
```

## ➡️ 빌드 및 실행

```bash
npm run dev
```

개발 서버를 시작하고, 코드 변경 시 자동으로 리로드되는 명령어입니다.

## 🗂️ 폴더 구조

```
src/
  ├── app/
  │   ├── layout.js
  │   └── page.js
  ├── news/
  │   └── page.js
  ├── stock/
  │   └── page.js
  ├── coin/
  │   └── page.js
  ├── components/
  │   ├── news/
  │   ├── stock/
  │   ├── coin/
  │   └── layout/
  ├── hooks/
  ├── pages/
  │   └── api/
  ├── store/
  ├── styles/
  │   └── globals.css
  └── utils/
```

- **`app/`**: 주요 애플리케이션 페이지와 레이아웃 파일이 포함됩니다.
- **`components/`**: 공통 컴포넌트와 레이아웃 관련 파일들이 포함됩니다.
- **`hooks/`**: 커스텀 React 훅이 포함됩니다.
- **`pages/`**: API 라우트와 기타 페이지 관련 파일들이 포함됩니다.
- **`store/`**: 상태 관리 관련 파일들이 포함됩니다.
- **`styles/`**: 전역 스타일 파일이 포함됩니다.
- **`utils/`**: 유틸리티 함수들이 포함됩니다.
