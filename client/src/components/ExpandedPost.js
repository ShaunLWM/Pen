import React, { useEffect } from 'react';
export default function ExpandedPost(props) {

    useEffect(() => {
        let id = props.match.params["postId"];
        console.log(`PostId: ${id}`);
    }, []);

    return (
        <h1>HELLO</h1>
    )
}