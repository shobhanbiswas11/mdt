const { printStiffness } = require("../stiffnessCalc");

it("should print the stiffness", () => {
  const st = printStiffness({
    depth: 500,
    length: 4500,
    width: 350,
  });

  expect(st).toEqual("3240740E");
});
