import { createDefaultPreset } from 'ts-jest';

const { transform } = createDefaultPreset();

export default {
  testEnvironment: 'node',
  transform,
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/tests/**'],
  detectOpenHandles: true,
  forceExit: true,
  testTimeout: 20000,
};
