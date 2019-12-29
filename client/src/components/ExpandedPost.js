import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CustomContentLoader from "../lib/CustomContentLoader";
import PostTitle from "./Post/PostTitle";
import { store } from "../store";

export default function ExpandedPost(props) {
    const globalState = useContext(store);
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [, setError] = useState(null);
    let history = useHistory();

    useEffect(() => {
        async function fetchPost(id) {
            try {
                let results = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );

                setPost(results.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        if (typeof props.match === "undefined") return history.push("/");
        let postId = props.match.params["postId"];
        let postIndex = globalState["state"]["posts"].findIndex(v => v.id === parseInt(postId));
        if (postIndex > -1) {
            setPost(globalState["state"]["posts"][postIndex]);
            setLoading(false);
        } else {
            fetchPost(postId);
        }
    }, [history, props, globalState]);

    if (isLoading) return (<CustomContentLoader />)
    return (
        <>
            {/* <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button> */}
            <PostTitle shouldLink={false} {...post} />
            {post["body"]}
        </>
    )
}