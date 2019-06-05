import * as React from "react";

function CheckIcon({
  className
}: React.SVGAttributes<SVGElement> & {
  className?: string;
}): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fillRule="nonzero"
        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
      />
    </svg>
  );
}

export default CheckIcon;
