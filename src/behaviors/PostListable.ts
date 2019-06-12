import Post from "../entities/Post";

interface PostListable {
  getAllPosts(): Promise<Post[]>;
}

export class PostListFailure extends Error {
  constructor() {
    super(`PostListFailure: failed to list up posts.`);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default PostListable;
