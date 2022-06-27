import type P5 from 'p5';

//Displays and handles the colour palette.
export class ColourPalette {
	colours = ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple',
		'orange', 'pink', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy',
		'blue', 'teal', 'aqua'
	];
	selectedColour = 'black';

	constructor(private p: P5) {
		this.loadColours();
	}

	//load in the colours
	loadColours() {
		const colourClick = (event) => {
			//remove the old border
			const current = this.p.select('#' + this.selectedColour + 'Swatch');
			current.style('border', '0');

			//get the new colour from the id of the clicked element
			const newColorElement = this.p.select(`#${event.target.id}`);
			const c = newColorElement.id().split('Swatch')[0];

			//set the selected colour and fill and stroke
			this.selectedColour = c;
			this.p.fill(c);
			this.p.stroke(c);

			//add a new border to the selected colour
			newColorElement.style('border', '2px solid blue');
		}

		//set the fill and stroke properties to be black at the start of the programme
		//running
		this.p.fill(this.colours[0]);
		this.p.stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (let i = 0; i < this.colours.length; i++) {
			const colourID = this.colours[i] + 'Swatch';

			//using p5.dom add the swatch to the palette and set its background colour
			//to be the colour value.
			const colourSwatch = this.p.createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			this.p.select('.colourPalette').child(colourSwatch);
			this.p.select('#' + colourID).style('background-color', this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}

		this.p.select('.colourSwatches').style('border', '2px solid blue');
	}
}