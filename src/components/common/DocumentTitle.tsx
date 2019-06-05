import * as React from "react";

interface Props {
  title: string;
}

function DocumentTitle({ title }: Props): null {
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.document !== undefined &&
      window.document.title !== undefined
    ) {
      window.document.title = title;
    }
  });

  return null;
}

export default DocumentTitle;
