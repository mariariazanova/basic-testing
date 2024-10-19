import { simpleCalculator, Action } from './index';

const baseInputMock = { a: 4, b: 2, action: undefined };

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const inputMock = { ...baseInputMock, action: Action.Add };

    expect(simpleCalculator(inputMock)).toBe(6);
  });

  test('should subtract two numbers', () => {
    const inputMock = { ...baseInputMock, action: Action.Subtract };

    expect(simpleCalculator(inputMock)).toBe(2);
  });

  test('should multiply two numbers', () => {
    const inputMock = { ...baseInputMock, action: Action.Multiply };

    expect(simpleCalculator(inputMock)).toBe(8);
  });

  test('should divide two numbers', () => {
    const inputMock = { ...baseInputMock, action: Action.Divide };

    expect(simpleCalculator(inputMock)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const inputMock = { ...baseInputMock, action: Action.Exponentiate };

    expect(simpleCalculator(inputMock)).toBe(16);
  });

  test('should return null for invalid action', () => {
    const inputMock = { ...baseInputMock, action: 'invalid action' };

    expect(simpleCalculator(inputMock)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const inputMock = { ...baseInputMock, a: '1', action: Action.Add };

    expect(simpleCalculator(inputMock)).toBeNull();
  });
});
