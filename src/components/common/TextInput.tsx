import styled from "@emotion/styled";
import * as React from "react";

interface Props extends React.Attributes {
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent, value: string) => void;
  onEnterKeyDown?: (e: React.KeyboardEvent, value: string) => void;
  className?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { defaultValue, onChange, onEnterKeyDown, ...props },
    ref
  ): React.ReactElement => (
    <Input
      type="text"
      ref={ref}
      defaultValue={defaultValue}
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
  box-sizing: border-box;
  padding: 8px 8px;
  background: #576574;
  border: none;
  border-radius: 3px;
  color: #fff;
  font-family: sans-serif;
  font-size: 14px;
  outline: none;
  transition: box-shadow 125ms ease-in-out 0ms;

  &:focus {
    box-shadow: #2e86de 0 0 0 2px;
    outline: none;
  }
`;

export default TextInput;
