# proformajs-vue3-perform-desktop-standalone-electron

An example usage of proformajs-vue3-perform using [Electron](https://www.electronjs.org/)

This repo uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
to create two npm libraries:

- proformajs-vue3 - components for creating protocols and running enactments
- proformajs-vue3-perform - a subset of the components needed to run enactments

This repo uses CI to:

- check the code format with prettier
- check the code with a linter
- check for dependency vulnerabilities
- run behavioural tests automatically

The original component work for this project can be found at https://gitlab.com/openclinical/proformajs-vue3

## Development

You'll need to run `npx vite build --watch` in the package that your working
in order to see your changes reflected in the demo as you make them.

### Committing changes

Before creating a merge request or pushing your changes to main please ensure
that your code is linted and formatted and that the tests all run green.  
Also ensure that a fresh install has no security vulnerabilities.

# Skeleton

The skeleton for this project was created with `npm init vue@latest` (3.4.27)
which generated the rest of this README.

Workspaces were then created with `npm init -w .packages/map` etc.

---

This template should help get you started building standalone PRO<i>formajs</i>-Vue3 project.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
npm run build
```

## Debug standalone application using [Electron](https://www.electronjs.org/)

```sh
npm start
```

## Package and distribution using [Electron Forge](https://www.electronforge.io/)

1. Create distrubtion using make command.

```sh
npm run make
```

2. The executables should be output to `out` folder under the root folder of the project.
