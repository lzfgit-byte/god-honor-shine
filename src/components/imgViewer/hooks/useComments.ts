import { ref } from 'vue';
import type { Comment } from '@ghs/types';

export default () => {
  const drawerOpen = ref(false);
  const comments = ref<Comment[]>([]);
  const getDrawerContainer = () => document.getElementById('img-view-id');

  return { drawerOpen, comments, getDrawerContainer };
};
