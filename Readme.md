# Drawer app for UoL Introduction to programming II

Live view: https://iamelevich.github.io/uol-introductin-to-programming-ii-project/

## Requirements

Any version of nodejs and pnpm (`npm i -g pnpm`). Tested on node version 18.8.0. You can use [asdf](https://asdf-vm.com/) to install it.

## Preparation

Install all deps: `pnpm i`

Basically all dependencies are dev, except of p5 and colorpicker.

## Development

Run `pnpm start` to run live server and watcher. After that you can access project by URL: `http://localhost:1234`

## Production

Run `pnpm build` to build prod version in `dist` folder.

## Roadmap

-   [x] Use TypesScript
-   [x] Refactor template to use classes and etc
-   [x] Add option to change size for all tools
-   [x] Improve color choosing like in paint
-   [x] Improve top menu to looks good
-   [x] Improve desing of the app
-   [x] Add type choosing option where it possible (circle, rectangle, pencil and etc.)
-   [x] Change cursor for each tool where it's possible
-   [x] Add Fill with color tool
-   [x] Add Rectangle tool
-   [x] Add Circle tool
-   [x] Add Grayscale filter
-   [x] Add blur filter
