import {
  boolean,
  color,
  number,
  radios,
  select,
  text,
  withKnobs
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Text, { TextHeadingLevel, TextAlignment } from "../Text";

storiesOf("Common/Text", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const headingLevel = select(
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
      TextHeadingLevel.none
    );
    const isMaxLinesEnable = boolean("Enable `maxLines`", false, "Clamping");
    const maxLines = number("maxLines", 3, {}, "Clamping");
    const alignment = radios(
      "alignment (use with the clamping option)",
      {
        "TextAlignment.default (inherit)": TextAlignment.default,
        "TextAlignment.start": TextAlignment.start,
        "TextAlignment.end": TextAlignment.end,
        "TextAlignment.center": TextAlignment.center
      },
      TextAlignment.default
    );
    const isColorEnable = boolean("Enable `color`", false, "Color");
    const _color = color("color", "rgba(74, 144, 226, 1)", "Color");
    const selectable = boolean("selectable", true);
    const children = text(
      "children",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet. Risus commodo viverra maecenas accumsan. Condimentum lacinia quis vel eros donec ac odio tempor orci. Massa sapien faucibus et molestie ac feugiat sed lectus. Et egestas quis ipsum suspendisse ultrices gravida. Eget egestas purus viverra accumsan in nisl. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Pellentesque habitant morbi tristique senectus. Consectetur a erat nam at lectus urna duis. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Congue nisi vitae suscipit tellus mauris. Neque egestas congue quisque egestas. Donec adipiscing tristique risus nec feugiat in fermentum. Aliquet lectus proin nibh nisl. Nunc eget lorem dolor sed. Ipsum consequat nisl vel pretium lectus quam id. Ac turpis egestas sed tempus urna. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Massa sed elementum tempus egestas sed sed risus pretium. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Adipiscing diam donec adipiscing tristique risus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Erat velit scelerisque in dictum. Lobortis mattis aliquam faucibus purus in massa tempor nec. Leo duis ut diam quam. In hendrerit gravida rutrum quisque non tellus orci. Eget aliquet nibh praesent tristique magna sit amet purus. Neque egestas congue quisque egestas diam.",
      "Children"
    );

    return (
      <Text
        headingLevel={headingLevel}
        maxLines={isMaxLinesEnable ? maxLines : undefined}
        alignment={alignment}
        color={isColorEnable ? _color : undefined}
        selectable={selectable}
      >
        {children}
      </Text>
    );
  });
