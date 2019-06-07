import { addDecorator, configure } from "@storybook/react";
import * as React from "react";

configure(() => {
  const req = require.context("../src/components", true, /\.stories\.tsx?$/);

  req.keys().forEach(req);
}, module);
