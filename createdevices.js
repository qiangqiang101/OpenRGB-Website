// Import Dependencies
const fs = require("fs");
const marked = require("marked");
const pug = require('pug');
const https = require("https");

// Declare Variables
var cleanMD = ""
var uncleanHTML = ""
var cleanHTML = ""
var uncleanMD = ""

// Import Header
const htmlHeader = pug.renderFile('./src/html/devicesheader.pug');

// Download MD
https.get("https://gitlab.com/OpenRGBDevelopers/OpenRGB-Wiki/-/raw/stable/Supported%20Devices/Supported%20Devices.md", (res) => {
    res.on('data', function (chunk) {
        uncleanMD += chunk
    });
    res.on('end', function () {
        writeHTML();
    });
});

function writeHTML() {
    // Setup Variables to Filter Links
    const markdownLinkRegex = /\(.*\.md\)/g
    const positionRegex = /\(#.*\)/g

    // Clean Links
    cleanMD = uncleanMD.replaceAll("[", "")
    cleanMD = cleanMD.replaceAll("]", "")
    cleanMD = cleanMD.replaceAll(markdownLinkRegex, "")
    cleanMD = cleanMD.replaceAll(positionRegex, "")

    // Compile MD Into HTML
    uncleanHTML = marked.parse(cleanMD);

    // Format Emoji to Unicode Variants
    cleanHTML = uncleanHTML.replaceAll(":x:", "❌");
    cleanHTML = cleanHTML.replaceAll(":robot:", "🤖");
    cleanHTML = cleanHTML.replaceAll(":tools:", "⚒️");
    cleanHTML = cleanHTML.replaceAll(":rotating_light:", "🚨");
    cleanHTML = cleanHTML.replaceAll(":white_check_mark:", "✔️");
    cleanHTML = cleanHTML.replaceAll(":o:", "🚫");

    // Add Header to HTML
    cleanHTML = htmlHeader + cleanHTML

    // Write HTML
    fs.writeFileSync("./src/html/devicesInner.html", cleanHTML);
}

