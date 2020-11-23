import { Button, ButtonGroup } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { generate } from "shortid";
import SFDFCalculationShow from "./SFDFCalculationShow";
import "./Stiffness.scss";

function nextChar(c, at) {
  return String.fromCharCode(c.charCodeAt(0) + at || 1);
}

function InputGroup({ onChange, name, value, label }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label || name} </label>
      <input
        type="text"
        value={value}
        onChange={onChange.bind(null, name)}
        name={name}
      />
      <span>mm</span>
    </div>
  );
}

function NodeLine({ name }) {
  return (
    <div className="node-line">
      <div className="v-line" />
      <div className="node-name">{name || "--"}</div>
      <div className="v-line" />
    </div>
  );
}

function Beam({ onChange, beam }) {
  return (
    <div className="beam">
      <input
        type="text"
        className="beam-input"
        onChange={onChange.bind(null, beam)}
        value={beam.value}
      />
      <div className="beam-line"></div>
    </div>
  );
}

export default function Stiffness() {
  const [inputs, setInputs] = useState([
    {
      name: "floor-height",
      value: 3300,
    },
    {
      name: "beam-width",
      value: 300,
    },
    {
      name: "beam-depth",
      value: 500,
    },
    {
      name: "col-width",
      value: 400,
    },
    {
      name: "col-depth",
      value: 400,
    },
  ]);

  const [beamLengths, setBeamLengths] = useState(setDiagramFor(3));
  function setDiagramFor(n) {
    return [...Array(n)].map(() => ({
      id: generate(),
      value: 3000,
    }));
  }

  function getSpanCount() {
    return beamLengths.length;
  }

  function handleBeamInputChange(beam, e) {
    const bl = beamLengths.find((f) => f.id === beam.id);
    bl.value = e.target.value;
    setBeamLengths([...beamLengths]);
  }

  function handleInputChange(name, e) {
    const field = inputs.find((f) => f.name === name);
    field.value = e.target.value;
    setInputs([...inputs]);
    if (field.name === "span-count") {
      const newSpanCount = parseInt(e.target.value) || 1;
      setBeamLengths(setDiagramFor(newSpanCount));
    }
  }

  function increaseSpan() {
    setBeamLengths([...beamLengths, ...setDiagramFor(1)]);
  }
  function decreaseSpan() {
    const newCount = getSpanCount() - 1;
    if (newCount !== 0)
      setBeamLengths((b) => {
        b.pop();
        return [...b];
      });
  }

  return (
    <div className="stiffness">
      <ButtonGroup variant="contained" className="btn-grp">
        <Button onClick={increaseSpan}>Increase Span Count</Button>
        <Button onClick={decreaseSpan}>Decrease Span Count</Button>
      </ButtonGroup>

      {inputs.map((input) => (
        <InputGroup key={input.name} {...input} onChange={handleInputChange} />
      ))}

      <div className="diagram">
        {beamLengths.map((bl, i) => (
          <Fragment key={bl.id}>
            <NodeLine name={nextChar("A", i)} />
            <Beam beam={bl} onChange={handleBeamInputChange} />
          </Fragment>
        ))}
        <NodeLine name={nextChar("A", getSpanCount())} />
      </div>
      <SFDFCalculationShow inputs={inputs} beamLengths={beamLengths} />
    </div>
  );
}
