import git from '../commands/tools/git.yaml';
import nvm from '../commands/tools/nvm.yaml';
import ssh from '../commands/tools/ssh.yaml';
import vscode from '../commands/tools/vscode.yaml';
import zsh from '../commands/tools/zsh.yaml';

export const toolConfigs = {
    git,
    nvm,
    ssh,
    vscode,
    zsh
};

export function getToolConfig(tool) {
    if (!toolConfigs[tool]) {
        throw new Error(`Configuration not found for tool: ${tool}`);
    }
    return toolConfigs[tool];
}
