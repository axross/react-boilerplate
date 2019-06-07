import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.Attributes {
  onChange?: (e: React.ChangeEvent, value: string) => void;
  onEnterKeyDown?: (e: React.KeyboardEvent, value: string) => void;
  className?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, onEnterKeyDown, ...props }, ref): React.ReactElement => (
    <Input
      type="text"
      ref={ref}
      onChange={e => onChange && onChange(e, e.currentTarget.value)}
      onKeyDown={e =>
        e.keyCode === 13 &&
        onEnterKeyDown &&
        onEnterKeyDown(e, e.currentTarget.value)
      }
      {...props}
    />
  )
);

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 8px 8px;
  border: 1px #dfe4ea solid;
  border-radius: 3px;
  font-family: sans-serif;
  font-size: 14px;
  box-shadow: #f1f2f6 0px 0px 0px 1px, #f1f2f6 0px 2px 4px;
  outline: none;
  transition: box-shadow 125ms ease-in-out 0ms;

  &:focus {
    box-shadow: #eccc68 0 0 0 3px;
    outline: none;
  }
`;

export default TextInput;
