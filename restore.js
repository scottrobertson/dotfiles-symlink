const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const os = require("os");
const yaml = require("js-yaml");
const dotfilesYaml = yaml.load(fs.readFileSync(process.argv[2], "utf8"));

(async () => {
  const chalk = (await import("chalk")).default;

  const homeDir = os.homedir();
  const destinationFolder = path.join(homeDir, dotfilesYaml.destinationFolder);
  const dotfiles = fs.readdirSync(destinationFolder);

  dotfiles.forEach((relPath) => {
    const file = path.join(homeDir, relPath);

    const destinationFilePath = path.join(destinationFolder, path.basename(file));

    if (!fs.existsSync(destinationFilePath)) {
      console.log(
        chalk.red(`❌ [${file}] Does not exist in destination, skipping...`)
      );
      return;
    }

    if (fs.existsSync(file)) {
      const existingLink = fs.readlinkSync(file);
      if (existingLink === destinationFilePath) {
        console.log(
          chalk.greenBright(
            `✅ [${file}] Symlink already points to ${existingLink}`
          )
        );
        return;
      }

      // Existing symlink? Remove it
      if (fs.lstatSync(file).isSymbolicLink()) {
        fs.unlinkSync(file); // Delete symlink
        console.log(chalk.blueBright(`✅ [${file}] Deleted existing symlink`));
      } else {
        console.log(chalk.red(`❌ [${file}] exists but it's not a symlink. Please resolve manually.`));
        return;
      }
    }

    console.log(
      chalk.blueBright(`🔗 [${file}] Creating symlink from ${destinationFilePath}`)
    );
    childProcess.execSync(`ln -s ${destinationFilePath} ${file}`);
    console.log(
      chalk.blueBright(`✅ [${file}] Created symlink from ${destinationFilePath}`)
    );

    if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink()) {
      console.log(chalk.greenBright(`✅ [${file}] Successfully created symlink`));
    } else {
      console.log(chalk.red(`❌ [${file}] Failed to create symlink`));
    }

    console.log(
      chalk.greenBright(`✅ [${file}] File/directory restoration completed`)
    );
  });
})();
