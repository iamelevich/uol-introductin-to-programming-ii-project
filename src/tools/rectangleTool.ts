import { IconType, Tool } from './tool';

export class RectangleTool extends Tool {
    icon = 'fa-regular fa-square';
    name = 'rectangle';
    iconType = IconType.FA;

    startMouseX = -1;
    startMouseY = -1;
    drawing = false;

    draw() {
        if (this.p.mouseIsPressed) {
            if (this.startMouseX == -1) {
                this.startMouseX = this.p.mouseX;
                this.startMouseY = this.p.mouseY;
                this.drawing = true;
                this.p.loadPixels();
            } else {
                this.p.updatePixels();
                this.p.rect(
                    this.startMouseX,
                    this.startMouseY,
                    this.p.mouseX - this.startMouseX,
                    this.p.mouseY - this.startMouseY
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
