# Drawer app for UoL Introduction to programming II

Live view: https://iamelevich.github.io/uol-introductin-to-programming-ii-project/

Deployed automatically by github actions.

- [Drawer app for UoL Introduction to programming II](#drawer-app-for-uol-introduction-to-programming-ii)
  - [Requirements](#requirements)
  - [Preparation](#preparation)
  - [Development](#development)
    - [Code style and linting](#code-style-and-linting)
  - [Production](#production)
  - [Docker](#docker)
  - [Available commands](#available-commands)

## Requirements

- Node.js 18+
- NPM 9+

## Preparation

Install all dependencies: `npm i`

Basically all dependencies are dev, except of `p5` and `colorpicker`.

## Development

As a build tool I use [Vite](https://vitejs.dev/). It's fast and easy to use, also it has built-in live server and hot reload.

Run `npm run dev` to start development server.

### Code style and linting

I use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to keep code style consistent.

Run `npm run lint` to check code style.

To prevent code style errors on commit I use [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged).

For release creating and commit linting I use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Commitlint](https://commitlint.js.org/#/).

## Production

Run `npm run build` to build prod version in `dist` folder.

To check prod version locally run `npm run preview`.

## Docker

You can also build and test such image with docker.

Build image: `npm run docker:build`

Start container: `npm run docker:start`. After that you can open app on [http://localhost:8080](http://localhost:8080)

Stop container: `npm run docker:stop`

## Available commands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start development server       |
| `npm run build`        | Build prod version             |
| `npm run preview`      | Preview prod version           |
| `npm run lint`         | Check code style               |
| `npm run docker:build` | Build docker image             |
| `npm run docker:start` | Start docker container         |
| `npm run docker:stop`  | Stop docker container          |
| `npm run commit`       | Commit changes with commitizen |
| `npm run commitlint`   | Check commit message           |
