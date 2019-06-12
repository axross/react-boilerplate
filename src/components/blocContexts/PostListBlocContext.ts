import { createContext } from "react";
import PostListBloc from "../../usecases/PostListBloc";

const PostListBlocContext = createContext<PostListBloc>(undefined as any);

export default PostListBlocContext;
