# Dotfiles Symlink

A simple way to symlink dotfiles, allowing you to store them in iCloud etc.

This code was very quickly put together, so do testing first.

## Install

```
TODO: git clone this thing probably?
```

Create a YAML file:

```yaml
backupFolder: backup
destinationFolder: iCloud/dotfiles
include:
  - .default-editorconfig
  - .default-gems
  - .gitconfig
  - .gitignore
  - .ruby-version
  - .tool-versions
  - .zsh_history
  - .zshrc
  - known_hosts
```

### Usage

#### Backup

```
❯ node dotfiles-symlink/backup.js dotfiles.yml
✅ [.default-editorconfig] Already a symbolic link. Skipping...
✅ [.default-gems] Already a symbolic link. Skipping...
✅ [.gitconfig] Already a symbolic link. Skipping...
✅ [.gitignore] Already a symbolic link. Skipping...
✅ [.tool-versions] Already a symbolic link. Skipping...
✅ [.zsh_history] Already a symbolic link. Skipping...
✅ [.zshrc] Already a symbolic link. Skipping...
⏬ [known_hosts] Backing up to ~/backup/known_hosts
📦 [known_hosts] Moving to ~/iCloud/dotfiles/known_hosts
🔗 [known_hosts] Creating symlink from ~/iCloud/dotfiles/known_hosts to ~/known_hosts
✅ [known_hosts] Successfully created symlink
✅ [known_hosts] File/directory processing completed
```

#### Check

```
❯ node dotfiles-symlink/check.js dotfiles.yml
✅ [~/.default-editorconfig] is a correct symlink to [~/iCloud/dotfiles/.default-editorconfig]
✅ [~/.default-gems] is a correct symlink to [~/iCloud/dotfiles/.default-gems]
✅ [~/.gitconfig] is a correct symlink to [~/iCloud/dotfiles/.gitconfig]
✅ [~/.gitignore] is a correct symlink to [~/iCloud/dotfiles/.gitignore]
✅ [~/.tool-versions] is a correct symlink to [~/iCloud/dotfiles/.tool-versions]
✅ [~/.zsh_history] is a correct symlink to [~/iCloud/dotfiles/.zsh_history]
✅ [~/.zshrc] is a correct symlink to [~/iCloud/dotfiles/.zshrc]
✅ [~/known_hosts] is a correct symlink to [~/iCloud/dotfiles/known_hosts]
```

#### Restore

```
❯ node dotfiles-symlink/restore.js dotfiles.yml
✅ [~/.default-editorconfig] Symlink already points to ~/iCloud/dotfiles/.default-editorconfig
✅ [~/.default-gems] Symlink already points to ~/iCloud/dotfiles/.default-gems
✅ [~/.gitconfig] Symlink already points to ~/iCloud/dotfiles/.gitconfig
✅ [~/.gitignore] Symlink already points to ~/iCloud/dotfiles/.gitignore
✅ [~/.tool-versions] Symlink already points to ~/iCloud/dotfiles/.tool-versions
✅ [~/.zsh_history] Symlink already points to ~/iCloud/dotfiles/.zsh_history
✅ [~/.zshrc] Symlink already points to ~/iCloud/dotfiles/.zshrc
🔗 [~/known_hosts] Creating symlink from ~/iCloud/dotfiles/known_hosts
✅ [~/known_hosts] Created symlink from ~/iCloud/dotfiles/known_hosts
✅ [~/known_hosts] Successfully created symlink
✅ [~/known_hosts] File/directory restoration completed
```
