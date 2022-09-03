import type P5 from 'p5';
import { RangeOption } from '../options/range';
import { IconType, Tool, ToolConfig } from './tool';

export class PencilTool extends Tool {
    previousMouseX = -1;
    previousMouseY = -1;

    constructor(p: P5, config: ToolConfig = {}) {
        super(p, {
            name: 'pencil',
            icon: 'fa-solid fa-pencil',
            iconType: IconType.FA, 
            ...config
        });
        this.options.push(
            new RangeOption(p, (value: number) => {
                this.p.strokeWeight(value);
            })
        );
    }

    draw() {
        this.p.updatePixels();
        //if the mouse is pressed
        if (this.p.mouseIsPressed) {
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (this.previousMouseX == -1) {
                this.previousMouseX = this.p.mouseX;
                this.previousMouseY = this.p.mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from
            //there to the current mouse location
            else {
                this.p.line(
                    this.previousMouseX,
                    this.previousMouseY,
                    this.p.mouseX,
                    this.p.mouseY
                );
                this.p.loadPixels();
                this.previousMouseX = this.p.mouseX;
                this.previousMouseY = this.p.mouseY;
            }
        }
        //if the user has released the mouse we want to set the previousMouse values
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
            this.previousMouseX = -1;
            this.previousMouseY = -1;

            this.p.loadPixels();
            this.p.push();
            this.p.line(
                this.p.mouseX,
                this.p.mouseY,
                this.p.mouseX,
                this.p.mouseY
            );
            this.p.pop();
        }
    }

    // Reset strokeWeight to 1
    unselectTool(): void {
        super.unselectTool();
        this.p.strokeWeight(1);
    }
}
