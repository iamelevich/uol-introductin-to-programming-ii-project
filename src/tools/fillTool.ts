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
