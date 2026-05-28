# 🎭 TrendJack — Playwright Test Suite

Automated test suite for [TrendJack](https://github.com/Felistian/TrendJack) — an AI-powered multi-agent ad campaign generator built with Python + Streamlit.

---

## 🤖 What is TrendJack?

TrendJack is a multi-agent AI system for advertising:

```
Researcher (Tavily) → Creator (Gemini) → Validator (Groq/Llama)
                                                    ↓
                              Human-in-the-Loop (Approve / Reject)
                                                    ↓
                                    SQLite Database + PDF Export
```

This repo contains the **Playwright + TypeScript** test suite that validates TrendJack's UI, pipeline flow, and Human-in-the-Loop decision system.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | UI + E2E test automation |
| TypeScript | Type-safe test code |
| Allure Report | Rich visual test reporting |
| GitHub Actions | CI/CD pipeline |

---

## 📁 Project Structure

```
trendjack-tests/
├── pages/
│   └── trendjack-page.ts     ← Page Object Model for TrendJack UI
├── tests/
│   ├── ui/
│   │   ├── ui.test.ts        ← UI tests (no API calls)
│   │   └── history.test.ts   ← Campaign History tests
│   └── e2e/
│       └── full-flow.test.ts ← Full pipeline tests (real API calls)
├── .env.example
├── playwright.config.ts
└── package.json
```

---

## ✅ Test Coverage

| Suite | Tests | Tags | API Calls |
|---|---|---|---|
| UI Tests | 5 | `@smoke` `@regression` | ❌ None |
| Campaign History | 4 | `@regression` | ❌ None |
| Full Pipeline Flow | 5 | `@e2e` | ✅ Tavily + Gemini + Groq |
| **Total** | **15** | | **100% passing** |

---

## 🏗️ Architecture

### Page Object Model
All UI interactions go through `TrendJackPage` — a single page object covering the full app:

```typescript
export class TrendJackPage {
    // Locators — all Streamlit data-testid based
    readonly keywordInput: Locator;
    readonly runButton: Locator;
    readonly approveButton: Locator;
    readonly rejectButton: Locator;
    // ...

    // Actions
    async runPipeline(keyword: string): Promise<void> { ... }
    async approve(): Promise<void> { ... }
    async reject(notes: string): Promise<void> { ... }

    // Verifications
    async verifyPipelineCompleted(): Promise<void> { ... }
    async verifyApproveSuccess(): Promise<void> { ... }
}
```

### Test Types

```
@smoke     → Critical UI checks — no API needed — fast
@regression → Full UI coverage — no API needed
@e2e       → Real API calls — Tavily + Gemini + Groq — run manually
```

---

## 🚦 Running Tests

### Prerequisites
```bash
# 1. TrendJack must be running
cd path/to/TrendJack
py -m streamlit run app.py

# 2. Install test dependencies
cd trendjack-tests
npm install
npx playwright install chromium
```

### Environment Setup
```bash
cp .env.example .env
# .env content:
# BASE_URL=http://localhost:8501
```

### Run by Tag
```bash
# Smoke tests — fastest
npm run test:smoke

# Regression tests — full UI coverage
npm run test:regression

# E2E tests — real API calls (requires TrendJack running)
npm run test:e2e

# All tests
npm test
```

### View Reports
```bash
# Allure report
npm run allure:generate
npm run allure:open
```

---

## 📊 Allure Report Structure

```
Behaviors
└── TrendJack
    ├── UI (6 tests)
    ├── Campaign History (4 tests)
    ├── Pipeline (2 tests)
    └── HITL (3 tests)
```

---

## 🔄 CI/CD

GitHub Actions runs `@smoke` and `@regression` tests on every push to `main`.

`@e2e` tests are excluded from CI — they call real paid APIs and depend on a running Streamlit instance.

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| [TrendJack](https://github.com/Felistian/TrendJack) | The AI agent being tested |
| [sauce-demo-playwright](https://github.com/Felistian/sauce-demo-playwright) | Playwright test suite for SauceDemo |

---

## 👨‍💻 Author

**Otniel Felistianto**
Lead SDET | 8+ years experience | AI Agentic Specialist
Built TrendJack + wrote the tests for it — full-stack SDET ownership.

---

*Part of a structured Playwright + TypeScript learning journey targeting Junior-Mid Remote Global SDET roles*