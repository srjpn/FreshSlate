import { execSync } from "child_process";
import { isToolInstalled, updateTracker } from "../utils/tracker.js";

export function install() {
    if (isToolInstalled("zsh")) {
        console.log("✅ Zsh is already installed. Skipping installation.");
        return;
    }

    try {
        console.log("🛠 Installing Zsh using Homebrew...");
        execSync("brew install zsh", { stdio: "inherit" });
        console.log("✅ Zsh installed successfully!");
        updateTracker("zsh", true);
    } catch (error) {
        console.error(`❌ Installation failed: ${error.message}`);
        updateTracker("zsh", false);
    }
}
