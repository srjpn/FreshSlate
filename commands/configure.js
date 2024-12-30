import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function configure(tool) {
    const configuratorsDir = path.join(__dirname, "../configurators");

    try {
        const configuratorPath = path.join(configuratorsDir, `${tool}.js`);
        if (fs.existsSync(configuratorPath)) {
            const { configure } = await import(`../configurators/${tool}.js`);
            configure();
        } else {
            console.error(`❌ No configurator found for "${tool}".`);
        }
    } catch (error) {
        console.error(`❌ Failed to run configurator for "${tool}": ${error.message}`);
    }
}
