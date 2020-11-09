import { chain, chunk, flattenDeep, slice } from "lodash";

function addArr(arr) {
  return arr.reduce((acc, curr) => acc + parseFloat(curr), 0);
}

export function balance(row, dfs) {
  row = chunk([0, ...row, 0], 2);
  dfs = chunk([0, ...dfs, 0], 2);

  const newRow = [];

  row.forEach((col, i) => {
    const leftDf = dfs[i][0];
    const rightDf = dfs[i][1];

    const leftMoment = leftDf * addArr(col) * -1;
    const rightMoment = rightDf * addArr(col) * -1;

    newRow.push([leftMoment, rightMoment]);
  });

  return slice(flattenDeep(newRow), 1, flattenDeep(newRow).length - 1);
}

export function carryOver(row) {
  function calc(pair) {
    const left = pair[0];
    const right = pair[1];

    return [right / 2, left / 2];
  }

  return chain(row).chunk(2).map(calc).flatMapDeep().value();
}
