import type P5 from 'p5';
import { RangeOption } from '../options/range';
import { IconType, Tool } from './tool';

export class LineToTool extends Tool {
    icon = 'assets/lineTo.jpg';
    name = 'line-to';
    iconType = IconType.Image;

    startMouseX = -1;
    startMouseY = -1;
    drawing = false;

    constructor(p: P5) {
        super(p);
        this.options.push(
            new RangeOption(p, (value: number) => {
                this.p.strokeWeight(value);
            })
        );
    }

    draw() {
        if (this.p.mouseIsPressed) {
            if (this.startMouseX == -1) {
                this.startMouseX = this.p.mouseX;
                this.startMouseY = this.p.mouseY;
                this.drawing = true;
                this.p.loadPixels();
            } else {
                this.p.updatePixels();
                this.p.line(
                    this.startMouseX,
                    this.startMouseY,
                    this.p.mouseX,
                    this.p.mouseY
                );
            }
        } else if (this.drawing) {
            this.drawing = false;
            this.startMouseX = -1;
            this.startMouseY = -1;
            this.p.loadPixels();
        }
    }
}
