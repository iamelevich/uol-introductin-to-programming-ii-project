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
- [Grade](#grade)
  - [How stable is your application?](#how-stable-is-your-application)
  - [How extensive are the modifications and extensions you have made to the app?](#how-extensive-are-the-modifications-and-extensions-you-have-made-to-the-app)
  - [Now challenging was the technical difficulty of your project?](#now-challenging-was-the-technical-difficulty-of-your-project)
  - [Have you correctly declared variables and used used variable scoping efficiently?](#have-you-correctly-declared-variables-and-used-used-variable-scoping-efficiently)
  - [Have you made good use of constructor functions in your project?](#have-you-made-good-use-of-constructor-functions-in-your-project)
  - [Have you made good use of object orientation methodology?](#have-you-made-good-use-of-object-orientation-methodology)
  - [Have you made good use of object properties and correctly scoped them?](#have-you-made-good-use-of-object-properties-and-correctly-scoped-them)
  - [Have you made good use of object methods?](#have-you-made-good-use-of-object-methods)
  - [Has your project incorporated array?](#has-your-project-incorporated-array)
  - [Has your project made use of loops?](#has-your-project-made-use-of-loops)
  - [Has your project made use of conditionals?](#has-your-project-made-use-of-conditionals)
  - [Has your project been well commented?](#has-your-project-been-well-commented)
  - [Does your code consistently adhere to good coding style?](#does-your-code-consistently-adhere-to-good-coding-style)
  - [Have the code been well organized?](#have-the-code-been-well-organized)
  - [Is your code modular?](#is-your-code-modular)

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

# Grade

Some useful information that should help to grade this project.

## How stable is your application?

I think it's stable enough. I've tested it on different devices and browsers. Also I've tested it with different screen resolutions and orientations.

Live version: [https://iamelevich.github.io/uol-introductin-to-programming-ii-project/](https://iamelevich.github.io/uol-introductin-to-programming-ii-project/) (deployed automatically by github actions)

Run locally: check [Development](#development) section.

## How extensive are the modifications and extensions you have made to the app?

All code was rewritten with typescript and classes. No global variables. I've added some new features like:

- Color picker
- Filters
- New tools
- Redesign of UI
- New icons

## Now challenging was the technical difficulty of your project?

Not super hard, but not easy. I've spent a lot of time on UI and UX. Also I've spent a lot of time on refactoring and code style.

A lot of tools were used to make development process easier and more comfortable and code quality better. Like eslint, prettier, husky, lint-staged, commitlint, conventional commits, commitizen, vite, docker, github actions, etc.

I've also tried to make code as clean as possible and follow best practices.

## Have you correctly declared variables and used used variable scoping efficiently?

Yes, no global variables at all. All variables are declared in classes and methods and used only there.

## Have you made good use of constructor functions in your project?

Yes, I've used classes and constructor functions.

For example `Filter` class ([src/filters/filter.ts](./src/filters/filter.ts)):

```ts
export abstract class Filter {
  constructor(
    protected p: P5,
    protected pixelHelper: PixelHelper,
    protected modal: Modal,
    protected config: FilterConfig
  ) {
    // Create the button
    const filtersElement = this.p.select('#filters');

    if (!filtersElement) {
      throw new Error('Filters element not found');
    }

    // Create the button
    const btn = this.p
      .createButton(this.config.text)
      .id(this.config.name)
      .addClass('btn-menu')
      .parent(filtersElement);

    // Add the event listener
    btn.mouseClicked(() => {
      this.showModal();
    });
  }

  // Other class code
}
```

Or `Modal` class ([src/utils/modal.ts](./src/utils/modal.ts)):

```ts
export class Modal {
  private modal: P5.Element;
  private title: P5.Element;
  private content: P5.Element;
  private acceptButton: P5.Element;
  private cancelButton: P5.Element;
  private closeButton: P5.Element;

  constructor(
    private p: P5,
    private id: string
  ) {
    const modal = this.p.select(`#${this.id}`);
    if (!modal) {
      throw new Error(`Modal with id ${this.id} not found`);
    }
    this.modal = modal;
    this.title = this.selectElementOrThrow(`#${this.id} .modal-title`);
    this.content = this.selectElementOrThrow(`#${this.id} .modal-body`);
    this.acceptButton = this.selectElementOrThrow(`#${this.id} .modal-accept`);
    this.cancelButton = this.selectElementOrThrow(`#${this.id} .modal-cancel`);
    this.closeButton = this.selectElementOrThrow(`#${this.id} .modal-close`);
  }

  // Other class code
}
```

## Have you made good use of object orientation methodology?

Yes, classes are used everywhere except of some utils where it's not needed.

Also all classes are separated into different files and folders. And ES6 modules are used.

For example `PixelHelper` class ([src/utils/pixelHelper.ts](./src/utils/pixelHelper.ts)):

```ts
import type P5 from 'p5';

/**
 * Color array type
 */
export type ColorArray = [number, number, number, number];

/**
 * Helper class to manipulate pixels
 */
export class PixelHelper {
  // The pixel density is used to calculate the pixel offset
  private readonly density: number;

  // The pixel width is used to calculate the pixel offset
  private readonly pixelWidth: number;

  // The pixel row size is used to calculate the pixel offset
  private readonly pixelRowSize: number;

  constructor(private p: P5) {
    this.density = this.p.pixelDensity();
    this.pixelWidth = this.p.width * this.density;
    this.pixelRowSize = this.pixelWidth * 4;
  }

  /**
   * Get the color of a pixel
   * @param x X coordinate
   * @param y Y coordinate
   * @returns
   */
  getPixelColor(x: number, y: number): ColorArray {
    const off = this.getPixelOffset(x, y);
    return [this.p.pixels[off], this.p.pixels[off + 1], this.p.pixels[off + 2], this.p.pixels[off + 3]];
  }

  /**
   * Get the offset of a pixel in P5's pixels array
   * @param x X coordinate
   * @param y Y coordinate
   * @returns
   */
  getPixelOffset(x: number, y: number): number {
    return 4 * (this.pixelWidth * (y * this.density) + x * this.density);
  }

  /**
   * Fill a pixel with a provided color
   * @param x X coordinate
   * @param y Y coordinate
   * @param fillColor Color to fill the pixel with
   */
  fillPixelWithColor(x: number, y: number, fillColor: ColorArray) {
    const currentIndex = this.getPixelOffset(x, y);
    for (let colorIndex = 0; colorIndex < 4; colorIndex++) {
      for (let columnIndex = 0; columnIndex < this.density; columnIndex++) {
        for (let rowIndex = 0; rowIndex < this.density; rowIndex++) {
          this.p.pixels[currentIndex + colorIndex + this.pixelRowSize * rowIndex + 4 * columnIndex] =
            fillColor[colorIndex];
        }
      }
    }
  }
}
```

## Have you made good use of object properties and correctly scoped them?

Yes, all properties are scoped correctly. All object-related data stored in properties or local variables.

## Have you made good use of object methods?

Yes, all functionality is separated into methods. All methods are scoped correctly.

## Has your project incorporated array?

Yes, for example in `FillTool` class ([src/tools/fillTool.ts](./src/tools/fillTool.ts)) a queue is used to fill pixels:

```ts
mouseClicked() {
  const fillColor: ColorArray = [
    this.colorPalette.currentColor.red,
    this.colorPalette.currentColor.green,
    this.colorPalette.currentColor.blue,
    255
  ];
  this.p.loadPixels();

  const initialColor = this.pixelHelper.getPixelColor(this.p.mouseX, this.p.mouseY);

  let queue = [];
  queue.push(this.p.createVector(this.p.mouseX, this.p.mouseY));

  while (queue.length) {
    const current = queue.shift();
    if (!current) {
      break;
    }
    const currentColor = this.pixelHelper.getPixelColor(current.x, current.y);

    if (!this.arrayEquals(currentColor, initialColor) || this.arrayEquals(currentColor, fillColor)) {
      continue;
    }

    // Fill pixel with color
    this.pixelHelper.fillPixelWithColor(current.x, current.y, fillColor);

    queue = this.expandToNeighbours(queue, current);
    if (queue.length > 20000) {
      console.log('Queue is too big', queue.length);
      break;
    }
  }

  this.p.updatePixels();
}
```

## Has your project made use of loops?

Yep, in `FillTool` class ([src/tools/fillTool.ts](./src/tools/fillTool.ts)) a reccursive loop is used to fill pixels:

```ts
import { IconType, Tool } from './tool';

import type { ToolConfig } from './tool';
import type { ColorPalette } from '../colourPalette';
import type { ColorArray, PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export class FillTool extends Tool {
  constructor(
    p: P5,
    private colorPalette: ColorPalette,
    private pixelHelper: PixelHelper,
    config: ToolConfig = {}
  ) {
    super(p, {
      name: 'fill',
      icon: 'fa-solid fa-fill',
      iconType: IconType.FA,
      cursorClass: 'cursor-fill',
      ...config
    });
  }

  /**
   * Draw method, empty for this tool
   */
  draw() {
    // do nothing
  }

  /**
   * Fill area with color on mouse click
   */
  mouseClicked() {
    const fillColor: ColorArray = [
      this.colorPalette.currentColor.red,
      this.colorPalette.currentColor.green,
      this.colorPalette.currentColor.blue,
      255
    ];
    this.p.loadPixels();

    const initialColor = this.pixelHelper.getPixelColor(this.p.mouseX, this.p.mouseY);

    let queue = [];
    queue.push(this.p.createVector(this.p.mouseX, this.p.mouseY));

    while (queue.length) {
      const current = queue.shift();
      if (!current) {
        break;
      }
      const currentColor = this.pixelHelper.getPixelColor(current.x, current.y);

      if (!this.arrayEquals(currentColor, initialColor) || this.arrayEquals(currentColor, fillColor)) {
        continue;
      }

      // Fill pixel with color
      this.pixelHelper.fillPixelWithColor(current.x, current.y, fillColor);

      queue = this.expandToNeighbours(queue, current);
      if (queue.length > 20000) {
        console.log('Queue is too big', queue.length);
        break;
      }
    }

    this.p.updatePixels();
  }

  /**
   * Expand queue to neighbours
   * @param queue Queue to expand
   * @param current Current pixel
   * @returns
   */
  private expandToNeighbours(queue: P5.Vector[], current: P5.Vector): P5.Vector[] {
    const x = current.x;
    const y = current.y;

    if (x > 0) {
      queue.push(this.p.createVector(x - 1, y));
    }
    if (x < this.p.width) {
      queue.push(this.p.createVector(x + 1, y));
    }
    if (y > 0) {
      queue.push(this.p.createVector(x, y - 1));
    }
    if (y < this.p.height) {
      queue.push(this.p.createVector(x, y + 1));
    }

    return queue;
  }

  /**
   * Compare two arrays
   * @param a First array
   * @param b Second array
   * @returns
   */
  private arrayEquals(a: ColorArray, b: ColorArray): boolean {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
}
```

Also in `GrayscaleFilter` class ([src/filters/grayscale.ts](./src/filters/grayscale.ts)) a loop is used to iterate over pixels:

```ts
import { Filter } from './filter';

import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export class GrayscaleFilter extends Filter {
  // The conversational factor is used to round the average value to the nearest conversational factor
  private readonly conversationalFactor = 255 / 56;

  constructor(p: P5, pixelHelper: PixelHelper, modal: Modal) {
    super(p, pixelHelper, modal, {
      name: 'grayscale-filter',
      text: 'Grayscale'
    });
  }

  apply() {
    for (let i = 0; i < this.p.pixels.length; i += 4) {
      // Get the average value of the RGB components
      const averageValue = (this.p.pixels[i] + this.p.pixels[i + 1] + this.p.pixels[i + 2]) / 3;
      // Round the average value to the nearest conversational factor
      const gray = Math.round((averageValue / this.conversationalFactor + 0.5) * this.conversationalFactor);
      // Set the RGB components to the gray value
      this.p.pixels[i] = gray;
      this.p.pixels[i + 1] = gray;
      this.p.pixels[i + 2] = gray;
    }
    // Update the pixels
    this.p.updatePixels();
  }
}
```

## Has your project made use of conditionals?

Yes and a lot. Almost in all tools. For example in `Modal` class ([src/utils/modal.ts](./src/utils/modal.ts)) I use them to make it more configurable:

````ts
import type P5 from 'p5';

// Options for the modal
export type ModalShowOptions = {
  onShow?: () => void;
  onClose?: () => void;
  title?: string;
  content?: string | P5.Element;
  buttons?: {
    accept?: {
      text: string;
      onClick?: () => void;
    };
    cancel?: {
      text: string;
      onClick?: () => void;
    };
  };
};

/**
 * Modal class
 */
export class Modal {
  // Modal elements
  private modal: P5.Element;
  private title: P5.Element;
  private content: P5.Element;
  private acceptButton: P5.Element;
  private cancelButton: P5.Element;
  private closeButton: P5.Element;

  constructor(
    private p: P5,
    private id: string
  ) {
    // Select the modal elements
    this.modal = this.selectElementOrThrow(`#${this.id}`);
    this.title = this.selectElementOrThrow(`#${this.id} .modal-title`);
    this.content = this.selectElementOrThrow(`#${this.id} .modal-body`);
    this.acceptButton = this.selectElementOrThrow(`#${this.id} .modal-accept`);
    this.cancelButton = this.selectElementOrThrow(`#${this.id} .modal-cancel`);
    this.closeButton = this.selectElementOrThrow(`#${this.id} .modal-close`);
  }

  /**
   * Shows the modal
   * @param options Options for the modal
   * @param options.onClose Callback for when the modal is closed
   * @param options.title Title of the modal
   * @param options.content Content of the modal
   * @param options.buttons Buttons to show on the modal
   * @param options.buttons.accept Accept button
   * @param options.buttons.accept.text Text of the accept button
   * @param options.buttons.accept.onClick Callback for when the accept button is clicked
   * @param options.buttons.cancel Cancel button
   * @param options.buttons.cancel.text Text of the cancel button
   * @param options.buttons.cancel.onClick Callback for when the cancel button is clicked
   * @throws Error if the modal is already visible
   * @example
   * ```ts
   * const modal = new Modal(p, 'modal-id');
   * modal.show({
   *    title: 'Modal title',
   *    content: '<p>Modal content</p>',
   *    buttons: {
   *      accept: {
   *        text: 'Accept',
   *        onClick: () => {
   *          console.log('Accept button clicked');
   *        }
   *      },
   *      cancel: {
   *        text: 'Cancel',
   *        onClick: () => {
   *          console.log('Cancel button clicked');
   *        }
   *      }
   *    },
   *    onClose: () => {
   *      console.log('Modal closed');
   *    }
   * });
   * ```
   */
  show(options: ModalShowOptions): void {
    // Throw error if the modal is already visible
    if (this.isVisible()) {
      throw new Error('Modal is already visible');
    }

    // Set the title
    this.title.html(options.title || '');

    // Clear old content
    this.content.html('');
    // Set the content
    if (typeof options.content === 'string') {
      this.content.html(options.content);
    } else {
      this.content.child(options.content);
    }

    // Set the accept button
    if (options.buttons?.accept) {
      this.acceptButton.html(options.buttons.accept.text);
    } else {
      this.acceptButton.html('OK');
    }
    // Add click listener to the accept button
    this.acceptButton.mouseClicked(() => {
      options.buttons?.accept?.onClick?.();
      options.onClose?.();
      this.hide();
    });

    // Set the cancel button
    if (options.buttons?.cancel) {
      this.cancelButton.html(options.buttons.cancel.text);
    } else {
      this.cancelButton.html('Cancel');
    }
    // Add click listener to the cancel button
    this.cancelButton.mouseClicked(() => {
      options.buttons?.cancel?.onClick?.();
      options.onClose?.();
      this.hide();
    });

    // Add click listener to the close button
    this.closeButton.mouseClicked(() => {
      options.onClose?.();
      this.hide();
    });

    // Show the modal
    this.modal.removeClass('hidden');
  }

  /**
   * Hides the modal
   */
  hide(): void {
    // Hide the modal
    this.modal.addClass('hidden');

    // Remove the event listeners
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.acceptButton.mouseClicked(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.cancelButton.mouseClicked(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.closeButton.mouseClicked(() => {});
  }

  /**
   * Returns whether the modal is visible or not
   * @returns Whether the modal is visible or not
   */
  isVisible(): boolean {
    return !this.modal.class().split(' ').includes('hidden');
  }

  /**
   * Selects an element from the modal
   * @param selector - The selector of the element to select
   * @returns The element with the given selector
   */
  private selectElementOrThrow(selector: string): P5.Element {
    const element = this.p.select(selector);
    if (!element) {
      throw new Error(`Element with selector ${selector} not found`);
    }
    return element;
  }
}
````

## Has your project been well commented?

Yes. All classes and methods have JSDoc comments. Also I've added some comments in code where it's needed.

## Does your code consistently adhere to good coding style?

Yes. It uses a lot of tools to keep code style consistent. Like eslint, prettier, husky, lint-staged. Also I've added some rules to eslint config to make code style better. Code style is checked on commit and on push and has to be fixed before commit or push.

## Have the code been well organized?

Yes. All code is separated into different files and folders. All classes are in separate files. No global variables. All code is in ES6 modules.

## Is your code modular?

Yes, but due to one page application all code builds into one file. But it's still modular and separated into different files and folders.
