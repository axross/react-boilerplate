import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import TextInput from "../TextInput";

storiesOf("Common/TextInput", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <TextInput
      onChange={action("onChange")}
      onEnterKeyDown={action("onEnterKeyDown")}
    />
  ));
