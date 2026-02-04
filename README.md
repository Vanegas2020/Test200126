# test

Automated testing suite for test using playwright.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## 📦 Installation

### Quick Setup (Recommended)

Choose the setup script for your operating system:

**Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows (Command Prompt):**
```cmd
setup.bat
```

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

### Manual Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure the following:

```bash
# Application URL
BASE_URL=http://localhost:3000

# Test Credentials (DO NOT use production credentials!)
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

⚠️ **Important:** Never commit the `.env` file to version control!

### Playwright Configuration

Edit `playwright.config.ts` to customize:

- **Browsers:** chromium, firefox, webkit
- **Base URL:** http://localhost:3000
- **Timeouts:** 30000ms (test), 5000ms (expect)
- **Screenshots:** On failure
- **Videos:** Disabled
- **Traces:** On first retry

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI Mode (interactive)
npm run test:ui

# Debug a specific test
npm run test:debug
```

### Advanced Commands

```bash
# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in parallel with custom workers
npx playwright test --workers=4
```

### Viewing Reports

```bash
# Show HTML report
npm run test:report

# Show trace viewer
npm run test:trace
```

## 📁 Project Structure

```
test/
├── tests/                  # Test files
│   └── *.spec.ts          # Test specifications
├── pages/                 # Page Object Models
│   ├── base.page.ts       # Base page class
│   └── *.page.ts          # Page-specific classes
├── fixtures/              # Test fixtures
│   └── *.fixture.ts       # Custom fixtures
├── utils/                 # Utility functions
│   └── helpers.ts         # Helper functions
├── data/                  # Test data
│   └── test-data.json     # Test data files
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
├── .env.example           # Environment variables template
└── README.md             # This file
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Open Playwright UI Mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Show HTML test report |
| `npm run test:trace` | Show trace viewer |
| `npm run codegen` | Open Playwright codegen |
| `npm run install:browsers` | Install Playwright browsers |
| `npm run install:all` | Install dependencies and browsers |


## 🐛 Troubleshooting

### Common Issues

**Issue: Browsers not installed**
```bash
npx playwright install
```

**Issue: Tests failing due to timeout**
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify BASE_URL is correct

**Issue: .env file not found**
```bash
cp .env.example .env
# Then edit .env with your values
```

**Issue: Permission denied on setup scripts**
```bash
chmod +x setup.sh  # Linux/macOS
```

### Debug Mode

Run tests in debug mode to step through:
```bash
npm run test:debug
```

Or use the Playwright Inspector:
```bash
PWDEBUG=1 npm test
```

### Viewing Traces

When a test fails, view the trace:
```bash
npx playwright show-trace trace.zip
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Guide](https://playwright.dev/docs/ci)

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Generated with:** [Automation Test Generator v2.1.0](https://github.com/Vanegas2020/automation-test-generator)

**Last Updated:** 2026-01-03
