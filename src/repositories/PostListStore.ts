import * as immutable from "immutable";
import { BehaviorSubject } from "rxjs";
import PostListTemporaryStorable from "../behaviors/PostListTemporaryStorable";
import Post from "../entities/Post";
import PostId from "../entities/PostId";

class PostListStore extends PostListTemporaryStorable {
  protected readonly $posts = new BehaviorSubject(immutable.List<Post>());

  protected readonly $updatingPostIds = new BehaviorSubject(
    immutable.Set<PostId>()
  );
}

export default PostListStore;
