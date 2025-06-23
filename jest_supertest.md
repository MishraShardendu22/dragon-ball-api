# Jest and Supertest Documentation

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Install Dependencies](#install-dependencies)
  - [Configure ESM (config.mjs)](#configure-esm-configmjs)
- [Jest Basics](#jest-basics)
  - [Writing Tests](#writing-tests)
  - [Running Tests](#running-tests)
  - [Common Commands](#common-commands)
- [Supertest Basics](#supertest-basics)
  - [Why Supertest](#why-supertest)
  - [Using Supertest with Express](#using-supertest-with-express)
  - [Example Tests](#example-tests)
- [Combining Jest and Supertest](#combining-jest-and-supertest)
- [Tips and Best Practices](#tips-and-best-practices)

## Prerequisites
- Node.js ≥ 14
- npm or yarn
- Project using ESM (`"type": "module"` in package.json) if using `.mjs`

## Setup

### Install Dependencies
```bash
npm install --save-dev jest supertest
# If using ESM, jest version ≥ 27
```

### Configure ESM (config.mjs)
Create `jest.config.mjs` at project root:
```js
// jest.config.mjs
export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js', '.mjs'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
};
```
Ensure `package.json` has:
```json
{
  "type": "module",
  "scripts": {
    "test": "jest"
  }
}
```
If using Babel or TypeScript, adjust `transform` accordingly.

## Jest Basics

### Writing Tests
- Test files: `*.test.js` or `*.spec.js` (or `.mjs` if ESM)
- Use `describe` and `it` or `test`.
- Use Jest matchers: `expect(value).toBe(...)`, etc.

Example:
```js
// sum.test.mjs
import { sum } from './sum.mjs';

describe('sum()', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

### Running Tests
```bash
npm test
# or
npx jest
```
Add flags:
- `--watch` for watch mode
- `--coverage` for coverage

### Common Commands
- `jest --clearCache`
- `jest --verbose`
- `jest path/to/file.test.mjs`

## Supertest Basics

### Why Supertest
- Simulate HTTP calls without starting server on port
- Test routes and middleware end-to-end

### Using Supertest with Express
Import and use:
```js
import request from 'supertest';
import app from './app.mjs';

describe('API Endpoints', () => {
  it('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});
```
No need `app.listen()`. `app` should export Express app instance.

### Example Tests
- `.get(path)`
- `.post(path).send(body)`
- `.set('Header', 'value')`
- `.query({ key: 'value' })`
- `.expect(status)` (optional with Jest)

Example:
```js
// user.test.mjs
import request from 'supertest';
import app from '../src/app.mjs';

describe('User API', () => {
  let token;
  beforeAll(async () => {
    // Obtain token if needed
    const res = await request(app)
      .post('/auth/login')
      .send({ user: 'admin', pass: 'secret' });
    token = res.body.token;
  });

  it('POST /users creates user', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test', email: 'test@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /users/:id returns user', async () => {
    const id = 1;
    const res = await request(app).get(f`/users/${id}`);
    expect([200, 404]).toContain(res.status);
  });
});
```

## Combining Jest and Supertest
- Use Jest for assertions, Supertest for HTTP simulation.
- Use `beforeAll`/`afterAll` for setup/teardown (e.g., DB connection).
- Clean up created data in tests.

## Tips and Best Practices
- Keep tests isolated: use test database or mocks.
- Avoid hard-coded ports: export `app` not server.
- Use environment variables for test config.
- Parallel tests: ensure independent data.
- Use `jest.mock` for unit tests; avoid in Supertest integration tests.
- Use `--runInBand` if DB conflicts occur.
