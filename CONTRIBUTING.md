# Contributing to KC Import and Export Platform

Thank you for your interest in contributing to the KC Import and Export B2B web application.

---

## 🛠️ Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kc-import-export.git
   cd kc-import-export
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your free Groq API key from [https://console.groq.com](https://console.groq.com).

4. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## 🧪 Quality Standards & Verification

Before submitting pull requests or pushing code, ensure that all static checks pass with **0 errors**:

```bash
# 1. Type check
npm run type-check

# 2. Lint check
npm run lint

# 3. Production build
npm run build
```

### Guidelines:
- **Icons**: Use [Lucide React](https://lucide.dev) icons only. No system or OS emojis.
- **Styling**: Tailwind CSS with curated brand palette (Primary `#1B3A6B`, Accent `#F5A623`, Background `#F8F9FA`).
- **Security**: Never expose API keys in client-side code or public components. All AI and external requests must go through server-side route handlers in `app/api/*`.
- **Accessibility**: Ensure high contrast, keyboard navigation, and `prefers-reduced-motion` compliance.

---

## 🚀 Pull Request Process

1. Create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit your changes with conventional commit messages (`feat: ...`, `fix: ...`).
3. Push to your branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request detailing the changes and verification steps.
