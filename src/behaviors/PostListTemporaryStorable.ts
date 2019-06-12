import * as immutable from "immutable";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import Post from "../entities/Post";
import PostId from "../entities/PostId";

abstract class PostListTemporaryStorable {
  protected abstract readonly $posts: BehaviorSubject<immutable.List<Post>>;

  protected abstract readonly $updatingPostIds: BehaviorSubject<
    immutable.Set<PostId>
  >;

  get posts(): Observable<immutable.List<Post>> {
    return this.$posts;
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

  set(posts: immutable.List<Post>): void {
    this.$posts.next(immutable.List(posts));
  }

  add(post: Post): void {
    this.$posts.next(this.$posts.value.push(post));
  }

  remove(post: Post): void {
    this.$posts.next(this.$posts.value.remove(this.$posts.value.indexOf(post)));
  }

  replace(from: Post, to: Post): void {
    this.$posts.next(
      this.$posts.value.set(this.$posts.value.indexOf(from), to)
    );
  }

  markUpdating(post: Post): void {
    this.$updatingPostIds.next(this.$updatingPostIds.value.add(post.id));
  }

  unmarkUpdating(post: Post): void {
    this.$updatingPostIds.next(this.$updatingPostIds.value.remove(post.id));
  }
}

export default PostListTemporaryStorable;
