import * as React from "react";
import * as Types from "./types";
import { moveCursorToEnd } from "./util";

/** The default Spreadsheet DataEditor component */
const DataEditor: React.FC<Types.DataEditorProps> = ({ onChange, cell }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const firstKeyDown = React.useRef(false);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!firstKeyDown.current) {
        const value = event.target.value;
        const arrValue =
          typeof value === "string" ? value.split("") : `${value}`.split("");
        onChange({ value: arrValue[arrValue.length - 1] || "" });
        firstKeyDown.current = true;
      } else {
        onChange({ ...cell, value: event.target.value });
      }
    },
    [onChange, cell]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      moveCursorToEnd(inputRef.current);
    }
  }, [inputRef]);

  const value = cell?.value ?? "";

  return (
    <div className="Spreadsheet__data-editor">
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        value={value}
        autoFocus
        onFocus={() => {
          setTimeout(() => {
            firstKeyDown.current = true;
          }, 0);
        }}
      />
    </div>
  );
};

export default DataEditor;
