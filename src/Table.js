import React, { useContext } from "react";
import { globalContext } from "./App";
import InputCell from "./InputCell";
import TableRows from "./TableRows";

export default function Table() {
  const { getDFs, getFEMs } = useContext(globalContext);

  return (
    <table>
      <tbody>
        <tr>
          <td className="left-heading">Distribution Factor</td>
          {getDFs().map((d, i) => (
            <InputCell valueArr={d} key={i} />
          ))}
        </tr>
        <tr>
          <td className="left-heading">FEM</td>
          {getFEMs().map((d, i) => (
            <InputCell valueArr={d} key={i} />
          ))}
        </tr>
        <TableRows />
      </tbody>
    </table>
  );
}
