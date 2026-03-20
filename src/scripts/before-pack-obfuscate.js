"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const projectRoot = path.resolve(__dirname, "..");
const appJsPath = path.join(projectRoot, "assets", "js", "app.js");
const backupId = crypto.createHash("sha1").update(appJsPath).digest("hex");
const backupPath = path.join(os.tmpdir(), `skynet-app-js-${backupId}.backup`);

let restoreHandlersRegistered = false;
let restoreInProgress = false;

function ensureAppJsExists() {
    if (!fs.existsSync(appJsPath)) {
        throw new Error(`Target file not found: ${appJsPath}`);
    }
}

function backupOriginalIfNeeded() {
    ensureAppJsExists();
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(appJsPath, backupPath);
    }
}

function readOriginalSource() {
    backupOriginalIfNeeded();
    return fs.readFileSync(backupPath, "utf8");
}

function restoreOriginalAppJs() {
    if (restoreInProgress || !fs.existsSync(backupPath)) {
        return;
    }

    restoreInProgress = true;
    try {
        fs.copyFileSync(backupPath, appJsPath);
        fs.unlinkSync(backupPath);
        console.log("[obfuscate-app] Restored original app.js");
    } finally {
        restoreInProgress = false;
    }
}

function registerRestoreHandlers() {
    if (restoreHandlersRegistered) {
        return;
    }

    restoreHandlersRegistered = true;
    process.on("exit", restoreOriginalAppJs);
    process.on("SIGINT", () => {
        restoreOriginalAppJs();
        process.exit(130);
    });
    process.on("SIGTERM", () => {
        restoreOriginalAppJs();
        process.exit(143);
    });
}

function obfuscateAppJs(options = {}) {
    const {
        keepObfuscated = false
    } = options;

    const originalCode = readOriginalSource();
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, {
        optionsPreset: "high-obfuscation",
        target: "browser",
        sourceMap: false
    }).getObfuscatedCode();

    fs.writeFileSync(appJsPath, obfuscatedCode, "utf8");

    if (!keepObfuscated) {
        registerRestoreHandlers();
    }

    console.log(`[obfuscate-app] Obfuscated ${appJsPath}`);
    return appJsPath;
}

async function beforePack() {
    obfuscateAppJs();
}

beforePack.obfuscateAppJs = obfuscateAppJs;
beforePack.restoreOriginalAppJs = restoreOriginalAppJs;
beforePack.getPaths = () => ({
    appJsPath,
    backupPath
});

module.exports = beforePack;

if (require.main === module) {
    const shouldRestore = process.argv.includes("--restore");
    const keepObfuscated = process.argv.includes("--keep-obfuscated");

    try {
        if (shouldRestore) {
            restoreOriginalAppJs();
        } else {
            obfuscateAppJs({
                keepObfuscated
            });
        }
    } catch (error) {
        console.error("[obfuscate-app] Failed:", error.message);
        process.exitCode = 1;
    }
}
