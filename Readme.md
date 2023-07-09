# Drawer app for UoL Introduction to programming II

Live view: https://iamelevich.github.io/uol-introductin-to-programming-ii-project/

Deployed automatically by github actions.

## Requirements

- Node.js 18+
- NPM 9+

## Preparation

Install all dependencies: `npm i`

Basically all dependencies are dev, except of `p5` and `colorpicker`.

## Development

As a build tool I use [Vite](https://vitejs.dev/). It's fast and easy to use, also it has built-in live server and hot reload.

Run `npm run dev` to start development server.

## Production

Run `npm run build` to build prod version in `dist` folder.

To check prod version locally run `npm run preview`.

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
