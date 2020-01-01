// eslint-disable-next-line no-undef
const db = require("../modules/Database");
// db.setup();
// for (let i = 6; i < 20; i++) {
//     db.addPost({
//         title: `${i} - title`,
//         body: `${i} - body`
//     });
// }

// db.setProfile();
// console.log(db.getProfile())
//console.log(db.getPost({ slug: "adawdwadwadiawndfoiawd89" }))
//console.log(db.getAll())
console.log(db.getPage({ page: 1 }))



// const sleep = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve, 2000);
//     });
// }

// async function test() {
//     for (let i = 0; i < 20; i++) {
//         db.addPost({
//             title: `${i} - title`,
//             body: `${i} - body`
//         });
//         await sleep();
//     }
// }

// test();