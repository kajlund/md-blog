---
title: NPM - The node package manager
createdAt: 2018-12-26
description: About NPM, the Node Package Manager
---

# {title}

> {description}

[npm](https://www.npmjs.com/) is the standard package manager installed with Node.js. It consists of a command-line tool that gives you access to a world of javasckript libraries or so called packages.

It has become the de-facto standard for distributing modules (packages) for use with Node.js.

Yarn is an alternative package manager built by Facebook. It was released when npn was at v3 to address slowness among other things.

Today they're in general equally fast but as npm have focused on security a lot lately you should prefer npm to yarn these days.

#### Useful Resources

- [website](https://www.npmjs.com/)
- [npm doc](https://docs.npmjs.com/)
- [package.json Ref](https://docs.npmjs.com/files/package.json)
- [Doubling Down on npm](https://roost.bocoup.com/blog/doubling-down-on-npm/)
- [How To NPM](https://github.com/npm/how-to-npm) interactive tutorial

Via a simple command-line interface you can easily install or even publish node modules (packages). You can also search for and upgrade installed packages. The package format is largely based on the same CommonJS format used by Node.js based on a `package.json` file with some additoinal fields.

## package.json

The `package.json` file stores information about your project and its dependencies, like name, version etc. You can initialize a new project by running `npm init`. This will run you through a series of questions for setting it up. Alternatively you can run `npm init -y` for default values that can be edited manually later.

#### Local vs Global

Packages can be installd locally to the project or globally on the machine. Locally installed packages are placed inside a `node_modules` folder in your project root folder. You should in general prefer using locally installed packages. Global packages would typically be CLI-tools that you can use via the command-line directly. To install a package globally you add a `-g` flag.

- Global `node_modules` directory under Unix-based systems is `/usr/local/lib/node_modules` or `usr/local/lib/node`.
- Under Windows 7 and later typically at `%AppData%\npm\node_modules`.

If you are using the Node Version Manager, `nvm`, the node command is pointing to the version of node you have set as default with nvm. Under Windows typically `C:\nvm\vernr\node_modules`.

> On Unix systems global installs typically requires a `sudo` command prefix. On windows run an elevated command line. Using nvm this is not required.

#### The npx Option

If you don't want to install a lot of CLI-tools globally you can use `npx` if you have npm 5.2 or later.

The first part of the command installs the CLI-tool temporarily. It then executes the command part:

```bash
npx -p @angular/cli ng new myapp  # Create a new angular app
npx mocha                         # Run mocha tests without install
npx cowsay hello
```

You can also add npx commands to your npm scripts:

```json
...
"scripts": {
  "createapp": "npx -p @angular/cli ng new myapp"
},
...
```

See also: [The npm Blog](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) and the [Github page](https://github.com/npm/npx)

#### dependencies v.s. devDependencies

To install a package locally you use the `npm install --save <pakagename>` command. In more recent versions of npm the `--save` flag is added by default and can be omitted. The installed package along with the version installed will be added to the `dependencies` key in the `package.json` file.

To install a development dependency you use the `npm install --save-dev <packagename>` command. The installed package along with the version will be added to the `devDependencies` key in the `package.json` file.

> if environment variable NODE_ENV is set to production, npm will ignore devDependencies when executing `npm install`.

## Semantic Versioning

The `npm install` command installs the latest version of a package. You can install a specific version using the `@` sign followed by major and optionally minor and patch release versions. `npm i -g eslint@5.2.0`. Npm packages should follow [Semantic Versioning](https://semver.org/).

Semantic versioning is made up of three numbers with a dot between. From left to right they represent the _major_, _minor_, and _patch_ release version numbers. By default npm installs the version numbers prefixed with a caret symbol like `"express": "^4.17.1"`. This symbol means that an npm install command would install the same major version but might upgrade to a later minor and patch release version when installing it on another machine.

- Caret (^) -> All minor and patches OK to upgrade
- Tilde (~) -> Only patches OK to upgrade

Remove the prefix character from the versions in package.json to always install a specific version.

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

Additional labels for `pre-release` and `build` metadata are available as extensions to the MAJOR.MINOR.PATCH format.

#### package-lock.json

Running npm install in a new project also creates the `package-lock.json` file. While `package.json` is the input for the `npm install` command, `package-lock-json` can be seen as the output of what was actually installed. If you also provide the `package-lock.json` file in your project repo anyone installing packages will get the exact same versions you initially used.

## Useful Commands

```
npm help                    # Doc for package.json implementation
npm -v                      # Display version of npm

npm init                    # Create a new package.json file
npm init -y                 # Create a new package.json file no questions asked
npm i <pkg> <pkg2>...       # Install speificed package -S or --save is default in later vers
npm i -D|--save-dev <pkg>   # Install and save pkg as a dev-dependency in package.json. -D is shorthand for save-dev
npm i -g|--global <pkg>     # Install pkg globally. -g is shorthand for global
npm install -g npm          # Upgrade npm version
npm uninstall|remove pkg(s) # removes installed packages. remove can also be used
npm ls|list                 # Lists ASCII tree of installed packages and dependencies
npm ls|list --depth=0       # List root level locally installed packages. ls is shorthand for list
npm ls|list -g --depth=0    # List globally installed packages at the root level
npm outdated                # Check if we have outdated pkgs locally
npm outdated -g             # Check for globally outdated pkgs
npm install|update -g <pkg> # Update a globally installed package
```

See also the npm [shorthand list](https://docs.npmjs.com/misc/config#shorthands-and-other-cli-niceties)

## NPM Cache

Clearing the npm cache can often be useful if you have unexpected problems with some library.

```bash
npm cache verify        # verify cache
npm cache clean --force # force npm to clean the cache
```

## Audit

You can use `npm audit` to verify that the packages you have installed are safe to use. The command will print a security report. Items will be listed with severity, what package the problem is in, in which version it was patched, what package it is a dependency of, the path to the source and a more info link. If it additionally contains a warning line, patching it could break your code.

Security warnings can be _high_, _low_ or _critical_. The critical ones should be addressed asap. To resolve issues try running `npm audit fix` or alternatively upgrade the packages one-by-one.

## Deploying your package to npm

- Check name, version and that main points to your main file.
- Scripts section can be removed if you don't have tests
- Add a README.md-file describing the package

#### Resources

- [Official Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [FreeCodecamp article](https://medium.freecodecamp.org/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78)

```bash
npm whoami

npm login
npm adduser

show ver: npm version
update ver of your pkg: npm version 1.0.1
```

#### Publishing your package

- Before publish, verify package name is unique. Chances are your package name isn't available.
- If you have private npm you can use your npm name or organization name to prefix the name. @mycompany/awesomepkg or @myname/awesomepkg.

If you don't you explicitly need to add access=public param when publishing.
`npm publish or npm publish --access=public`

## npm Scripting

#### See also

- [official doc](https://docs.npmjs.com/cli/run-script)
- [Hoodie site doc](https://github.com/hoodiehq/hoodie-css/blob/feature/build-automation/DEVELOPMENT.md)
- [How to Use npm as a Build Tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)

Allows you to run commands via npm. Scripts are added to the scripts object in package json and contains a name and a command for each script. To run such a script you enter `npm run scriptname`. For a few select common scripts you can omit the `run`-part i.e. `npm start`, `npm test`.

```json
"scripts": {
  "start": "nodemon ./index.js --exec babel-node"
}
```

From the command line you can then run `npm start` to execute the start script above.

#### Useful Scripting Commands

```bash
npm test                    # Run test script in package.json. t is shorthand
npm run scriptname          # With no params lists available scripts.
npm version patch           # Bump version in package.json (major|minor|patch).
```

:todo: Add section on Deploying packages to npm
