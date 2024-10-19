import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 3, b: 1, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 2, b: 3, action: 'invalid action', expected: null },
  { a: '5', b: 2, action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
];

const appropriateTestCases = (
  action: string,
): {
  a: number | string | boolean;
  b: number;
  action: string;
  expected: number | null;
}[] => {
  return filterTestCases(action);
};

const appropriateInvalidTestCases = (
  action: string,
): {
  a: number | string | boolean;
  b: number;
  action: string;
  expected: number | null;
}[] => {
  return filterTestCases(action, false);
};

const filterTestCases = (
  action: string,
  validCase = true,
): {
  a: number | string | boolean;
  b: number;
  action: string;
  expected: number | null;
}[] => {
  return testCases.filter((testCase) =>
    testCase.action === action && validCase
      ? testCase.expected
      : !testCase.expected,
  );
};

const testData = ({
  a,
  b,
  action,
  expected,
}: {
  a: number | string | boolean;
  b: number;
  action: string;
  expected: number | null;
}): void => {
  const result = simpleCalculator({ a, b, action });

  expect(result).toBe(expected);
};

describe('simpleCalculator', () => {
  test.each(appropriateTestCases(Action.Add))(
    'should add two numbers',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateTestCases(Action.Subtract))(
    'should subtract two numbers',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateTestCases(Action.Multiply))(
    'should multiply two numbers',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateTestCases(Action.Divide))(
    'should divide two numbers',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateTestCases(Action.Exponentiate))(
    'should exponentiate two numbers',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateTestCases('invalid action'))(
    'should return null for invalid action',
    (testCase) => {
      testData(testCase);
    },
  );

  test.each(appropriateInvalidTestCases(Action.Add))(
    'should return null for invalid arguments',
    (testCase) => {
      testData(testCase);
    },
  );
});
