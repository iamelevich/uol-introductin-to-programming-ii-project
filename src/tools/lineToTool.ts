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
    // If the mouse is pressed and the mouse is in the canvas
    if (this.p.mouseIsPressed && isMouseInCanvas(this.p)) {
      // If the mouse is pressed for the first time
      if (this.startMouseX == -1) {
        // Save the mouse position
        this.startMouseX = this.p.mouseX;
        this.startMouseY = this.p.mouseY;
        // Set the drawing flag to true
        this.drawing = true;
        // Load the pixels
        this.p.loadPixels();
      } else {
        // Update the pixels
        this.p.updatePixels();
        // Draw the line
        this.p.line(this.startMouseX, this.startMouseY, this.p.mouseX, this.p.mouseY);
      }
    } else if (this.drawing) {
      // Reset state
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
      this.p.loadPixels();
    }
  }
}
