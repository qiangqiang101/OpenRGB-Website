// Import Dependencies
const fs = require("fs");
const marked = require("marked");
const pug = require('pug');
const unzipper = require("unzipper");
const wget = require('wget-improved');

// Download ZIP
let download = wget.download("https://gitlab.com/api/v4/projects/10582521/jobs/artifacts/master/download?job=Supported%20Devices", "./markdown.zip");
download.on('error', function (err) {
    console.log(err);
});
download.on('end', function (output) {
    unZIP();
});

function unZIP() {
    // Delete ./markdown if it exists already
    if (!fs.existsSync("./markdown")) {
        fs.mkdirSync("./markdown");
    } else {
        fs.rmSync("./markdown", { recursive: true, force: true });
        fs.mkdirSync("./markdown");
    }

    // Delete ./src/html/devices if it exists already
    if (!fs.existsSync("./src/html/devices")) {
        fs.mkdirSync("./src/html/devices");
    } else {
        fs.rmSync("./src/html/devices", { recursive: true, force: true });
        fs.mkdirSync("./src/html/devices");
    }

    // UnZIP File
    fs.createReadStream('./markdown.zip')
        .pipe(unzipper.Extract({ path: './markdown' }))
        .on("finish", () => {
            // Just wait... Script was too good.
            setTimeout(function () {
                parseControllers();
                parseMain();
                fs.unlinkSync("./markdown.zip")
            }, 1000)
        })
}

function parseControllers() {
    const controllerHeader = pug.renderFile('./src/headers/controllerheader.pug');
    // Read all files in ./markdown
    fs.readdir("./markdown/", function (err, files) {
        files.forEach(function (file) {
            // Ignore Main File
            if (file !== "Supported Devices.md") {
                var md = fs.readFileSync("./markdown/" + file, "utf-8")
                var filename = file.replace("md", "html")
                var html = controllerHeader + marked.parse(md)

                // Write New HTML and Delete MD
                fs.writeFileSync("./src/html/devices/" + filename, html)
                fs.unlinkSync("./markdown/" + file)
            }
        });
    });
}

function parseMain() {
    const devicesHeader = pug.renderFile('./src/headers/devicesheader.pug');
    var uncleanHTML = marked.parse(fs.readFileSync("./markdown/Supported Devices.md", "utf-8"));
    var cleanHTML = ""
    cleanHTML = devicesHeader + uncleanHTML.replaceAll(".md", ".html")
    fs.writeFileSync("./src/html/devices/devicesInner.html", cleanHTML);
    fs.unlinkSync("./markdown/Supported Devices.md")
}

