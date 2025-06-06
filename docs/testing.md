
# Testing Strategy

## Overview
This project implements a comprehensive testing strategy including unit tests, integration tests, and end-to-end (E2E) tests.

## Test Types

### Unit Tests
- **Framework**: Vitest + React Testing Library
- **Location**: `src/components/**/__tests__/`
- **Purpose**: Test individual components in isolation
- **Coverage**: All UI components, hooks, and utilities

### Integration Tests
- **Framework**: Vitest + React Testing Library
- **Purpose**: Test component interactions and data flow
- **Coverage**: Form submissions, user workflows, API interactions

### End-to-End Tests
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Purpose**: Test complete user workflows
- **Coverage**: Navigation, forms, authentication flows

## Running Tests

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run specific test file
npx playwright test navigation.spec.ts
```

## Writing Tests

### Unit Test Guidelines
1. Test component rendering
2. Test user interactions
3. Test prop variations
4. Test error states
5. Mock external dependencies

### E2E Test Guidelines
1. Test complete user workflows
2. Test cross-browser compatibility
3. Test responsive design
4. Test critical business flows
5. Keep tests independent and isolated

## Coverage Requirements
- Minimum 70% coverage for branches, functions, lines, and statements
- Critical components should have near 100% coverage
- All new features must include tests

## CI/CD Integration
- Tests run automatically on every push and PR
- Deployment blocked if tests fail
- Coverage reports uploaded to Codecov
- E2E tests run in multiple browsers

## Test Data Management
- Use factories for test data creation
- Mock external services and APIs
- Clean up test data after each test
- Use test-specific database for integration tests
