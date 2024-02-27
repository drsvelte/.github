## Drupal Tailwind CSS Prototype

<img alt="Drupal Logo" src="https://www.drupal.org/files/Wordmark_blue_RGB.png" height="60px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Tailwind CSS Logo" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" height="60px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img alt="DDEV Logo" src="https://raw.githubusercontent.com/ddev/ddev/20a58d492180f5c9a7b22767c8a15809de6a01b6/docs/content/developers/logos/SVG/Logo_w_text.svg" height="60px">

This is the initial draft prototype to design the agency Drupal theme in [Tailwind CSS](https://tailwindcss.com).

<details open>
<summary>Table of Contents</summary>

- [Project Info](#project-info)
  - [Git Repository](#git-repository)
- [Getting Started](#getting-started)
    - [Install PowerShell](#install-powershell)
    - [Install Ubuntu Linux on Windows with WSL](#install-ubuntu-linux-on-windows-with-wsl)
    - [Install Docker and DDEV](#install-docker-and-ddev)
    - [Clone this repository from GitHub](#clone-this-repository-from-github)
    - [Start DDEV](#start-ddev)
    - [Update Drupal](#update-drupal)
    - [Git Version Control](#git-repository)
    - [Snapshots](#snapshots)
    - [Uninstalling DDEV](#uninstalling-ddev)
- [Development Tools](#development-tools)
- [Accessibility Requirements](#accessibility-requirements)
    - [Accessibility Tools](#accessibility-tools)
- [Resources](#resources)
- [Contributing](#contributing)
- [Legal Matters](#legal-matters)

</details>

## Project Info

- Current Version: 1.0.0-alpha.
- Development Version: 1.0.0-alpha.1.
- [Drupal](https://drupal.org) version: 10.2.3.
- [Tailwind CSS](https://tailwindcss.com).
    - [Tailwind UI](https://tailwindui.com) - Premium components for Tailwind CSS.
    - [Alpine.js](https://alpinejs.dev/) - Transitions, animations, and components.
- [Storybook](https://git.drupalcode.org/project/storybook/-/blob/1.x/README.md?ref_type=heads#prepare-ddev-for-running-the-storybook-application) for Drupal.
    - Enable CORS, so the Storybook application can talk to the Drupal site. This CORS configuration to be in development.services.yml so it does not get changed in your production environment. If you mean to use CL Server in production, make sure to restrict CORS as much as possible. **Remember CL Server development mode SHOULD be disabled in production in web/sites/default/development/services.yml**.

### Git Repository

Project will use [git](https://git-scm.com/) to maintain the source code.

- [GitHub](https://github.com) - Initial repository for this project.
- Organization Repository: [https://github.com/wadcyf](https://github.com/wadcyf).
- Project Repository: [https://github.com/wadcyf/drupal-tailwind](https://github.com/wadcyf/drupal-tailwind).

## Getting Started

Please use the [Development Tools](#development-tools) setup when working on this theme which requires all development to be in the Windows environment based on the agency's IT resources allocated (Development work is done in a mixture of Linux, MacOS, and Windows environments). Admin permissions will be needed to install WSL, a requirement for DDEV. DDEV installs a Docker environment via Ubuntu Linux. Follow these steps to install DDEV:

### 1. Install PowerShell
1. If not installed, follow this guide: [Installing PowerShell on Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4).
2. Make sure you are using the latest version (7.4)
    - `wsl --version` - to check version.
    - `wsl --update` - to update WSL.
3. Set WSL version to 2: `wsl -set-default-version 2`.

### 2. Install Ubuntu Linux on Windows with WSL
1. `wsl --install` - This will install Ubuntu Linux.
    - During installation, you will be asked to set a username and password.
2. `wsl` - command to run Ubuntu once installed.
3. Make sure you are in Linux before installing DDEV. If you typed `wsl` and see your newly created username in the Terminal, you are in Linux.

### 3. Install Docker and DDEV
1. First install the Docker engine for Ubuntu: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).
2. Add your username to the docker group:
    - `sudo groupadd docker` - This will create a docker group.
    - `sudo usermod -aG docker $USER` - This will add your username to the docker group.
    - `newgroup docker` - This will activate the changes to the group without having to logout.
3. You will also need to configure Docker to start on boot with systemd (or you will have to manually start up after each boot).
    - `sudo systemctl enable docker.service` - Creates a Docker service.
    - `sudo systemctl enable containerd.service` - Enables the container service.
4. Install DDEV
    - Install [mkcert](https://github.com/FiloSottile/mkcert#installation) to create valid certificates for development:
        - `sudo apt install libnss3-tools`
        - `curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"`
        - `chmod +x mkcert-v*-linux-amd64`
        - `sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert`
    - Follow the [DDEV Installation](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/) for Debian/Ubuntu.
    - DDEV should be installed. Type `ddev help` to see if a list of commands.

### 4. Clone this repository from GitHub
1. Make sure you have a GitHub account.
2. You will need a personal access token to to use Git with this repository. 
    - Check your Profile, Settings, then Developer settings to create your Personal Access Token. 
    - Select Fine-grained tokens and set the Expiration for 90 days for security purposes. 
    - You will use your Personal Access Token as your password.
3. Make a project directory for this repository:
    1. `mkdir drupal-tailwind` - Makes a new directory.
    2. `cd drupal-tailwind` - cd is the same command in Linux as PowerShell. Quick note, in Linux, after the command, you can hit the tab key for autocompletion.
    3. `git init` - Initializes this folder for git.
        - You may be asked to register a username and email.
    4.  `git clone https://github.com/wadcyf/drupal-tailwind.git` - to clone the repository. 
        - You will be asked to add your Github username and password (Personal Access Token).
4. All the necessary files, including DDEV, will be in this repository.
    - /sites/default/files, settings.php, and the MariaDB database will not be in the repository for security purposes. 
        - The necessary folders, files, and database will be provided either by the lead developer either via S3 bucket or compressed file.
            - You will to import the database with the following command: `ddev import-db database.sql` before starting ddev.
            - Copy /sites/default/files and settings.php (and settings.ddev.php) to the proper locations.

### 5. Start DDEV
1. Make sure you are in the drupal-tailwind, or similar, directory.
2. Check to see DDEV is properly configured: `ddev describe`.
    - You should see a table with the project name and empty tables.
3. In the drupal-tailwind directory, or similar run the following command:
    - `ddev start` - This starts DDEV and sets up the containers to include Drupal, PHP, MariaDB, Nginx, and PHP.
        - .ddev/config.yaml is already included with the necessary configurations.
    - The terminal will provide the URL once the container environment is loaded.
4. You can also get more information with `ddev describe` that should list all the active services and URL.
5. Visit [https://ddev.readthedocs.io/en/stable/users/usage/commands/](https://ddev.readthedocs.io/en/stable/users/usage/commands/) for a list of DDEV commands.

### 6. Update Drupal
1. `ddev composer up`
    - This will update Drupal and all the modules with Composer.
2. `ddev drush updb -y & ddev drush cr` - Updates the database and clears the cache with Drush.
3. Composer and Drush works normally in DDEV. Just be sure to add ddev before using each command.
4. Since Drupal is running in a Container, you can add modules and make changes in the Drupal admin interface.
5. See [DDEV and Composer](https://ddev.readthedocs.io/en/stable/users/usage/developer-tools/#ddev-and-composer) for more information on using Composer in DDEV.

### 7. Git Version Control
1. If you are part of the development team for this project, DO NOT update the main branch. We maintain strict versioning controls for all projects. 
    - If you are just cloning this to start another project, ignore the following. Just create a new repository and follow the instructions provided by GitHub.
2. Always keep the main branch updated by pulling the latest updates to the main branch:
    1. `git checkout main` - This ensures you are in the main branch.
    2. `git pull` - Will update the main branch. 
3. When working on a task, make sure you are in the your working branch, NEVER in main. You can push this branch to GitHub for review. If no issues, your branch will be merged with main.
    1. `git branch v1.0.0-alpha.2-username` - Use the proper versioning you are working on. The username is your username. This will create a new working branch for you.
    2. `git status` - This command lists the updates in your working branch.
    3. `git add .` - This command will tell git you are about to make a commit to your working branch.
    4. `git commit -m "Changes to navigation component"` - The -m adds a message to the commit. Be sure to explain the changes made.
    5. `git push` - This will push your changes to your working branch.
        - git may ask you to force the push. Just enter the command that is listed in the terminal.
    6. If your are finished making changes for this branch, be sure to go back to the main branch: `git checkout main`. 
        - The lead developer will delete the branch after merging the code.
    7. The lead developer will review the code for possible merging with the main branch.

### 8. Snapshots
1. DDEV makes it easy to keep a current snapshot of your project. Make daily snapshots of your work. 
    - `ddev snapshot` - Creates the snapshot.
    - `ddev snapshot -l` - Lists the snapshots.
    - `ddev snapshot restore` - Restores a snapshot via provided list.
    - Snapshots will not be pushed to the repository. .gitignore blocks these uploads.
    - If needed, you can also export your database with [export-db](https://ddev.readthedocs.io/en/stable/users/usage/commands/#export-db). 

### 9. Uninstalling DDEV
1. Follow this guide if you need to uninstall DDEV" [Uninstalling DDEV](https://ddev.readthedocs.io/en/stable/users/usage/uninstall/).

## Development Tools

- [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about).
    - [Ubuntu Linux](https://ubuntu.com).
    - [PowerShell](https://learn.microsoft.com/en-us/windows/wsl/install).
- [Visual Studio Code](https://mariadb.org/).
- [Tailwind CSS Color Generator](https://uicolors.app/create) - Tailwind CSS color generator.
    - All colors will use HSL (hue, saturations, lightness) values.
- [DDEV](https://ddev.com).
    - [Docker](https://dockers.com) - Docker provider for DDEV.
    - [Nginx](https://nginx.org/en/) version: 1.24.0.
    - [PHP](https://www.php.net/) version: 8.3.2.
    - [MariaDB](https://mariadb.org/) version: 10.11.6.

## Accessibility Requirements

The design of this theme will address the [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/) as follows:
- WCAG Level A - Will comply fully.
- WCAG Level AA - Will comply fully.
- WCAG Level AAA - Will comply if possible. If not, will continue to work to meet full compliance of Level AAA.

### Accessibility Tools

Though these are valualbe tools to help meet accessibilty compliance, several components will need to be check manually such as the dropdown components. All the below accessibility tools seems to miss the navigation component entirely if there is a dropdown component.

- [axe DevTools - Web Accessibility Testing](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd).
- [DevTools](https://developer.chrome.com/docs/devtools).
- [Pagespeed Insights](https://pagespeed.web.dev/) - SEO and Accessibility check (scaled down compared to DevTools).
- [pa11y](https://pa11y.org/) - Can check up to Level AAA.
- [Schema.org](https://scheme.org) - Checks the structured data of a website/webpage. 
- [Silktide Accessibility Checker](https://chromewebstore.google.com/detail/silktide-accessibility-ch/mpobacholfblmnpnfbiomjkecoojakah) - Can check up to Level AAA.
- [WAVE Evaluation Tool](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh).

## Resources

- [Drupal CMS Quickstart](https://ddev.readthedocs.io/en/latest/users/quickstart/#drupal).
- [How to Use Pa11y: Web Accessibility Testing Via the Command Line](https://webdesign.tutsplus.com/web-accessibility-testing-via-the-command-line-with-pa11y--cms-34538t).
- [Super fast Drupal theme development with TailwindCSS (article)](https://cms.tomswebstuff.com/blog/super-fast-drupal-theme-development-tailwindcss).

## Contributing

- Kevin Miller, Jr. - IT Web Application Developer.

## Legal matters

To be updated with License requirements.

### drupal-tailwind
