export const executeFunc = (func: Function, ...args: any[]) => {
  try {
    func && func(...args);
  } catch (e) {
    console.log('方法执行错误');
  }
};
