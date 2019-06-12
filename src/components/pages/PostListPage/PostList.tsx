import styled from "@emotion/styled";
import * as React from "react";
import PostListBlocContext from "../../blocContexts/PostListBlocContext";
import ObservableRenderer from "../../common/ObservableRenderer";
import PostSummary from "../../common/PostSummary";
import TextThemeContext from "../../common/TextThemeContext";

interface Props extends React.Attributes {
  className?: string;
}

function PostList(props: Props) {
  const postListBloc = React.useContext(PostListBlocContext);

  return (
    <Root {...props}>
      <TextThemeContext.Provider value={{ color: "#fff" }}>
        <ObservableRenderer
          observable={postListBloc.posts}
          initialData={postListBloc.currentPosts}
        >
          {postsSnapshot => (
            <ObservableRenderer
              observable={postListBloc.updatingPosts}
              initialData={postListBloc.currentUpdatingPosts}
            >
              {updatingPostsSnapshot => (
                <>
                  {postsSnapshot.data
                    .reverse()
                    .map(post => (
                      <Item
                        post={post}
                        loading={updatingPostsSnapshot.data.includes(post)}
                        key={post.id.toString()}
                      />
                    ))
                    .toArray()}
                </>
              )}
            </ObservableRenderer>
          )}
        </ObservableRenderer>
      </TextThemeContext.Provider>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Item = styled(PostSummary)`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

export default PostList;
