import { loadYaml } from "../utils/yamlLoader.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function configure(tool) {
    try {
        console.log(`Starting configuration for ${tool}...`);

        const steps = await loadYaml(`./commands/tools/${tool}.yaml`);
        if (!steps.configure) {
            console.log(`No configuration steps defined for ${tool}.`);
            return;
        }

        for (const step of steps.configure) {
            if (step.command) {
                console.log(`➡️  ${step.description}`);
                await execAsync(step.command, { shell: true });
            } else if (step.script) {
                console.log(`➡️  ${step.description}`);
                await execAsync(step.script, { shell: true });
            }
        }

        console.log(`✅ Configuration of ${tool} completed.`);
    } catch (error) {
        console.error(`❌ Failed to configure ${tool}:`, error.message);
    }
}
