import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const accountMock = getBankAccount(10);

    expect(accountMock.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const accountMock = getBankAccount(10);

    expect(() => accountMock.withdraw(20)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountMock = getBankAccount(10);
    const newAccountMock = getBankAccount(0);

    expect(() => accountMock.transfer(20, newAccountMock)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accountMock = getBankAccount(10);

    expect(() => accountMock.transfer(5, accountMock)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const accountMock = getBankAccount(10);

    accountMock.deposit(5);

    expect(accountMock.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const accountMock = getBankAccount(10);

    accountMock.withdraw(5);

    expect(accountMock.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const accountMock = getBankAccount(10);
    const newAccountMock = getBankAccount(0);

    accountMock.transfer(5, newAccountMock);

    expect(accountMock.getBalance()).toBe(5);
    expect(newAccountMock.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(10);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(25);

    const balance = await account.fetchBalance();

    expect(balance).toBe(25);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(25);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(25);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
