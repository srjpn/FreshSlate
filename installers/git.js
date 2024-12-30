import { execSync } from "child_process";

export function install() {
    try {
        console.log("🛠 Installing Git using Homebrew...");
        execSync("brew install git", { stdio: "inherit" });
        console.log("✅ Git installed successfully!");
    } catch (error) {
        console.error(`❌ Installation failed: ${error.message}`);
    }
}
