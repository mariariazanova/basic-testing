import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callbackMock = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callbackMock, timeout);

    jest.advanceTimersByTime(timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callbackMock, timeout);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callbackMock = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callbackMock, timeout);
    jest.advanceTimersByTime(1500);

    expect(callbackMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    const callbackMock = jest.fn();
    const interval = 1000;

    doStuffByInterval(callbackMock, interval);

    jest.advanceTimersByTime(interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(callbackMock, interval);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackMock = jest.fn();
    const interval = 1000;

    doStuffByInterval(callbackMock, interval);
    jest.advanceTimersByTime(3000);

    expect(callbackMock).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));
jest.mock('path', () => ({
  join: jest.fn(() => '/mocked/path/to/file'),
}));

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';
  const contentMock = 'file content';

  test('should call join with pathToFile', async () => {
    (<jest.Mock>existsSync).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (<jest.Mock>existsSync).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (<jest.Mock>existsSync).mockReturnValue(true);
    (<jest.Mock>readFile).mockResolvedValue(Buffer.from(contentMock));

    const result = await readFileAsynchronously('existingFile.txt');

    expect(result).toBe(contentMock);
  });
});
