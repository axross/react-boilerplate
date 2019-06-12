import * as React from "react";

interface Props {
  value: string;
  convert?: (line: string) => React.ReactElement | string;
}

function LrToBr({
  value,
  convert = DEFAULT_CONVERT
}: Props): React.ReactElement {
  return (
    <>
      {value
        .split("\n")
        .reduce<(React.ReactElement | string)[]>(
          (lines, line) => [...lines, convert(line), <br />],
          []
        )}
    </>
  );
}

function DEFAULT_CONVERT(line: string) {
  return line;
}

export default LrToBr;
