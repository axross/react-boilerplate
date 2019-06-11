import { action } from "@storybook/addon-actions";
import { number, radios, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import MultilineTextInput, {
  MultilineTextInputResize
} from "../MultilineTextInput";

storiesOf("Common/MultilineTextInput", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <MultilineTextInput
      maxLines={number("maxLines", 5)}
      resize={radios(
        "resize",
        {
          "MultilineTextInputResize.both": MultilineTextInputResize.both,
          "MultilineTextInputResize.horizontal":
            MultilineTextInputResize.horizontal,
          "MultilineTextInputResize.vertical (default)":
            MultilineTextInputResize.vertical
        },
        MultilineTextInputResize.vertical
      )}
      defaultValue={text("defaultValue", "")}
      onChange={action("onChange")}
    />
  ));
