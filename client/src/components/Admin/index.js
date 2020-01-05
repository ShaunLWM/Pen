import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open("POST", "https://api.imgur.com/3/image");
            xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
            const data = new FormData(); // eslint-disable-line no-undef
            data.append("image", file);
            xhr.send(data);
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        },
    );
}
async function uploadNewPost({ title, body }) {
    try {
        await axios.post(
            "http://localhost:3001/", { title, body },
        );
    } catch (error) {
        console.error(error);
    }
}

export default function EditorConvertToHTML() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField required id="standard-basic" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            uploadCallback: uploadImageCallBack,
                        },
                    }}
                />
                <Button variant="contained" onClick={() => uploadNewPost({
                    title,
                    body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                })}>Default</Button>
            </form>

            <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
}
