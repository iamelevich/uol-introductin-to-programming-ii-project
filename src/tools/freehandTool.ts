import type P5 from 'p5';
import { ITool } from './tool';

export class FreehandTool implements ITool {
	icon = 'assets/freehand.jpg';
	name = 'freehand';

	previousMouseX = -1;
	previousMouseY = -1;

	constructor(private p: P5) {
	}

	draw(){
		//if the mouse is pressed
		if(this.p.mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (this.previousMouseX == -1){
				this.previousMouseX = this.p.mouseX;
				this.previousMouseY = this.p.mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				this.p.line(this.previousMouseX, this.previousMouseY, this.p.mouseX, this.p.mouseY);
				this.previousMouseX = this.p.mouseX;
				this.previousMouseY = this.p.mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			this.previousMouseX = -1;
			this.previousMouseY = -1;
		}
	}
}