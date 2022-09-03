import type P5 from 'p5';
import { IconType, ITool } from './tool';

export class CircleTool implements ITool {
  icon = 'fa-regular fa-circle';
  name = 'circle';
  iconType = IconType.FA;

  startMouseX = -1;
  startMouseY = -1;
  drawing = false;

  constructor(private p: P5) {}

  draw() {
    if (this.p.mouseIsPressed) {
      if (this.startMouseX == -1) {
        this.startMouseX = this.p.mouseX;
        this.startMouseY = this.p.mouseY;
        this.drawing = true;
        this.p.loadPixels();
      } else {
        this.p.updatePixels();
        const diameter = this.p.max(
          this.p.abs(this.p.mouseX - this.startMouseX),
          this.p.abs(this.p.mouseY - this.startMouseY)
        );
        this.p.circle(
          this.startMouseX + (this.p.mouseX - this.startMouseX) / 2,
          this.startMouseY + (this.p.mouseY - this.startMouseY) / 2,
          diameter
        );
      }
    } else if (this.drawing) {
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }
}
