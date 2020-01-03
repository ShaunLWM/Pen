import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import { useImmerReducer } from "use-immer";

const initialState = {
    lastUpdated: 0,
    currentPage: 1,
    posts: [],
    post: {},
    profile: {},
    currentTheme: "light"
};

const store = createContext(initialState);
const { Provider } = store;

function reducerFunction(draft, action) {
    switch (action.type) {
        case "setPosts":
            draft["posts"] = action["data"];
            draft["lastUpdated"] = Math.floor(new Date().getTime() / 1000);
            break;
        case "nextPage":
            draft["currentPage"] = draft["currentPage"] + 1;
            break;
        case "setProfile":
            draft["profile"] = action["data"];
            break;
        case "previousPage":
            draft["currentPage"] = draft["currentPage"] - 1;
            break;
        case "setTheme":
            draft["currentTheme"] = action["data"];
            break;
        default:
            draft = initialState;
    }
}

const StateProvider = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducerFunction, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

StateProvider.propTypes = {
    children: PropTypes.element
}