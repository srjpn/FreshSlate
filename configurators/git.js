import { execSync } from "child_process";
import { isToolConfigured, updateConfigurationStatus } from "../utils/tracker.js";

export function configure() {
    if (isToolConfigured("git")) {
        console.log("✅ Git is already configured. Skipping configuration.");
        return;
    }

    try {
        console.log("⚙️ Configuring Git...");
        execSync('git config --global user.name "Your Name"', { stdio: "inherit" });
        execSync('git config --global user.email "your.email@example.com"', { stdio: "inherit" });
        console.log("✅ Git configured successfully!");
        updateConfigurationStatus("git", true);
    } catch (error) {
        console.error(`❌ Configuration failed: ${error.message}`);
        updateConfigurationStatus("git", false);
    }
}
