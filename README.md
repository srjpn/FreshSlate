# FreshSlate CLI

FreshSlate is a command-line tool designed to automate the setup and configuration of development environments on macOS. It provides an easy and customizable way to install essential tools and configure settings for your development environment.

## Features

- **Tool Installation**: Install tools like Zsh, Git, Visual Studio Code, and others with ease.
- **Configuration**: Configure tools (e.g., Git, SSH keys) for specific use cases and preferences.
- **Tracker**: Track installed tools and configurations to ensure idempotency (tools are only installed once).
- **SSH Key Management**: Automatically generate and configure SSH keys for different use cases (e.g., Git).
- **Extensible**: Easily add more installation and configuration steps by adding YAML files.

## Usage

Once installed, you can run the FreshSlate CLI commands from your terminal. Here's how to use it:

```bash
freshslate [command] [options]
```

###  Available Commands
* install: Installs and configures tools (e.g., Zsh, Git, Visual Studio Code).
* configure: Configures the installed tools (e.g., setting up SSH keys, Git configurations).


### Example Usage

``` bash
# Install Zsh and make it the default shell
freshslate install --tool zsh

# Install Git and configure with a custom gitconfig file
freshslate install --tool git

# Install Visual Studio Code and extensions
freshslate install --tool vscode

# Add SSH keys for personal and default use
freshslate install --tool ssh
```

You can also run a specific tool's installation and configuration via a YAML file configuration.

## Adding More Tools

To add more tools and configurations to FreshSlate, simply:

* Create a YAML file in the configs folder.
* Define the installation steps and configurations.
* The CLI will automatically read these files and execute the steps when you run the command.

**Example YAML (for Git)**

``` yaml
  install:
    - description: "Install Git"
      command: "brew install git"
    - description: "Set up global git config"
      command: "git config --global user.name 'Your Name'"
      command: "git config --global user.email 'youremail@example.com'"
  configure:
    - description: "Configure personal git settings"
      command: "git config --global core.editor 'vim'"

```

## Configuration Files

FreshSlate uses YAML files to define installation and configuration steps. These files are located in the configs directory. Each tool or configuration should have its own YAML file, such as `install-zsh.yaml`, `install-vscode.yaml`, etc.

## Contributing

We welcome contributions! If you'd like to add a new tool, fix a bug, or improve the documentation, please feel free to submit a pull request.
