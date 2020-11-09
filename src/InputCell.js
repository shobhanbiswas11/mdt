import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { globalContext } from "./App";

function InputCell({ valueArr }) {
  const { handleChange } = useContext(globalContext);

  return (
    <td>
      <div className="t-cell">
        {valueArr.map((v, i) => {
          return (
            <div key={v + i}>
              <TextField
                type="text"
                value={v.value}
                onChange={handleChange.bind(null, v)}
                variant="outlined"
                size="small"
              />
            </div>
          );
        })}
      </div>
    </td>
  );
}

export default InputCell;
