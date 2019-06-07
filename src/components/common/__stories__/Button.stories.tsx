import { action } from "@storybook/addon-actions";
import {
  boolean,
  optionsKnob as options,
  withKnobs,
  text
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Button, { ButtonColor } from "../Button";
import Text from "../Text";

storiesOf("Common/Button", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Button
      color={options(
        "color",
        {
          "ButtonColor.primary": ButtonColor.primary,
          "ButtonColor.accent": ButtonColor.accent,
          "ButtonColor.secondary": ButtonColor.secondary
        },
        ButtonColor.primary,
        {
          display: "inline-radio"
        }
      )}
      disable={boolean("disable", false)}
      onClick={action("onClick")}
    >
      {<Text>{text("label", "Click Me")}</Text>}
    </Button>
  ));
