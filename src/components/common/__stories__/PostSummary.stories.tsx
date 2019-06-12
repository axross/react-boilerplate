import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import PostSummary from "../PostSummary";
import Post from "../../../entities/Post";
import PostId from "../../../entities/PostId";

storiesOf("Common/PostSummary", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    class _PostId extends PostId {
      equal(): boolean {
        return false;
      }

      toString() {
        return "";
      }
    }

    class _Post extends Post {
      constructor() {
        super({ id: new _PostId() });
      }

      readonly title = text("title", "Post title");

      readonly body = text(
        "body",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Sed risus ultricies tristique nulla aliquet. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. A pellentesque sit amet porttitor eget dolor morbi non arcu. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Eu augue ut lectus arcu. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Et ultrices neque ornare aenean euismod elementum nisi. Nulla malesuada pellentesque elit eget gravida cum. Consequat mauris nunc congue nisi vitae. Neque volutpat ac tincidunt vitae semper quis lectus. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Id nibh tortor id aliquet lectus."
      );
    }

    return <PostSummary post={new _Post()} />;
  });
