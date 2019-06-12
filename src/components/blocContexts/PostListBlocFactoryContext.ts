import { createContext } from "react";
import PostListBlocFactory from "../../usecases/PostListBlocFactory";

const PostListBlocFactoryContext = createContext<PostListBlocFactory>(
  undefined as any
);

export default PostListBlocFactoryContext;
