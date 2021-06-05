#! /usr/bin/env node
const execSync = require("child_process").execSync
const chalk = require('chalk')
const path = require("path")
const fs = require("fs")

const log = console.log

if (process.argv.length < 3) {
    log('')
    log(chalk.red.bold('You have to provide a name to your app.'))
    log('')
    log(chalk.green('   * i.e.: `npx create-edo-app my-app`'))
    log('')
    process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = 'https://github.com/evedes/create-edo-app'

try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
        log('')
        log(chalk.red.bold(`The directory ${projectName} already exists in the current directory, please give it another name.`));
        log('')
    } else {
      log(chalk.red('error: ', error));
    }
    process.exit(1);
  }

  async function main() {
    try {
        const options = {stdio : 'pipe'}
      execSync(`git clone --depth 1 ${git_repo} ${projectPath}`, options);
      process.chdir(projectPath)
      
      log(chalk.green('-> 01. Installing dependencies...'));
      execSync('yarn', options);
      
      log(chalk.green('-> 02. Removing useless files... (/bin + ./.git)'))
      fs.rmSync(path.join(projectPath, 'bin'), { recursive: true, force: true })
      fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true })
      
      log(chalk.green('-> 03. Installation complete! 🚀'));
      
      log(chalk.green('-> 04. How To Start Developing: '))
      log(chalk.green(`   * Change directory into your project: \`cd ${projectName}\``))
      log(chalk.green('   * And type `yarn run dev` to start your boilerplate with [WDS]!'))
      log(chalk.green('   * Or `yarn run dev:server to start yout boilerplate with Express Server'))
      
      // removing boilerplate deps
      log(chalk.green('-> 05. Removing boilerplate deps: (chalk)'))
      execSync('yarn remove chalk', options)
      
      // git init + initial commit
      log(chalk.green('-> 06. Initializing git repo and doing an initial commit...'));
      execSync('git init -b main', options)
      execSync('git add .', options)
      execSync('git commit -m \"initial commit: launched create-edo-app\"', options)


    } catch (error) {
      log(chalk.red('error: ', error));
    }
}
main();  