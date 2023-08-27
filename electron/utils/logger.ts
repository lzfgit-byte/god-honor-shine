export const logger = {
  enable: false,
  log: (...args) => {
    logger.enable && console.log(...args);
  },
};
