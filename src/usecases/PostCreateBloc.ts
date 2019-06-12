import * as immutable from "immutable";
import PostCreatable, { PostCreateFailure } from "../behaviors/PostCreatable";
import PostListTemporaryStorable from "../behaviors/PostListTemporaryStorable";
import AuthenticationSession from "../entities/AuthenticationSession";
import Post from "../entities/Post";
import PostId from "../entities/PostId";

class PostListBloc {
  constructor({
    session,
    postCreatable,
    postListTemporaryStorable
  }: {
    session: AuthenticationSession;
    postCreatable: PostCreatable;
    postListTemporaryStorable: PostListTemporaryStorable;
  }) {
    this.session = session;
    this.postCreatable = postCreatable;
    this.postListTemporaryStorable = postListTemporaryStorable;
  }

  private readonly session: AuthenticationSession;

  private readonly postCreatable: PostCreatable;

  private readonly postListTemporaryStorable: PostListTemporaryStorable;

  async createPost({
    title,
    body
  }: {
    title: string;
    body: string;
  }): Promise<void> {
    const uncreatedPost = UncreatedPost.create({ title, body });

    this.postListTemporaryStorable.add(uncreatedPost);
    this.postListTemporaryStorable.markUpdating(uncreatedPost);

    await this.postCreatable.createPost({ title, body, session: this.session });

    let createdPost: Post;

    try {
      createdPost = await this.postCreatable.createPost({
        title: uncreatedPost.title,
        body: uncreatedPost.body,
        session: this.session
      });
    } catch (err) {
      if (err instanceof PostCreateFailure) {
        // delete the temporarily created task to rollback
        this.postListTemporaryStorable.remove(uncreatedPost);
        this.postListTemporaryStorable.unmarkUpdating(uncreatedPost);
      }

      return;
    }

    this.postListTemporaryStorable.replace(uncreatedPost, createdPost);
    this.postListTemporaryStorable.unmarkUpdating(uncreatedPost);
  }
}

class UncreatedPost extends Post {
  constructor({
    id,
    title,
    body
  }: {
    id: PostId;
    title: string;
    body: string;
  }) {
    super({ id });

    this.title = title;
    this.body = body;
  }

  readonly title: string;

  readonly body: string;

  static create({
    title,
    body
  }: {
    title: string;
    body: string;
  }): UncreatedPost {
    return new UncreatedPost({ id: new UncreatedPostId(), title, body });
  }
}

class UncreatedPostId extends PostId {
  constructor() {
    super();

    this.value = Math.random();
  }

  readonly value: number;

  equals(postId: PostId): boolean {
    return postId instanceof UncreatedPostId && postId.value === this.value;
  }

  hashCode(): number {
    return immutable.hash(this.value);
  }

  toString() {
    return this.value.toString();
  }
}

export default PostListBloc;
