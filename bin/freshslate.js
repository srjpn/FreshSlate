#!/usr/bin/env node

import { Command } from "commander";
import { install } from "../commands/install.js";
import { configure } from "../commands/configure.js";

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

program
    .command("configure <tool>")
    .description("Configure a specific tool")
    .action((tool) => {
        configure(tool);
    });

program.parse(process.argv);
