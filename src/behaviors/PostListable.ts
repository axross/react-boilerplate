import AuthenticationSession from "../entities/AuthenticationSession";
import Post from "../entities/Post";

interface PostListable {
  getAllPosts(args: { session: AuthenticationSession }): Promise<Post[]>;
}

export class PostListFailure extends Error {
  constructor({ session }: { session: AuthenticationSession }) {
    super(`PostListFailure: failed to list up posts. (session: ${session})`);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default PostListable;
