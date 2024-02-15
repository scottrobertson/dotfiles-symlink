const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const os = require("os");

const yaml = require("js-yaml");
const dotfilesYaml = yaml.load(fs.readFileSync(process.argv[2], "utf8"));
const dotfiles = dotfilesYaml.include;

const homeDir = os.homedir();
const backupFolder = path.join(homeDir, dotfilesYaml.backupFolder);
const destinationFolder = path.join(homeDir, dotfilesYaml.destinationFolder);

(async () => {
  const chalk = (await import("chalk")).default;

  dotfiles.forEach((relPath) => {
    const file = path.join(homeDir, relPath);
    const filename = path.basename(file);
    const backupPath = path.join(backupFolder, filename);
    const destinationPath = path.join(destinationFolder, filename);

    if (!fs.existsSync(file)) {
      console.log(chalk.red(`❌ [${filename}] Does not exist. Skipping...`));
      return;
    }

    if (fs.lstatSync(file).isSymbolicLink()) {
      console.log(
        chalk.greenBright(`✅ [${filename}] Already a symbolic link. Skipping...`)
      );
      return;
    }

    if (fs.lstatSync(file).isFile()) {
      console.log(chalk.blue(`⏬ [${filename}] Backing up to ${backupPath}`));
      fs.copyFileSync(file, backupPath);
      console.log(chalk.blue(`📦 [${filename}] Moving to ${destinationPath}`));
      fs.renameSync(file, destinationPath);
    } else if (fs.lstatSync(file).isDirectory()) {
      console.log(
        chalk.blue(`⏬ [${filename}] Backing up and moving directory ${file}`)
      );
      childProcess.execSync(`cp -R ${file} ${backupPath}`);
      childProcess.execSync(`mv ${file} ${destinationPath}`);
    }

    console.log(
      chalk.blue(
        `🔗 [${filename}] Creating symlink from ${destinationPath} to ${file}`
      )
    );
    childProcess.execSync(`ln -s ${destinationPath} ${file}`);

    if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink()) {
      console.log(chalk.greenBright(`✅ [${filename}] Successfully created symlink`));
    } else {
      console.log(chalk.red(`❌ [${filename}] Failed to create symlink`));
    }

    console.log(
      chalk.greenBright(`✅ [${filename}] File/directory processing completed`)
    );
  });
})();
