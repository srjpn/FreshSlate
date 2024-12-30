import { exec } from "child_process";

export async function execAsync(command, options = {}) {
    return new Promise((resolve, reject) => {
        const child = exec(command, options);

        if (options.verbose) {
            child.stdout.on("data", (data) => {
                process.stdout.write(data); // Log stdout
            });

            child.stderr.on("data", (data) => {
                process.stderr.write(data); // Log stderr
            });
        }

        child.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}: ${command}`));
            }
        });
    });
}
