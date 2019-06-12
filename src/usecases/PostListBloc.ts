import * as immutable from "immutable";
import { Observable } from "rxjs";
import PostListable from "../behaviors/PostListable";
import PostListTemporaryStorable from "../behaviors/PostListTemporaryStorable";
import Post from "../entities/Post";

class PostListBloc {
  constructor({
    postListable,
    postListTemporaryStorable
  }: {
    postListable: PostListable;
    postListTemporaryStorable: PostListTemporaryStorable;
  }) {
    this.postListable = postListable;
    this.postListTemporaryStorable = postListTemporaryStorable;
  }

  private readonly postListable: PostListable;

  private readonly postListTemporaryStorable: PostListTemporaryStorable;

  get posts(): Observable<immutable.List<Post>> {
    return this.postListTemporaryStorable.posts;
  }

  get currentPosts(): immutable.List<Post> {
    return this.postListTemporaryStorable.currentPosts;
  }

  get updatingPosts(): Observable<immutable.List<Post>> {
    return this.postListTemporaryStorable.updatingPosts;
  }

  get currentUpdatingPosts(): immutable.List<Post> {
    return this.postListTemporaryStorable.currentUpdatingPosts;
  }

  async initialize(): Promise<void> {
    const posts = await this.postListable.getAllPosts();

    this.postListTemporaryStorable.set(immutable.List(posts));
  }

  async dispose(): Promise<void> {}
}

export default PostListBloc;
