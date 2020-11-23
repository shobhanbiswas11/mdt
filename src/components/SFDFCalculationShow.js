import React from "react";
import {
  calculateDF,
  calculateInertia,
  calculateStiffness,
} from "../functions/stiffnessCalc";
import "./SFDFCalculationShow.scss";

export default function SFDFCalculationShow({ inputs, beamLengths }) {
  inputs = inputs.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});

  let stiffness = beamLengths.map((beam, i) => {
    return {
      ...beam,
      name: String.fromCharCode(65 + i) + String.fromCharCode(65 + i + 1),
      sf: calculateStiffness({
        width: inputs["beam-width"],
        length: beam.value,
        depth: inputs["beam-depth"],
      }),
      type: "beam",
    };
  });

  stiffness = [
    {
      id: "col",
      type: "column",
      name: "Column",
      sf: calculateStiffness({
        width: inputs["col-width"],
        length: inputs["floor-height"],
        depth: inputs["col-depth"],
      }),
    },
    ...stiffness,
  ];

  const dfs = calculateDF(stiffness);

  return (
    <>
      <div className="show-set">
        <h2 className="heading">Moment of Inertia</h2>
        <div>
          <div className="group">
            <div className="title">Beam</div>
            <div>
              {calculateInertia(
                inputs["beam-width"],
                inputs["beam-depth"]
              ).toExponential(2)}
            </div>
          </div>
          <div className="group">
            <div className="title">Column</div>
            <div>
              {calculateInertia(
                inputs["col-width"],
                inputs["col-depth"]
              ).toExponential(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="show-set">
        <h2 className="heading">Stiffness</h2>
        <div>
          {stiffness.map((s) => (
            <div className="group" key={s.id}>
              <div className="title">{s.name}</div>
              <div>{Math.ceil(s.sf)}E</div>
            </div>
          ))}
        </div>
      </div>

      <div className="show-set">
        <h2 className="heading">Distribution Factor</h2>
        <div>
          {Object.keys(dfs).map((b) => (
            <div className="group" key={b}>
              <div className="title">{b}</div>
              <div>{dfs[b]}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
