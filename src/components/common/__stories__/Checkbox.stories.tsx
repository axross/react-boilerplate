import { action } from "@storybook/addon-actions";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Checkbox from "../Checkbox";
import Text from "../Text";

storiesOf("Common/Checkbox", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Checkbox
      checked={boolean("checked", false)}
      disable={boolean("disable", false)}
      onChange={action("onChange")}
    />
  ))
  .add("with a label", () => (
    <Checkbox
      label={<Text>{text("label text", "Click me")}</Text>}
      checked={boolean("checked", false)}
      disable={boolean("disable", false)}
      onChange={action("onChange")}
    />
  ));
