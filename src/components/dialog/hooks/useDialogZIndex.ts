const zIndex = ref(2000);
export default () => {
  return { getZIndex: () => zIndex.value, nextIndex: () => ++zIndex.value };
};
