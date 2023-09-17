import { ref } from 'vue';

export default () => {
  const activeName = ref('');
  return { activeName };
};
