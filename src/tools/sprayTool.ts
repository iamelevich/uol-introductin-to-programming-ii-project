import type P5 from 'p5';
import { IconType, ITool } from './tool';

export class SprayTool implements ITool {
  name = 'spray';
  icon = 'fa-solid fa-spray-can';
  iconType = IconType.FA;
  points = 13;
  spread = 10;

  constructor(private p: P5) {}

  draw() {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (this.p.mouseIsPressed) {
      for (let i = 0; i < this.points; i++) {
        this.p.point(
          this.p.random(
            this.p.mouseX - this.spread,
            this.p.mouseX + this.spread
          ),
          this.p.random(
            this.p.mouseY - this.spread,
            this.p.mouseY + this.spread
          )
        );
      }
    }
  }
}
