import styled from "@emotion/styled";
import * as React from "react";
import CheckIcon from "./icons/CheckIcon";
import { Props as CheckboxLabelProps } from "./CheckboxLabel";

interface Props extends React.Attributes {
  checked?: boolean;
  disable?: boolean;
  label?: React.ReactElement<CheckboxLabelProps>;
  onChange?: (e: React.SyntheticEvent, isChecked: boolean) => void;
  className?: string;
}

function Checkbox({
  checked = false,
  disable = false,
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
      onClick={
        disable
          ? undefined
          : e => {
              toggleChecked(e);

              ref.current!.focus();
            }
      }
      {...props}
    >
      <Input
        ref={ref}
        tabIndex={disable ? undefined : 0}
        onKeyDown={
          disable ? undefined : e => e.keyCode === 32 && toggleChecked(e)
        }
        checked={isChecked}
        disable={disable}
      >
        <Indicator checked={isChecked} disable={disable} />
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

const Input = styled.span<{ checked: boolean; disable: boolean }>`
  display: inline-block;
  position: relative;
  align-self: stretch;
  justify-self: stretch;
  border-color: ${({ checked, disable }) =>
    disable ? "#ced6e0" : checked ? "transparent" : "#ced6e0"};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  background-color: ${({ checked, disable }) =>
    disable ? "#f1f2f6" : checked ? "#1e90ff" : "#fff"};
  transition: background-color 125ms ease-in-out 0ms,
    box-shadow 125ms ease-in-out 0ms;

  &:focus {
    box-shadow: #eccc68 0 0 0 3px;
  }
`;

const Indicator = styled(CheckIcon)<{ checked: boolean; disable: boolean }>`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 20px;
  height: 20px;
  fill: ${({ checked, disable }) =>
    disable
      ? checked
        ? "#ced6e0"
        : "transparent"
      : checked
      ? "#fff"
      : "transparent"};
`;

const Label = styled.div`
  margin-top: 4px;
`;

export default Checkbox;
