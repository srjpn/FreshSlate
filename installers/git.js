import { execSync } from "child_process";
import { isToolInstalled, updateTracker } from "../utils/tracker.js";

export function install() {
    if (isToolInstalled("git")) {
        console.log("✅ Git is already installed. Skipping installation.");
        return;
    }

    try {
        console.log("🛠 Installing Git using Homebrew...");
        execSync("brew install git", { stdio: "inherit" });
        console.log("✅ Git installed successfully!");
        updateTracker("git", true);
    } catch (error) {
        console.error(`❌ Installation failed: ${error.message}`);
        updateTracker("git", false);
    }
}
