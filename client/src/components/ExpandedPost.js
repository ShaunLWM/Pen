import Button from '@material-ui/core/Button';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomContentLoader from "../lib/CustomContentLoader";

export default function ExpandedPost(props) {
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
        fetchPost(postId);
    }, [history, props]);

    if (isLoading) return (<CustomContentLoader />)

    return (
        <>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <h1>{post["title"]}</h1>
            {post["body"]}
        </>
    )
}