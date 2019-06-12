import * as immutable from "immutable";

abstract class PostId implements immutable.ValueObject {
  abstract equals(postId: PostId): boolean;

  abstract hashCode(): number;

  abstract toString(): string;
}

export default PostId;
