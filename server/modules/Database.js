/* eslint-disable no-undef */
const SQLite3 = require("better-sqlite3");
const slugify = require("@sindresorhus/slugify");
const Utils = require("./Utils");

class Database {
    constructor() {
        this.db = new SQLite3("database.db", { verbose: console.log });
        this.setup();
    }

    setup() {
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS post (
            post_id INTEGER PRIMARY KEY,
            post_slug VARCHAR(50) NOT NULL,
            post_title VARCHAR(50) NOT NULL,
            post_body TEXT NOT NULL,
            post_date INTEGER(10) NOT NULL,
            post_reading_time INTEGER(10) DEFAULT 5
        );

        CREATE TABLE IF NOT EXISTS profile (
            profile_id INTEGER PRIMARY KEY,
            profile_name VARCHAR(50) NOT NULL,
            profile_image VARCHAR(50) NOT NULL,
            profile_description VARCHAR(50) NOT NULL
        );
        `);
    }

    getAll() {
        const stmt = this.db.prepare("SELECT * FROM post ORDER BY post_date DESC");
        return stmt.all();
    }

    getPage({ page = 1 }) {
        const postPerPage = 10;
        const startAt = postPerPage * (page - 1);
        const stmt = this.db.prepare("SELECT* FROM post ORDER BY post_id DESC LIMIT ?, ?");
        return stmt.all(startAt, postPerPage);
    }

    getPost({ slug }) {
        const stmt = this.db.prepare("SELECT * FROM post WHERE post_slug = ?");
        return stmt.get(slug);
    }

    addPost({ title, body }) {
        const postBody = Utils.cleanBody(body);
        const readingTime = Utils.calculateReadingTime(postBody, true);
        const stmt = this.db.prepare("INSERT INTO post (post_slug, post_title, post_body, post_date, post_reading_time) VALUES (?, ?, ?, ?, ?)");
        stmt.bind(slugify(title), title, postBody, Math.floor(new Date() / 1000), readingTime);
        return stmt.run();
    }

    deletePost({ slug }) {
        const stmt = this.db.prepare("DELETE FROM post WHERE slug = ?");
        return stmt.run(slug);
    }

    updatePost({ id, title, body }) {
        const postBody = Utils.cleanBody(body);
        const readingTime = Utils.calculateReadingTime(postBody, true);
        const stmt = this.db.prepare("UPDATE post SET post_slug = ?, post_title = ?, post_body = ?, post_date = ?, post_reading_time = ? WHERE post_id = ?"); // old slug
        return stmt.run(slugify(title), title, postBody, Math.floor(new Date() / 1000), readingTime, id);
    }

    getProfile() {
        const stmt = this.db.prepare("SELECT * FROM profile WHERE profile_id = ?");
        return stmt.get(1);
    }

    setProfile({ profile_name = "", profile_image = "", profile_description = "" }) {
        const stmt = this.db.prepare("INSERT INTO profile (profile_name, profile_image, profile_description) VALUES (?, ?, ?)");
        stmt.bind(profile_name, profile_image, profile_description);
        return stmt.run();
    }

    updateProfile({ profile_name = "", profile_image = "", profile_description = "" }) {
        const stmt = this.db.prepare("UPDATE profile SET profile_name = ?, profile_image = ?, profile_description = ? WHERE profile_id = ?"); // old slug
        return stmt.run(profile_name, profile_image, profile_description, 1);
    }
}

// eslint-disable-next-line no-undef
module.exports = new Database();
