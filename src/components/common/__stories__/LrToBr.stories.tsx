import styled from "@emotion/styled";
import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import LrToBr from "../LrToBr";
import Text from "../Text";

storiesOf("Common/LrToBr", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    return (
      <LrToBr
        value={text(
          "value",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non.\nSed risus ultricies tristique nulla aliquet. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.\nA pellentesque sit amet porttitor eget dolor morbi non arcu. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Eu augue ut lectus arcu.\nPlacerat in egestas erat imperdiet sed euismod nisi porta lorem. Et ultrices neque ornare aenean euismod elementum nisi.\nNulla malesuada pellentesque elit eget gravida cum. Consequat mauris nunc congue nisi vitae. Neque volutpat ac tincidunt vitae semper quis lectus.\nVel turpis nunc eget lorem dolor sed viverra ipsum nunc. Id nibh tortor id aliquet lectus."
        )}
      />
    );
  })
  .add("wrapping with a component", () => {
    return (
      <LrToBr
        value={text(
          "value",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non.\nSed risus ultricies tristique nulla aliquet. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.\nA pellentesque sit amet porttitor eget dolor morbi non arcu. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Eu augue ut lectus arcu.\nPlacerat in egestas erat imperdiet sed euismod nisi porta lorem. Et ultrices neque ornare aenean euismod elementum nisi.\nNulla malesuada pellentesque elit eget gravida cum. Consequat mauris nunc congue nisi vitae. Neque volutpat ac tincidunt vitae semper quis lectus.\nVel turpis nunc eget lorem dolor sed viverra ipsum nunc. Id nibh tortor id aliquet lectus."
        )}
        convert={line => <TextWithMargin>{line}</TextWithMargin>}
      />
    );
  });

const TextWithMargin = styled(Text)`
  display: block;
`;
