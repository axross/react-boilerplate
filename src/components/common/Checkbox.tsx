import styled from "@emotion/styled";
import * as React from "react";
import CheckIcon from "./icons/CheckIcon";
import { Props as CheckboxLabelProps } from "./CheckboxLabel";

interface Props extends React.Attributes {
  checked?: boolean;
  label?: React.ReactElement<CheckboxLabelProps>;
  onChange?: (e: React.SyntheticEvent, isChecked: boolean) => void;
  className?: string;
}

function Checkbox({
  checked = false,
  label,
  onChange = () => {},
  ...props
}: Props): React.ReactElement {
  const ref = React.useRef<HTMLInputElement>(null);
  const [isChecked, setChecked] = React.useState(checked);

  function toggleChecked(e: React.SyntheticEvent) {
    const newChecked = !isChecked;

    setChecked(newChecked);
    onChange(e, newChecked);
  }

  return (
    <Root
      onClick={e => {
        toggleChecked(e);

        ref.current!.focus();
      }}
      {...props}
    >
      <Input
        ref={ref}
        tabIndex={0}
        onKeyDown={e => e.keyCode === 32 && toggleChecked(e)}
        checked={isChecked}
      >
        <Indicator checked={isChecked} />
      </Input>

      {label ? <Label>{label}</Label> : null}
    </Root>
  );
}

const Root = styled.span`
  display: inline-grid;
  min-width: 24px;
  min-height: 24px;
  grid-template-columns: 24px auto;
  grid-template-rows: 24px;
  column-gap: 4px;
  cursor: pointer;
`;

const Input = styled.span<{ checked: boolean }>`
  display: inline-block;
  position: relative;
  align-self: stretch;
  justify-self: stretch;
  border: ${({ checked }) => (checked ? "none" : "1px #dfe4ea solid")};
  border-radius: 3px;
  background-color: ${({ checked }) => (checked ? "#1e90ff" : "transparent")};
  transition: background-color 125ms ease-in-out 0ms,
    box-shadow 125ms ease-in-out 0ms;

  &:focus {
    box-shadow: #eccc68 0 0 0 3px;
  }
`;

const Indicator = styled(CheckIcon)<{ checked: boolean }>`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 20px;
  height: 20px;
  fill: ${({ checked }) => (checked ? "#ffffff" : "#dfe4ea")};
`;

const Label = styled.div`
  margin-top: 4px;
`;

export default Checkbox;
