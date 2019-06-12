import AuthenticationSession from "../entities/AuthenticationSession";
import Post from "../entities/Post";

interface PostCreatable {
  createPost(args: {
    title: string;
    body: string;
    session: AuthenticationSession;
  }): Promise<Post>;
}

export class PostCreateFailure extends Error {
  constructor({
    title,
    body,
    session
  }: {
    title: string;
    body: string;
    session: AuthenticationSession;
  }) {
    super(
      `PostCreateFailure: failed to create a post. (title: ${title}, body: ${body}, session: ${session})`
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default PostCreatable;
