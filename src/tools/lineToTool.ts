import { RangeOption } from '../options/range';
import { isMouseInCanvas } from '../utils/utils';

import { IconType, Tool } from './tool';

import type { ToolConfig } from './tool';
import type P5 from 'p5';

export class LineToTool extends Tool {
  private startMouseX = -1;
  private startMouseY = -1;
  private drawing = false;

  constructor(p: P5, config: ToolConfig = {}) {
    super(p, {
      name: 'line-to',
      icon: './lineTo.jpg',
      iconType: IconType.Image,
      ...config
    });
    this.options.push(
      new RangeOption(p, (value: number) => {
        this.p.strokeWeight(value);
      })
    );
  }

  draw() {
    if (this.p.mouseIsPressed && isMouseInCanvas(this.p)) {
      if (this.startMouseX == -1) {
        this.startMouseX = this.p.mouseX;
        this.startMouseY = this.p.mouseY;
        this.drawing = true;
        this.p.loadPixels();
      } else {
        this.p.updatePixels();
        this.p.line(this.startMouseX, this.startMouseY, this.p.mouseX, this.p.mouseY);
      }
    } else if (this.drawing) {
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
      this.p.loadPixels();
    }
  }
}
