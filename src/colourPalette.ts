import type P5 from 'p5';
import iro from '@jaames/iro';

//Displays and handles the colour palette.
export class ColourPalette {

  readonly colourPaletteIdentifier = '.colour-palette';
  readonly colourPickerIdentifier = '.colour-picker';
  readonly defaultColor = '#ada1df';
  readonly colorPickerWidth = 150;

  colourPaletteElement: P5.Element;
  colourPickerElement: P5.Element;
  colourPickerElementRect: { left: number, right: number, top: number, bottom: number } = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  isColorPickerElementOpen = false;

  constructor(private p: P5) {
    this.colourPaletteElement = this.p.select(this.colourPaletteIdentifier);
    this.colourPickerElement = this.p.select(this.colourPickerIdentifier)
    this.loadColours();
  }

  //load in the colours
  loadColours() {
    const colorPicker = new iro.ColorPicker(this.colourPickerIdentifier, {
      width: this.colorPickerWidth,
      color: this.defaultColor
    });

    colorPicker.on(['color:init', 'color:change'], (color) => {
      this.p.fill(color.hexString);
      this.p.stroke(color.hexString);
      this.colourPaletteElement.style('background-color', color.hexString);
    });

    this.colourPaletteElement.mouseClicked(() => {
      this.colourPickerElement.toggleClass('hidden');
      if (this.colourPickerElement.hasClass('hidden')) {
        this.isColorPickerElementOpen = false;
      } else {
        this.isColorPickerElementOpen = true;
        this.colourPickerElementRect = this.colourPickerElement.elt.getBoundingClientRect();
      }
    });
  }

  isAllowedToDraw() {
    if (!this.isColorPickerElementOpen) {
      return true;
    }
    if (
      this.p.winMouseX >= this.colourPickerElementRect.left && this.p.winMouseX <= this.colourPickerElementRect.right &&
      this.p.winMouseY >= this.colourPickerElementRect.top && this.p.winMouseY <= this.colourPickerElementRect.bottom
    ) {
      return false;
    }
    return true;
  }
}
