import {
  boolean,
  color,
  number,
  radios,
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
      headingLevel={radios(
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
      )}
      maxLines={
        boolean("Set `maxLines`", false) ? number("maxLines", 3) : undefined
      }
      color={boolean("Set `color`", true) ? color("color", "") : undefined}
      lineThrough={boolean("lineThrough", false)}
      selectable={boolean("selectable", true)}
    >
      {text(
        "children",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet. Risus commodo viverra maecenas accumsan. Condimentum lacinia quis vel eros donec ac odio tempor orci. Massa sapien faucibus et molestie ac feugiat sed lectus. Et egestas quis ipsum suspendisse ultrices gravida. Eget egestas purus viverra accumsan in nisl. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Pellentesque habitant morbi tristique senectus. Consectetur a erat nam at lectus urna duis. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Congue nisi vitae suscipit tellus mauris. Neque egestas congue quisque egestas. Donec adipiscing tristique risus nec feugiat in fermentum. Aliquet lectus proin nibh nisl. Nunc eget lorem dolor sed. Ipsum consequat nisl vel pretium lectus quam id. Ac turpis egestas sed tempus urna. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Massa sed elementum tempus egestas sed sed risus pretium. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Adipiscing diam donec adipiscing tristique risus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Erat velit scelerisque in dictum. Lobortis mattis aliquam faucibus purus in massa tempor nec. Leo duis ut diam quam. In hendrerit gravida rutrum quisque non tellus orci. Eget aliquet nibh praesent tristique magna sit amet purus. Neque egestas congue quisque egestas diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Integer eget aliquet nibh praesent tristique magna sit amet. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Consequat semper viverra nam libero justo laoreet sit amet cursus. Elementum sagittis vitae et leo duis. Magna ac placerat vestibulum lectus mauris ultrices eros in. At elementum eu facilisis sed odio morbi. Aenean sed adipiscing diam donec adipiscing. Aenean vel elit scelerisque mauris pellentesque. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Pulvinar mattis nunc sed blandit. Diam volutpat commodo sed egestas. Justo donec enim diam vulputate ut pharetra sit. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisl condimentum id venenatis a. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Proin gravida hendrerit lectus a. Integer quis auctor elit sed vulputate mi sit amet. Eu lobortis elementum nibh tellus. Ut tristique et egestas quis ipsum. Ac turpis egestas maecenas pharetra convallis posuere. Amet venenatis urna cursus eget nunc. Metus dictum at tempor commodo. Neque viverra justo nec ultrices dui sapien. Accumsan in nisl nisi scelerisque eu ultrices. Vivamus arcu felis bibendum ut tristique et egestas. Volutpat est velit egestas dui id. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Purus sit amet volutpat consequat. In hac habitasse platea dictumst quisque sagittis purus. Odio tempor orci dapibus ultrices in iaculis nunc. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Proin nibh nisl condimentum id venenatis a condimentum. Morbi tristique senectus et netus et. Egestas congue quisque egestas diam in arcu. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Risus ultricies tristique nulla aliquet enim tortor at auctor. Condimentum mattis pellentesque id nibh. Erat nam at lectus urna duis convallis. Malesuada bibendum arcu vitae elementum. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Ullamcorper malesuada proin libero nunc consequat interdum. Tortor condimentum lacinia quis vel eros. Semper risus in hendrerit gravida. Eget nunc lobortis mattis aliquam. Consectetur adipiscing elit duis tristique. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Urna porttitor rhoncus dolor purus non enim praesent elementum. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Quis hendrerit dolor magna eget est lorem."
      )}
    </Text>
  ));
