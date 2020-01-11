/* eslint-disable no-undef */
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
const avatarUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "public/img");
        },
        filename(req, file, cb) {
            const ext = file.originalname.split(".").pop();
            cb(null, `me.${ext}`);
        },
    }),
});

const Database = require("./modules/Database");

const defaultProfile = {
    profile_image: "",
    profile_name: "",
    profile_description: ["", ""],
};

app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    const results = Database.getPage({ page: 1 });
    if (typeof results === "undefined") return res.status(404).json({ message: "Page not found" });
    return res.status(200).json(results);
});

app.get("/page/:pageNumber", (req, res) => {
    let page = parseInt(req["params"]["pageNumber"], 10);
    if (page < 0) page = 0;
    const results = Database.getPage({ page });
    if (typeof results === "undefined") return res.status(404).json({ message: "Page not found" });
    return res.status(200).json(results);
});

app.get("/profile", (req, res) => {
    const profile = Database.getProfile();
    if (typeof profile === "undefined") return res.status(200).json(defaultProfile);
    return res.status(200).json({
        ...profile,
        profile_description: JSON.parse(profile["profile_description"]),
    });
});

app.post("/profile", avatarUpload.single("avatar"), (req, res) => {
    const profile = Database.getProfile();
    let body = Object.assign(defaultProfile, req.body);
    if (typeof req.file !== "undefined") body = Object.assign(body, { profile_image: req.file.filename });
    if (typeof profile === "undefined") {
        Database.setProfile(body);
    } else {
        if (profile["profile_image"] !== req.file.filename) fs.unlinkSync(`public/img/${profile["profile_image"]}`);
        Database.updateProfile(body);
    }

    return res.status(200).json({ success: true });
});

app.get("/post/:slug", (req, res) => {
    const results = Database.getPost({ slug: req["params"]["slug"] });
    if (typeof results === "undefined") return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(results);
});

app.post("/post", (req, res) => {
    if (typeof req["body"] === "undefined") return res.status(200).json({ success: false });
    Database.addPost({
        title: req["body"]["title"],
        body: req["body"]["body"],
    });

    return res.status(200).json({ success: true });
});

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-console
app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening on port ${process.env.SERVER_PORT}!`));
