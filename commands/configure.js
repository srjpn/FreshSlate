import { loadYaml } from "../utils/yamlLoader.js";
import { execAsync } from "../utils/exec.js";
import { updateConfigurationStatus, readTracker } from "../utils/tracker.js";

export async function configure(tool, options = {}) {
    try {
        console.log(`Starting configuration for ${tool}...`);

        const tracker = readTracker();
        if (tracker[`${tool}_configured`]) {
            console.log(`${tool} is already configured. Skipping.`);
            return;
        }

        const steps = await loadYaml(`./commands/tools/${tool}.yaml`);
        if (!steps.configure) {
            console.log(`No configuration steps defined for ${tool}.`);
            return;
        }

        for (const step of steps.configure) {
            if (step.command) {
                console.log(`➡️  ${step.description}`);
                await execAsync(step.command, { shell: true, verbose: options.verbose });
            } else if (step.script) {
                console.log(`➡️  ${step.description}`);
                await execAsync(step.script, { shell: true, verbose: options.verbose });
            }
        }

        updateConfigurationStatus(tool, true);
        console.log(`✅ Configuration of ${tool} completed.`);
    } catch (error) {
        console.error(`❌ Failed to configure ${tool}:`, error.message);
    }
}
