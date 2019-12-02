import { createContext } from "react";

const initialState = {
    post: []
};

const PostsContext = createContext(initialState);
function PostsProvider(props) {
    return (
        <PostsContext.Provider value={initialState}>
            {props.children}
        </PostsContext.Provider>
    )
}

export { CounterContext, CounterProvider };
