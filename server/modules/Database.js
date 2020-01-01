/* eslint-disable no-undef */
const database = require("better-sqlite3");
const slugify = require("@sindresorhus/slugify");

class Database {
    constructor() {
        this.db = new database("database.db", { verbose: console.log });
    }

    setup() {
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS post (
            post_id INTEGER PRIMARY KEY,
            post_slug VARCHAR(50) NOT NULL,
            post_title VARCHAR(50) NOT NULL,
            post_body TEXT NOT NULL,
            post_date VARCHAR(10) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS profile (
            profile_name VARCHAR(50) NOT NULL,
            profile_image VARCHAR(50) NOT NULL,
            profile_description VARCHAR(50) NOT NULL
        );
        `)
    }

    getPosts({ page = 1 }) {
        let postPerPage = 10;
        let startAt = postPerPage * (page - 1);
        const stmt = this.db.prepare("SELECT* FROM post ORDER BY post_date DESC LIMIT ?, ?");
        return stmt.run(startAt, postPerPage);
    }

    getPost({ slug }) {
        let stmt = db.prepare("SELECT * FROM post WHERE post_slug = ?");
        return stmt.get(slug);
    }

    addPost({ title, body }) {
        const stmt = this.db.prepare("INSERT INTO post (post_slug, post_title, post_body, post_date) VALUES (?, ?, ?, ?)");
        stmt.bind(slugify(title), title, body, Math.floor(new Date() / 1000));
        return stmt.run();
    }

    deletePost({ slug }) {
        let stmt = db.prepare("DELETE FROM post WHERE slug = ?");
        return stmt.run(slug);
    }

    updatePost({ title, body }) {
        let stmt = db.prepare("UPDATE post SET post_slug = ?, post_title = ?, post_body = ?, post_date = ? WHERE post_slug = ?");
        return stmt.run(slugify(title), title, body, Math.floor(new Date() / 1000));
    }

    getProfile() {
        const stmt = this.db.prepare("SELECT * FROM profile");
        return stmt.get();
    }

    setProfile({ name, image, description }) {
        const stmt = this.db.prepare("INSERT INTO profile (profile_name, profile_image, profile_description) VALUES (?, ?, ?)");
        stmt.bind(name, image, description);
        return stmt.run();
    }
}

// eslint-disable-next-line no-undef
module.exports = new Database();