import * as React from "react";

interface Props {
  color: string;
}

function DocumentBackgroundColor({ color }: Props): null {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.document !== undefined) {
      window.document.querySelector("html")!.style.backgroundColor = color;
    }
  });

  return null;
}

export default DocumentBackgroundColor;
