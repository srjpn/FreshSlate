import { loadYaml } from "../utils/yamlLoader.js";
import { readTracker, updateTracker } from "../utils/tracker.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function install(tool) {
    try {
        console.log(`Starting installation for ${tool}...`);

        const tracker = readTracker();
        if (tracker[tool]) {
            console.log(`${tool} is already installed. Skipping.`);
            return;
        }

        const steps = await loadYaml(`./commands/tools/${tool}.yaml`);
        if (!steps.install) {
            console.log(`No installation steps defined for ${tool}.`);
            return;
        }

        for (const step of steps.install) {
            console.log(`➡️  ${step.description}`);
            await execAsync(step.command, { shell: true });
        }

        updateTracker(tool, true);
        console.log(`✅ Installation of ${tool} completed.`);
    } catch (error) {
        console.error(`❌ Failed to install ${tool}:`, error.message);
    }
}
