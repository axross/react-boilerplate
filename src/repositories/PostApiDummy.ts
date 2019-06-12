import * as immutable from "immutable";
import PostListable from "../behaviors/PostListable";
import Post from "../entities/Post";
import PostId from "../entities/PostId";
import PostCreatable from "../behaviors/PostCreatable";
import AuthenticationSession from "../entities/AuthenticationSession";

class PostApiDummy implements PostCreatable, PostListable {
  constructor() {
    this.posts = [
      ApiDummyPost.create({
        title: "Lorem ipsum",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Sed risus ultricies tristique nulla aliquet. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. A pellentesque sit amet porttitor eget dolor morbi non arcu. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Eu augue ut lectus arcu. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Et ultrices neque ornare aenean euismod elementum nisi. Nulla malesuada pellentesque elit eget gravida cum. Consequat mauris nunc congue nisi vitae. Neque volutpat ac tincidunt vitae semper quis lectus. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Id nibh tortor id aliquet lectus."
      }),
      ApiDummyPost.create({
        title: "Ac turpis egestas",
        body:
          "Ac turpis egestas sed tempus urna. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Massa sed elementum tempus egestas sed sed risus pretium. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Adipiscing diam donec adipiscing tristique risus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Erat velit scelerisque in dictum. Lobortis mattis aliquam faucibus purus in massa tempor nec. Leo duis ut diam quam. In hendrerit gravida rutrum quisque non tellus orci. Eget aliquet nibh praesent tristique magna sit amet purus. Neque egestas congue quisque egestas diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Integer eget aliquet nibh praesent tristique magna sit amet. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Sed turpis tincidunt id aliquet risus feugiat in ante metus."
      }),
      ApiDummyPost.create({
        title: "Consequat semper",
        body:
          "Consequat semper viverra nam libero justo laoreet sit amet cursus. Elementum sagittis vitae et leo duis. Magna ac placerat vestibulum lectus mauris ultrices eros in. At elementum eu facilisis sed odio morbi. Aenean sed adipiscing diam donec adipiscing. Aenean vel elit scelerisque mauris pellentesque. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Pulvinar mattis nunc sed blandit. Diam volutpat commodo sed egestas. Justo donec enim diam vulputate ut pharetra sit. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisl condimentum id venenatis a. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Proin gravida hendrerit lectus a."
      }),
      ApiDummyPost.create({
        title: "Integer quis auctor",
        body:
          "Integer quis auctor elit sed vulputate mi sit amet. Eu lobortis elementum nibh tellus. Ut tristique et egestas quis ipsum. Ac turpis egestas maecenas pharetra convallis posuere. Amet venenatis urna cursus eget nunc. Metus dictum at tempor commodo. Neque viverra justo nec ultrices dui sapien. Accumsan in nisl nisi scelerisque eu ultrices. Vivamus arcu felis bibendum ut tristique et egestas. Volutpat est velit egestas dui id. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Purus sit amet volutpat consequat. In hac habitasse platea dictumst quisque sagittis purus. Odio tempor orci dapibus ultrices in iaculis nunc. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Proin nibh nisl condimentum id venenatis a condimentum. Morbi tristique senectus et netus et. Egestas congue quisque egestas diam in arcu."
      }),
      ApiDummyPost.create({
        title: "Lacus sed viverra",
        body:
          "Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Risus ultricies tristique nulla aliquet enim tortor at auctor. Condimentum mattis pellentesque id nibh. Erat nam at lectus urna duis convallis. Malesuada bibendum arcu vitae elementum. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Ullamcorper malesuada proin libero nunc consequat interdum. Tortor condimentum lacinia quis vel eros. Semper risus in hendrerit gravida. Eget nunc lobortis mattis aliquam. Consectetur adipiscing elit duis tristique. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Urna porttitor rhoncus dolor purus non enim praesent elementum. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Quis hendrerit dolor magna eget est lorem."
      })
    ];
  }

  private readonly posts: Post[];

  async getAllPosts(): Promise<Post[]> {
    return this.posts;
  }

  async createPost({
    title,
    body
  }: {
    title: string;
    body: string;
    session: AuthenticationSession;
  }): Promise<Post> {
    return new Promise(resolve =>
      setTimeout(() => {
        const post = ApiDummyPost.create({ title, body });

        this.posts.push(post);

        resolve(post);
      }, 750)
    );
  }
}

class ApiDummyPost extends Post {
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

  static create({ title, body }: { title: string; body: string }) {
    return new ApiDummyPost({ id: new ApiDummyPostId(), title, body });
  }
}

class ApiDummyPostId extends PostId {
  constructor() {
    super();

    this.value = Math.random();
  }

  private readonly value: number;

  equals(postId: PostId): boolean {
    return postId instanceof ApiDummyPostId && postId.value === this.value;
  }

  hashCode(): number {
    return immutable.hash(this.value);
  }

  toString() {
    return this.value.toString();
  }
}

export default PostApiDummy;
