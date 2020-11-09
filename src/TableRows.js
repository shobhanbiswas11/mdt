import React, { useContext } from "react";
import { globalContext } from "./App";

function Cell({ valueArr }) {
  return (
    <td>
      <div className="t-cell">
        {valueArr.map((col, i) => (
          <div key={valueArr + i}>{col}</div>
        ))}
      </div>
    </td>
  );
}

export default function TableRows() {
  let { rows, sum } = useContext(globalContext);

  function balanceOrCarry(index) {
    if (index % 2 === 0) return "Balance";
    return "Carry Over";
  }

  return (
    <>
      {rows.map((row, i) => (
        <tr>
          <td className="left-heading">{balanceOrCarry(i)}</td>
          {row.map((cell) => (
            <Cell valueArr={cell} />
          ))}
        </tr>
      ))}
      <tr className="sum">
        <td>Sum</td>
        {sum.map((cell, i) => (
          <Cell valueArr={cell} />
        ))}
      </tr>
    </>
  );
}
