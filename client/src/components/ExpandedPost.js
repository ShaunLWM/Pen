import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { serverUrl } from "../App";
import CustomContentLoader from "../lib/CustomContentLoader";
import { store } from "../store";
import PostBody from "./Post/PostBody";
import PostSubtitle from "./Post/PostSubtitle";
import PostTitle from "./Post/PostTitle";

export default function ExpandedPost(props) {
    const globalState = useContext(store);
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [isError, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function fetchPost(id) {
            try {
                const results = await axios.get(`${serverUrl}/post/${id}`);
                setPost(results.data);
            } catch (error) {
                setError(true);
            }

            return setLoading(false);
        }

        if (typeof props.match === "undefined") return history.push("/");
        const postSlug = props.match.params["postSlug"];
        if (typeof globalState["state"]["posts"] === "undefined" || globalState["state"]["posts"].length < 1) {
            // if user directly goes to the url, we have to refetch the data from the url
            fetchPost(postSlug);
        } else {
            const postIndex = globalState["state"]["posts"].findIndex((v) => v["slug"] === postSlug);
            if (postIndex > -1) {
                setPost(globalState["state"]["posts"][postIndex]);
                setLoading(false);
            } else {
                fetchPost(postSlug);
            }
        }
    }, [history, props, globalState]);

    if (isLoading) return (<CustomContentLoader />);
    if (isError) return (<h2>Failed to fetch post.</h2>);
    return (
        <>
            <PostTitle shouldLink={false} {...post} />
            <PostSubtitle {...post} />
            <PostBody body={post["post_body"]} />
        </>
    );
}
