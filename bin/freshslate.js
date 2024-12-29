#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { install } from '../commands/install.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1);

async function main() {
    try {
        switch (command) {
            case 'install':
                await install(options);
                break;
            case 'configure':
                console.log('Configure command coming soon!');
                break;
            default:
                console.log(`
FreshSlate - Project Initialization Tool

Usage:
  freshslate install [template-name]  Install a new project
  freshslate configure               Configure FreshSlate settings (coming soon)

For more information, visit: https://github.com/yourusername/freshslate
                `);
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
