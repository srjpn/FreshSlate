import { execSync } from "child_process";

export function install() {
    try {
        console.log("🛠 Installing Zsh using Homebrew...");
        execSync("brew install zsh", { stdio: "inherit" });
        console.log("✅ Zsh installed successfully!");
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error("❌ Homebrew is not installed. Please install Homebrew first.");
            console.error("➡ Visit https://brew.sh/ for installation instructions.");
        } else {
            console.error(`❌ Installation failed: ${error.message}`);
        }
    }
}
