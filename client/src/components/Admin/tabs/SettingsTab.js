import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";

export default function SettingsTab() {
    const [currentProfile, setCurrentProfile] = useState({
        profile_name: "",
        profile_image: "",
        profile_description: "",
    });

    const [currentName, setCurrentName] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentError, setCurrentError] = useState("");

    const [currentAvatarFile, setAvatarFile] = useState("");
    const [currentPreviewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const results = await axios.get(`${serverUrl}/profile`);
                setCurrentProfile(results.data);
                setCurrentName(results.data["profile_name"]);
                setCurrentDescription(`${results.data["profile_description"].join(". ")}.`);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();
    }, []);

    const handleImageChange = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setAvatarFile(file);
            setPreviewUrl(reader.result);
        };

        reader.readAsDataURL(file);
    }

    const handleSubmitClick = async () => {
        if (currentName.length < 1) return setCurrentError("Name is blank");
        if (setCurrentDescription.length < 1) return setCurrentError("Description is blank");
        const splitDescription = currentDescription.split(".").map((v) => v.trim());
        if (splitDescription.length > 2) return setCurrentError("Description can only be 2 lines");
        setCurrentError("");
        const newProfile = Object.assign(currentProfile, { profile_name: currentName, profile_description: JSON.stringify(splitDescription) });
        try {
            await axios.post(`${serverUrl}/profile`, newProfile);
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
                <Avatar alt="me!" src={currentPreviewUrl} style={{ float: "left" }} />
                <input className="fileInput" style={{ float: "right" }}
                    type="file"
                    onChange={handleImageChange} />
                <br /><br />
                <TextField id="input-profile-name" label="Name" fullWidth value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                <br />
                <TextField id="input-profile-description" label="Description (2 lines)" fullWidth multiline rowsMax="2" value={currentDescription} onChange={(e) => setCurrentDescription(e.target.value)} />
                <br /><br />
                <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
            </form>
        </div>
    );
}
