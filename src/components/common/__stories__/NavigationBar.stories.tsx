import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import NavigationBar from "../NavigationBar";
import Button from "../Button";
import Text from "../Text";

storiesOf("Common/NavigationBar", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <NavigationBar
      title={text("title", "Clean React")}
      actions={[
        <Button>
          <Text>Click me!</Text>
        </Button>
      ]}
    />
  ));
