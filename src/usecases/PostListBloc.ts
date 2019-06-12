import * as immutable from "immutable";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import PostCreatable, { PostCreateFailure } from "../behaviors/PostCreatable";
import PostListable from "../behaviors/PostListable";
import AuthenticationSession from "../entities/AuthenticationSession";
import Post from "../entities/Post";
import PostId from "../entities/PostId";
import { map } from "rxjs/operators";

class PostListBloc {
  constructor({
    session,
    postCreatable,
    postListable
  }: {
    session: AuthenticationSession;
    postCreatable: PostCreatable;
    postListable: PostListable;
  }) {
    this.session = session;
    this.postCreatable = postCreatable;
    this.postListable = postListable;
  }

  private readonly session: AuthenticationSession;

  private readonly postCreatable: PostCreatable;

  private readonly postListable: PostListable;

  private readonly $posts = new BehaviorSubject<immutable.List<Post>>(
    immutable.List()
  );

  private readonly $updatingPostIds = new BehaviorSubject<
    immutable.Set<PostId>
  >(immutable.Set());

  get posts(): Observable<immutable.List<Post>> {
    return this.$posts.pipe(map(posts => posts));
  }

  get currentPosts(): immutable.List<Post> {
    return this.$posts.value;
  }

  get updatingPosts(): Observable<immutable.List<Post>> {
    return combineLatest(this.$posts, this.$updatingPostIds).pipe(
      map(([posts, updatingPostIds]) =>
        posts.filter(post => updatingPostIds.has(post.id))
      )
    );
  }

  get currentUpdatingPosts(): immutable.List<Post> {
    return this.$posts.value.filter(post =>
      this.$updatingPostIds.value.has(post.id)
    );
  }

  async createPost({
    title,
    body
  }: {
    title: string;
    body: string;
  }): Promise<void> {
    const uncreatedPost = UncreatedPost.create({ title, body });

    this.$posts.next(this.$posts.value.push(uncreatedPost));
    this.$updatingPostIds.next(
      this.$updatingPostIds.value.add(uncreatedPost.id)
    );

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
        this.$posts.next(
          this.$posts.value.delete(this.$posts.value.indexOf(uncreatedPost))
        );
        this.$updatingPostIds.next(
          this.$updatingPostIds.value.delete(uncreatedPost.id)
        );
      }

      return;
    }

    this.$posts.next(
      this.$posts.value.set(
        this.$posts.value.indexOf(uncreatedPost),
        createdPost
      )
    );
    this.$updatingPostIds.next(
      this.$updatingPostIds.value.delete(uncreatedPost.id)
    );
  }

  async initialize(): Promise<void> {
    const posts = await this.postListable.getAllPosts({
      session: this.session
    });

    this.$posts.next(immutable.List(posts));
  }

  async dispose(): Promise<void> {}
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
