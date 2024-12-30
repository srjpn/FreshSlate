import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const trackerFilePath = path.join(__dirname, "../installations.json");

function readTracker() {
    if (!fs.existsSync(trackerFilePath)) {
        return {};
    }
    const data = fs.readFileSync(trackerFilePath, "utf-8");
    return JSON.parse(data);
}

function updateTracker(tool, status) {
    const tracker = readTracker();
    tracker[tool] = status;
    fs.writeFileSync(trackerFilePath, JSON.stringify(tracker, null, 2));
}

function isToolInstalled(tool) {
    const tracker = readTracker();
    return tracker[tool] === true;
}

function isToolConfigured(tool) {
    const tracker = readTracker();
    return tracker[`${tool}_configured`] === true;
}

function updateConfigurationStatus(tool, status) {
    const tracker = readTracker();
    tracker[`${tool}_configured`] = status;
    fs.writeFileSync(trackerFilePath, JSON.stringify(tracker, null, 2));
}


export { readTracker, updateTracker, isToolInstalled, isToolConfigured, updateConfigurationStatus };
