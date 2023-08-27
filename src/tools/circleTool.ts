import { VariantOption } from '../options/variants';
import { isMouseInCanvas } from '../utils/utils';

import { IconType, Tool } from './tool';

import type { ToolConfig } from './tool';
import type { ColorPalette } from '../colourPalette';
import type P5 from 'p5';

enum FillType {
  Fill = 'fill',
  NoFill = 'no-fill'
}

export class CircleTool extends Tool {
  private startMouseX = -1;
  private startMouseY = -1;
  private drawing = false;
  private fillType = FillType.Fill;

  constructor(
    p: P5,
    private colorPalette: ColorPalette,
    config: ToolConfig = {}
  ) {
    super(p, {
      name: 'circle',
      icon: 'fa-regular fa-circle',
      iconType: IconType.FA,
      ...config
    });

    // Add fill type option
    this.options.push(
      new VariantOption<FillType>(
        p,
        (val) => {
          this.fillType = val;
        },
        {
          variants: [
            {
              name: 'fill',
              icon: 'fa-solid fa-circle',
              value: FillType.Fill,
              isActive: true
            },
            {
              name: 'no-fill',
              icon: 'fa-regular fa-circle',
              value: FillType.NoFill,
              isActive: false
            }
          ]
        }
      )
    );
  }

  /**
   * Draw circle on mouse drag
   */
  draw() {
    // Check if the mouse is pressed and if the mouse is in the canvas
    if (this.p.mouseIsPressed && isMouseInCanvas(this.p)) {
      // Check if the mouse is pressed for the first time
      if (this.startMouseX == -1) {
        // Set the start mouse position
        this.startMouseX = this.p.mouseX;
        this.startMouseY = this.p.mouseY;
        this.drawing = true;
        this.p.loadPixels();
      } else {
        // Restore the pixels
        this.p.updatePixels();
        // Set the fill type
        if (this.fillType === FillType.NoFill) {
          this.p.noFill();
        } else {
          this.p.fill(this.colorPalette.currentColor.hexString);
        }
        // Calculate the diameter
        const diameter = this.p.max(
          this.p.abs(this.p.mouseX - this.startMouseX),
          this.p.abs(this.p.mouseY - this.startMouseY)
        );
        // Draw the circle
        this.p.circle(
          this.startMouseX + (this.p.mouseX - this.startMouseX) / 2,
          this.startMouseY + (this.p.mouseY - this.startMouseY) / 2,
          diameter
        );
      }
    } else if (this.drawing) {
      // Reset the drawing state
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
      this.p.loadPixels();
    }
  }
}
