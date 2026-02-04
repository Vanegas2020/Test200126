# Test Bank Generated Tests

This project includes tests automatically generated from a comprehensive test bank system.

## Test Statistics

- **Total Tests:** 20
- **Total Scenarios:** 20
- **Estimated Duration:** 52.50s

### By Testing Type

- **happy-path:** 4 tests
- **negative-testing:** 10 tests
- **edge-cases:** 6 tests

### By Priority

- **critical:** 3 tests
- **high:** 11 tests
- **medium:** 6 tests

## Running Tests

```bash
# Run all tests
npm test

# Run only happy-path tests
npm test -- --grep "happy-path"

# Run only critical priority tests
npm test -- --grep "critical"

# Run with UI mode
npm run test:ui
```

## Test Organization

Tests are organized by:
- **Page Type:** Authentication, Forms, Navigation, Search
- **Testing Type:** happy-path, negative-testing, edge-cases, boundary-analysis, equivalence-partitioning
- **Priority:** critical, high, medium, low

## Test Coverage

This project tests the following element types:
- **Autenticación:** 4 elements

## Extending Tests

To add more tests, update your page configuration in the wizard and regenerate the project.

---

Generated at: 2026-02-04T21:48:53.623Z
Framework: playwright
