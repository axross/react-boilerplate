import { addParameters, configure } from "@storybook/react";

addParameters({
  backgrounds: [
    {
      name: "dark",
      value: "#222f3e",
      default: true
    }
  ]
});

configure(() => {
  const req = require.context("../src/components", true, /\.stories\.tsx?$/);

  req.keys().forEach(req);
}, module);
