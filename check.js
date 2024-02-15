const fs = require("fs");
const path = require("path");
const os = require("os");

const yaml = require("js-yaml");
const dotfilesYaml = yaml.load(fs.readFileSync(process.argv[2], "utf8"));

(async () => {
  const chalk = (await import("chalk")).default;

  const homeDir = os.homedir();
  const destinationPath = path.join(homeDir, dotfilesYaml.destinationFolder);
  const destinationFiles = fs.readdirSync(destinationPath);

  destinationFiles.forEach((destinationFile) => {
    const destinationFilePath = path.join(destinationPath, destinationFile);
    const homeFilePath = path.join(homeDir, destinationFile);

    if (!fs.existsSync(homeFilePath)) {
      console.log(
        chalk.red(`❌ [${homeFilePath}] does not exist in home directory, should link to [${destinationFilePath}]`)
      );
    } else {
      // Check if it's a symlink
      if (fs.lstatSync(homeFilePath).isSymbolicLink()) {
        var originalPath = fs.readlinkSync(homeFilePath);
        if (originalPath !== destinationFilePath) {
          console.log(
            chalk.yellow(
              `⚠️ [${homeFilePath}] is a symlink but not pointing to the correct destination path [${destinationFilePath}].`
            )
          );
        } else {
          console.log(
            chalk.greenBright(
              `✅ [${homeFilePath}] is a correct symlink to [${destinationFilePath}]`
            )
          );
        }
      } else {
        console.log(
          chalk.yellow(`⚠️ [${homeFilePath}] exists but is not a symlink, should link to [${destinationFilePath}].`)
        );
      }
    }
  });
})();
