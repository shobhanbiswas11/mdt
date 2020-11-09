import { Box, Button, ButtonGroup } from "@material-ui/core";
import produce from "immer";
import { chain, chunk, round } from "lodash";
import React, { useState } from "react";
import "./App.css";
import { balance, carryOver } from "./calculations";
import Table from "./Table";

// const fem = [
// [0, -1.6],
// [1.6, -6],
// [6, -8],
// [4, 0],
// ];
// const dfs = [
//   [0, 0],
//   [0.6, 0.4],
//   [0.5, 0.5],
//   [0, 0],
// ];

export const globalContext = React.createContext({});
const initialFEMS = [0, 0, 0, 0, 0, 0];
const initialDFS = [0, 0.5, 0.5, 0.5, 0.5, 0];
const initialPrecision = 5;

function App() {
  const [dfs, setDfs] = useState(initialDFS);
  const [fems, setFems] = useState(initialFEMS);
  const [precision, setPrecision] = useState(initialPrecision);

  function valueWithIndex(arr) {
    return arr.map((item, i) => ({ index: i, value: item }));
  }

  function getDFs() {
    return chunk(
      valueWithIndex(dfs).map((v) => ({ ...v, updater: setDfs })),
      2
    );
  }

  function getFEMs() {
    return chunk(
      valueWithIndex(fems).map((v) => ({ ...v, updater: setFems })),
      2
    );
  }

  function calculateRows() {
    let lastRow = fems;
    const rows = [];
    let action = balance;

    for (let i = 0; i < precision; i++) {
      rows.push(action(lastRow, dfs));
      action = action === balance ? carryOver : balance;
      lastRow = rows[rows.length - 1];
    }

    return rows;
  }

  function tidyResult(row) {
    function tidyDigit(digit) {
      if (digit === -0) digit = 0;

      return round(digit, 4);
    }

    return chunk(row.map(tidyDigit), 2);
  }

  function rowsAddition() {
    const rows = calculateRows();
    const sum = fems.map((fem, i) => {
      let sum = 0;
      sum += parseFloat(fem);
      rows.forEach((row) => {
        sum += row[i];
      });

      return round(sum, 4);
    });
    return chunk(sum, 2);
  }

  function handleChange(v, e) {
    v.updater((prevValue) => {
      prevValue[v.index] = e.target.value;
      return [...prevValue];
    });
  }

  function addJoint() {
    setDfs((dfs) => {
      return produce(dfs, (draft) => {
        draft.splice(1, 0, 0.5, 0.5);
      });
    });
    setFems((fems) => {
      return produce(fems, (draft) => {
        draft.splice(1, 0, 0, 0);
      });
    });
  }

  function reset() {
    setDfs([...initialDFS]);
    setFems([...initialFEMS]);
    setPrecision(initialPrecision);
  }

  function addPrec() {
    setPrecision(precision + 1);
  }
  function removePrec() {
    if (precision === 2) return;
    setPrecision(precision - 1);
  }

  return (
    <globalContext.Provider
      value={{
        getDFs,
        getFEMs,
        handleChange,
        dfs,
        fems,
        rows: chain(calculateRows()).map(tidyResult).value(),
        sum: rowsAddition(),
      }}
    >
      <main>
        <Box my={4} textAlign="center">
          <ButtonGroup color="primary">
            <Button onClick={addJoint}>Add Joint</Button>
            <Button onClick={reset}>Reset</Button>
            <Button onClick={addPrec}>Add precision</Button>
            <Button onClick={removePrec}>Reduce precision</Button>
          </ButtonGroup>
        </Box>
        <Table />
      </main>
    </globalContext.Provider>
  );
}

export default App;
