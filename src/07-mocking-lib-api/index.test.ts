import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => {
    return (args: string) => fn(args);
  }),
}));

jest.mock('axios', () => ({
  create: jest.fn(),
}));

const axiosMock = <jest.Mocked<typeof axios>>axios;
const baseURL = 'https://jsonplaceholder.typicode.com';
const pathMock = '/path';
const responseMock = { data: 'mock data' };

const axiosInstanceMock = {
  get: jest.fn(),
};

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    axiosMock.create.mockReturnValue(
      <AxiosInstance>(<unknown>axiosInstanceMock),
    );
    axiosInstanceMock.get.mockResolvedValue(responseMock);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(pathMock);

    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(pathMock);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axiosInstanceMock.get).toHaveBeenCalledWith(pathMock);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(pathMock);

    expect(result).toBe(responseMock.data);
  });
});
