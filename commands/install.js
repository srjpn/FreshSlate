import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function install(tool) {
    const installersDir = path.join(__dirname, "../installers");

    try {
        const installerPath = path.join(installersDir, `${tool}.js`);
        if (fs.existsSync(installerPath)) {
            const { install } = await import(`../installers/${tool}.js`);
            install();
        } else {
            console.error(`❌ No installer found for "${tool}".`);
        }
    } catch (error) {
        console.error(`❌ Failed to run installer for "${tool}": ${error.message}`);
    }
}
