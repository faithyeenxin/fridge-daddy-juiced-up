type FunctionType = (...args: any[]) => any;

export function debounce(
  func: FunctionType,
  wait: number,
  immediate?: boolean
): FunctionType {
  let timeout: NodeJS.Timeout | undefined;

  return function executedFunction(this: any, ...args: any[]) {
    const context = this;

    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
