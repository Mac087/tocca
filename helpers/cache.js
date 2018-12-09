module.exports = (data, groupNum) => {
  const result = {};
  let counter = 1;

  while (data.length) {
    result[counter] = data.splice(0, groupNum);
    counter++;
  }
  return {
    data: result,
    totalGroups: Object.keys(result).length
  };
};