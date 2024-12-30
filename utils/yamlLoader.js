import { readFile } from "fs/promises";
import yaml from "js-yaml";

export async function loadYaml(filePath) {
    try {
        const fileContents = await readFile(filePath, "utf8");
        return yaml.load(fileContents);
    } catch (error) {
        throw new Error(`Failed to load YAML file at ${filePath}: ${error.message}`);
    }
}
