import { loadYaml } from "../utils/yamlLoader.js";
import { readTracker, updateTracker } from "../utils/tracker.js";
import { execAsync } from "../utils/exec.js";


export async function install(tool, options = {}) {
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

            if (step.command) {
                // Handle command
                await execAsync(step.command, { shell: true });
            } else if (step.script) {
                // Handle script
                const tempScript = path.join("/tmp", `${tool}-install.sh`);
                await fs.writeFile(tempScript, step.script, { mode: 0o755 });
                await execAsync(`bash ${tempScript}`, { shell: true, verbose: options.verbose });
                await fs.unlink(tempScript); // Clean up temporary file
            } else {
                console.error(
                    `❌ Invalid step: Each step must have either a 'command' or a 'script'.`
                );
                process.exit(1);
            }
        }

        updateTracker(tool, true);
        console.log(`✅ Installation of ${tool} completed.`);
    } catch (error) {
        console.error(`❌ Failed to install ${tool}:`, error.message);
    }
}
