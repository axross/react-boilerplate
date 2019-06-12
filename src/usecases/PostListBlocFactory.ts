import PostListable from "../behaviors/PostListable";
import PostListTemporaryStorable from "../behaviors/PostListTemporaryStorable";
import PostListBloc from "./PostListBloc";

class PostListBlocFactory {
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

  create(): PostListBloc {
    return new PostListBloc({
      postListable: this.postListable,
      postListTemporaryStorable: this.postListTemporaryStorable
    });
  }
}

export default PostListBlocFactory;
