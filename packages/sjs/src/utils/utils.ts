export function debounce(
  wrappedFunction: (...args: any) => any,
  delay: number,
) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      wrappedFunction.apply(this, args);
    }, delay);
  };
}

export function wait(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
