import fs from "fs";

function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
            throw err;
        } else {
            callback(null, html);
        }
    });
}

export default readHTMLFile;