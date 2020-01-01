// eslint-disable-next-line no-undef
const db = require("../modules/Database");
db.setup();
db.addPost({
    title: "new title",
    body: "bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody",
});

db.setProfile();
console.log(db.getProfile())
