export const getUUID = (() => {
  let num = 0;
  return (prefix = "") => {
    num += 1;
    const value = num < 10 ? `0${num}` : num;
    return `${prefix}${value.toString()}`;
  };
})();
