import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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


export default function EditorTab() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentError, setCurrentError] = useState("");

    const handleSubmitClick = async () => {
        if (currentTitle.length < 1) return setCurrentError("Title is blank");
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        if (body.length < 8) return setCurrentError("Body is blank");
        setCurrentError("");
        try {
            await axios.post("http://localhost:3001/", { title: currentTitle, body });
            window.location.reload();
        } catch (error) {
            setCurrentError(error);
        }

        return null;
    };

    return (
        <div>
            <Typography variant="h6">{currentError}</Typography>
            <form noValidate autoComplete="off">
                <TextField required id="standard-basic" label="Title" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
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
                <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
            </form>
        </div>
    );
}
