import AuthenticationSession from "../entities/AuthenticationSession";
import PostCreatable from "../behaviors/PostCreatable";
import PostListTemporaryStorable from "../behaviors/PostListTemporaryStorable";
import PostCreateBloc from "./PostCreateBloc";

class PostCreateBlocFactory {
  constructor({
    postCreatable,
    postListTemporaryStorable
  }: {
    postCreatable: PostCreatable;
    postListTemporaryStorable: PostListTemporaryStorable;
  }) {
    this.postCreatable = postCreatable;
    this.postListTemporaryStorable = postListTemporaryStorable;
  }

  private readonly postCreatable: PostCreatable;

  private readonly postListTemporaryStorable: PostListTemporaryStorable;

  create({ session }: { session: AuthenticationSession }): PostCreateBloc {
    return new PostCreateBloc({
      session,
      postCreatable: this.postCreatable,
      postListTemporaryStorable: this.postListTemporaryStorable
    });
  }
}

export default PostCreateBlocFactory;
