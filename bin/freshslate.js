#!/usr/bin/env node

import { Command } from "commander";
import { install } from "../commands/install.js";

const program = new Command();

program
    .name("freshslate")
    .description("FreshSlate CLI - Automate your macOS setup")
    .version("0.1.0");

program
    .command("install <tool>")
    .description("Install a tool or configuration")
    .action((tool) => {
        install(tool);
    });

program.parse(process.argv);
