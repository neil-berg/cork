export const capitalize = str => {
  const strArr = str.split(' ');
  const firstWord = strArr[0];
  const firstWordCap = firstWord.slice(0, 1).toUpperCase() + firstWord.slice(1);
  return [firstWordCap, ...strArr.slice(1)].join(' ');
};
