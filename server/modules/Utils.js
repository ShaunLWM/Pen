const stripHtml = require("string-strip-html");

module.exports = {
    calculateReadingTime(body, strip = true) {
        let stripped = body;
        if (strip) stripped = stripHtml(body);
        const wordCount = stripped.replace(/[^\w ]/g, "").split(/\s+/).length;
        return parseInt(Math.floor(wordCount / 228) + 1, 10);
    },
    cleanBody(body) {
        return body.replace(/(?:\r\n|\r|\n)/g, "");
    },
};
