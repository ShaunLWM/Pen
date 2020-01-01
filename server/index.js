/* eslint-disable no-undef */
require("dotenv").config();

const express = require("express")
const app = express();

/*
id: number,
slug: string,
title: string,
body: string,
date: string
*/

app.use(express.static("public"))
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

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening on port ${port}!`))