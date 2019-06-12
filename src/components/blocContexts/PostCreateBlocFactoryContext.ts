import { createContext } from "react";
import PostCreateBlocFactory from "../../usecases/PostCreateBlocFactory";

const PostCreateBlocFactoryContext = createContext<PostCreateBlocFactory>(
  undefined as any
);

export default PostCreateBlocFactoryContext;
