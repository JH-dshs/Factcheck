# 민주팩트체크 🔍

Google Gemini AI + 구글 검색 기반 실시간 팩트체크 웹사이트입니다.

---

## 🚀 Vercel로 배포하기 (무료, 5분 완성)

### 1단계: Gemini API 키 발급 (완전 무료)

1. https://aistudio.google.com 접속 (구글 계정으로 로그인)
2. `Get API key` → `Create API key` 클릭
3. 발급된 키 복사 (AIza...로 시작)

**무료 한도**: 하루 1,500회, 분당 15회 — 개인 사용에 충분해요

### 2단계: GitHub에 올리기

1. https://github.com 가입 → `New repository` → 이름: `minju-factcheck`
2. ZIP 압축 풀고 파일 전체 업로드

### 3단계: Vercel 배포

1. https://vercel.com → `Sign up with GitHub`
2. `Add New → Project` → GitHub repo 선택
3. **Environment Variables** 에서 추가:
   - 이름: `GEMINI_API_KEY`
   - 값: 복사한 API 키 (AIza...)
4. `Deploy` 클릭 → 완료!

---

## 💻 로컬 실행

```bash
npm install
# .env.local 파일 생성 후 아래 내용 입력:
# GEMINI_API_KEY=AIza...여기에키입력
npm run dev
# → http://localhost:3000
```

---

## 💰 비용

- **Vercel 호스팅**: 무료
- **Gemini API**: **완전 무료** (하루 1,500회 한도)

---

## 📁 파일 구조

```
minju-factcheck/
├── pages/
│   ├── index.jsx        # 메인 UI
│   └── api/
│       └── check.js     # Gemini API 프록시 (키 보안)
├── package.json
└── README.md
```
