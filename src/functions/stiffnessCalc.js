import { reverse } from "lodash";

export function calculateInertia(width, depth) {
  return (1 / 12) * width * Math.pow(depth, 3);
}
export function calculateStiffness({ width, depth, length }) {
  return (4 * calculateInertia(width, depth)) / length;
}

export function printStiffness(args) {
  return `${Math.ceil(calculateStiffness(args))}E`;
}

export function calculateDF(stiffness) {
  const colStiffness = stiffness.find((f) => f.type === "column").sf;
  let beams = stiffness.filter((f) => f.type === "beam");

  function reducer(acc, curr, i) {
    let df = curr.sf;
    df /= 2 * colStiffness + curr.sf + (i === 0 ? 0 : beams[i - 1].sf);
    acc[curr.name] = df;
    return acc;
  }

  const leftToRight = beams.reduce(reducer, {});

  beams = reverse(beams).map((b) => ({
    ...b,
    name: b.name.split("").reverse().join(""),
  }));

  const rightToLeft = beams.reduce(reducer, {});

  return {
    ...leftToRight,
    ...rightToLeft,
  };
}
