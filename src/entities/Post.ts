import * as immutable from "immutable";
import PostId from "./PostId";

abstract class Post implements immutable.ValueObject {
  constructor({ id }: { id: PostId }) {
    this.id = id;
  }

  readonly id: PostId;

  abstract readonly title: string;

  abstract readonly body: string;

  equals(task: Post): boolean {
    return task.id.equals(this.id);
  }

  hashCode(): number {
    return immutable.hash(this.id);
  }
}

export default Post;
