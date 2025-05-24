import { describe, it, expect } from 'vitest';
import { formatGreeting } from './utils';

describe('formatGreeting', () => {
  it('should return a greeting with the provided name', () => {
    expect(formatGreeting('World')).toBe('Hello, World!');
  });

  it('should return a greeting with an empty string if name is empty', () => {
    expect(formatGreeting('')).toBe('Hello, !');
  });

  it('should handle names with spaces', () => {
    expect(formatGreeting('John Doe')).toBe('Hello, John Doe!');
  });
});
