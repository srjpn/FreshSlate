import { execSync } from "child_process";
import { isToolConfigured, updateConfigurationStatus } from "../utils/tracker.js";

export function configure() {
    if (isToolConfigured("zsh")) {
        console.log("✅ Zsh is already configured. Skipping configuration.");
        return;
    }

    try {
        console.log("⚙️ Configuring Zsh...");
        execSync("echo 'export ZSH_THEME=robbyrussell' >> ~/.zshrc", { stdio: "inherit" });
        console.log("✅ Zsh configured successfully!");
        updateConfigurationStatus("zsh", true);
    } catch (error) {
        console.error(`❌ Configuration failed: ${error.message}`);
        updateConfigurationStatus("zsh", false);
    }
}
