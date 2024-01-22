export const waitTime = (during = 200): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, during);
  });
};
