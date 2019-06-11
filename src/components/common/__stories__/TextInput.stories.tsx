import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import TextInput from "../TextInput";

storiesOf("Common/TextInput", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <TextInput
      defaultValue={text("defaultValue", "")}
      onChange={action("onChange")}
      onEnterKeyDown={action("onEnterKeyDown")}
    />
  ));
