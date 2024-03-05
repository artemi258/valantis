export const withoutDuplicates = (items) => {
  return items.result.reduce((arr, obj) => {
    if (arr.find((elem) => elem.id === obj.id)) {
      return arr;
    }
    return [...arr, obj];
  }, []);
};
