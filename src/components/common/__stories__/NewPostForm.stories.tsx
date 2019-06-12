import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import NewPostForm from "../NewPostForm";

storiesOf("Common/NewPostForm", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    return (
      <NewPostForm
        defaultTitle={text("defaultTitle", "")}
        defaultBody={text("defaultBody", "")}
        onSubmit={action("onSubmit")}
      />
    );
  });
