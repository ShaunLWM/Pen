/* eslint-disable no-undef */
require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const Database = require("./modules/Database");

app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cors());

app.get("/", (req, res) => {
    const results = Database.getPage({ page: 1 })
    if (typeof results === "undefined") return res.status(404).json({ message: "Page not found" });
    return res.status(200).json(results);
})

app.get("/page/:pageNumber", (req, res) => {
    let page = parseInt(req["params"]["pageNumber"], 10);
    if (page < 0) page = 0;
    const results = Database.getPage({ page })
    if (typeof results === "undefined") return res.status(404).json({ message: "Page not found" });
    return res.status(200).json(results);
});

app.get("/profile", (req, res) => {
    return res.status(200).json({
        img: "/img/me.png",
        name: "Shaun",
        description: ["Personal blog by Shaun.", "I explain with words and code."]
    });
});

app.get("/post/:slug", (req, res) => {
    const results = Database.getPost({ slug: req["params"]["slug"] });
    if (typeof results === "undefined") return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(results);
});

app.post("/", (req, res) => {
    if (typeof req["body"] === "undefined") return res.status(200).json({ success: false });
    Database.addPost({
        title: req["body"]["title"],
        body: req["body"]["body"]
    })

    return res.status(200).json({ success: true });
})

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening on port ${process.env.SERVER_PORT}!`))
