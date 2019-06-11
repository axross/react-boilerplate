import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.Attributes {
  maxLines?: number;
  resize?: MultilineTextInputResize;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent, value: string) => void;
  className?: string;
}

const MultilineTextInput = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      maxLines = 5,
      resize = MultilineTextInputResize.vertical,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ): React.ReactElement => (
    <TextArea
      ref={ref}
      defaultValue={defaultValue}
      onChange={e => onChange && onChange(e, e.currentTarget.value)}
      maxLines={maxLines}
      resize={resize}
      {...props}
    />
  )
);

export enum MultilineTextInputResize {
  horizontal = "horizontal",
  vertical = "vertical",
  both = "both"
}

const TextArea = styled.textarea<{
  maxLines: number;
  resize: MultilineTextInputResize;
}>`
  box-sizing: border-box;
  height: 100%;
  min-height: calc((1em * 1.5) * ${({ maxLines }) => maxLines} + 16px + 2px);
  padding: 8px 8px;
  border: 1px #dfe4ea solid;
  border-radius: 3px;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: #f1f2f6 0px 0px 0px 1px, #f1f2f6 0px 2px 4px;
  resize: ${({ resize }) => resize};
  outline: none;
  transition: box-shadow 125ms ease-in-out 0ms;

  &:focus {
    box-shadow: #eccc68 0 0 0 3px;
    outline: none;
  }
`;

export default MultilineTextInput;
