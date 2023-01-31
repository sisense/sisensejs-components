import { debounce, wait } from './utils';

jest.useFakeTimers();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('debounce', () => {
  const cb = jest.fn();
  const debouncedFunc = debounce(cb, 1000);

  test('fn called once, cb fires once', () => {
    debouncedFunc();

    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('fn called thrice, cb only fires once', () => {
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(cb).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('wait()', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('with no args', () => {
    wait();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
  });

  test('with arg 1000', () => {
    wait(1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
