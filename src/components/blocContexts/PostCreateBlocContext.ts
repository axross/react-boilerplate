import { createContext } from "react";
import PostCreateBloc from "../../usecases/PostCreateBloc";

const PostCreateBlocContext = createContext<PostCreateBloc>(undefined as any);

export default PostCreateBlocContext;
