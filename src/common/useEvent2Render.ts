import bus from '@/utils/bus';
const funcs: Record<string, any> = {};
bus.on('emit2render', (event: any) => {
  funcs[event] && funcs[event]();
});
export default (e: string, func: () => void) => {
  funcs[e] = func;
};
