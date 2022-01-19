export const genId = (function (): () => number {
  let id = 0;

  return (): number => (id += 1);
})();
