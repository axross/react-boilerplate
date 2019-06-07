import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Text, { TextHeadingLevel } from "../Text";

storiesOf("Common/Text", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Text
      headingLevel={options(
        "headingLevel",
        {
          "TextHeadingLevel.none": TextHeadingLevel.none,
          "TextHeadingLevel.h1": TextHeadingLevel.h1,
          "TextHeadingLevel.h2": TextHeadingLevel.h2,
          "TextHeadingLevel.h3": TextHeadingLevel.h3,
          "TextHeadingLevel.h4": TextHeadingLevel.h4,
          "TextHeadingLevel.h5": TextHeadingLevel.h5,
          "TextHeadingLevel.h6": TextHeadingLevel.h6
        },
        TextHeadingLevel.none,
        { display: "inline-radio" }
      )}
      lineThrough={boolean("lineThrough", false)}
      nonselectable={boolean("nonselectable", false)}
    >
      {text("children", "Lorem Ipsum")}
    </Text>
  ));
