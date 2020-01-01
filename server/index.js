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

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/page/:pageNumber", (req, res) => {

});

app.get("/profile", (req, res) => {
    return res.status(200).json({
        image: "/img/me.png",
        name: "Shaun",
        description: ["Personal blog by Shaun.", "I explain with words and code."]
    });
});

app.get("/post/:slug", (req, res) => {
    // slug is only string
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