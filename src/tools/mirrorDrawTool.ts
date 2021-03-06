import type P5 from 'p5';
import { ITool } from './tool';

export class RirrorDrawTool implements ITool {
	name = 'MirrorDraw';
	icon = 'assets/mirrorDraw.jpg';

	//which axis is being mirrored (x or y) x is default
	axis = 'x';
	//line of symmetry is halfway across the screen
	lineOfSymmetry: number;

	constructor(private p: P5) {
		this.lineOfSymmetry = this.p.width / 2;
	}

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	previousMouseX = -1;
	previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry.
	previousOppositeMouseX = -1;
	previousOppositeMouseY = -1;

	draw() {
		//display the last save state of pixels
		this.p.updatePixels();

		//do the drawing if the mouse is pressed
		if (this.p.mouseIsPressed) {
			//if the previous values are -1 set them to the current mouse location
			//and mirrored positions
			if (this.previousMouseX == -1) {
				this.previousMouseX = this.p.mouseX;
				this.previousMouseY = this.p.mouseY;
				this.previousOppositeMouseX = this.calculateOpposite(this.p.mouseX, 'x');
				this.previousOppositeMouseY = this.calculateOpposite(this.p.mouseY, 'y');
			}

			//if there are values in the previous locations
			//draw a line between them and the current positions
			else {
				this.p.line(this.previousMouseX, this.previousMouseY, this.p.mouseX, this.p.mouseY);
				this.previousMouseX = this.p.mouseX;
				this.previousMouseY = this.p.mouseY;

				//these are for the mirrored drawing the other side of the
				//line of symmetry
				const oX = this.calculateOpposite(this.p.mouseX, 'x');
				const oY = this.calculateOpposite(this.p.mouseY, 'y');
				this.p.line(this.previousOppositeMouseX, this.previousOppositeMouseY, oX, oY);
				this.previousOppositeMouseX = oX;
				this.previousOppositeMouseY = oY;
			}
		}
		//if the mouse isn't pressed reset the previous values to -1
		else {
			this.previousMouseX = -1;
			this.previousMouseY = -1;

			this.previousOppositeMouseX = -1;
			this.previousOppositeMouseY = -1;
		}

		//after the drawing is done save the pixel state. We don't want the
		//line of symmetry to be part of our drawing

		this.p.loadPixels();

		//push the drawing state so that we can set the stroke weight and colour
		this.p.push();
		this.p.strokeWeight(3);
		this.p.stroke('red');
		//draw the line of symmetry
		if (this.axis == 'x') {
			this.p.line(this.p.width / 2, 0, this.p.width / 2, this.p.height);
		} else {
			this.p.line(0, this.p.height / 2, this.p.width, this.p.height / 2);
		}
		//return to the original stroke
		this.p.pop();
	}

	/**
	 * calculate an opposite coordinate the other side of the
	 * symmetry line.
	 * @param n number: location for either x or y coordinate
	 * @param a [x,y]: the axis of the coordinate (y or y)
	 * @return number: the opposite coordinate
	 */
	calculateOpposite(n: number, a: 'x' | 'y') {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	}


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	unselectTool() {
		this.p.updatePixels();
		//clear options
		this.p.select('.options').html('');
	}

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	populateOptions() {
		const btnId = 'directionButton';
		this.p.select('.options').html(
			`<button id='${btnId}'>Make Horizontal</button>`);
		// 	//click handler
		this.p.select(`#${btnId}`).mouseClicked(() => {
			const button = this.p.select(`#${btnId}`);
			if (this.axis == 'x') {
				this.axis = 'y';
				this.lineOfSymmetry = this.p.height / 2;
				button.html('Make Vertical');
			} else {
				this.axis = 'x';
				this.lineOfSymmetry = this.p.width / 2;
				button.html('Make Horizontal');
			}
		});
	}
}