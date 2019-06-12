import PostListable from "../behaviors/PostListable";
import AuthenticationSession from "../entities/AuthenticationSession";
import PostListBloc from "./PostListBloc";
import PostCreatable from "../behaviors/PostCreatable";

class PostListBlocFactory {
  constructor({
    postCreatable,
    postListable
  }: {
    postCreatable: PostCreatable;
    postListable: PostListable;
  }) {
    this.postCreatable = postCreatable;
    this.postListable = postListable;
  }

  private readonly postCreatable: PostCreatable;

  private readonly postListable: PostListable;

  create({ session }: { session: AuthenticationSession }): PostListBloc {
    return new PostListBloc({
      session,
      postCreatable: this.postCreatable,
      postListable: this.postListable
    });
  }
}

export default PostListBlocFactory;
