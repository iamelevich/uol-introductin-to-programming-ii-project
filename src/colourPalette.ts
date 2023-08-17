import iro from '@jaames/iro';

import type P5 from 'p5';

//Displays and handles the colour palette.
export class ColorPalette {
  readonly colorPaletteIdentifier = '.color-palette';
  readonly colorPickerIdentifier = '.color-picker';
  readonly defaultColor = '#ada1df';
  readonly colorPickerWidth = 150;

  colorPicker: iro.ColorPicker;
  colorPaletteElement: P5.Element | null;
  colorPickerElement: P5.Element | null;
  colorPickerElementRect: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  } = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  isColorPickerElementOpen = false;

  constructor(private p: P5) {
    this.colorPaletteElement = this.p.select(this.colorPaletteIdentifier);
    this.colorPickerElement = this.p.select(this.colorPickerIdentifier);
    // Need ts-ignore because of the iro library
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.colorPicker = new iro.ColorPicker(this.colorPickerIdentifier, {
      width: this.colorPickerWidth,
      color: this.defaultColor
    });
    this.loadColors();
  }

  /**
   * Return current color
   * @returns {iro.Color}
   */
  get currentColor(): iro.Color {
    return this.colorPicker.color;
  }

  //load in the colours
  loadColors() {
    this.colorPicker.on(['color:init', 'color:change'], (color: iro.Color) => {
      this.p.fill(color.hexString);
      this.p.stroke(color.hexString);
      this.colorPaletteElement?.style('background-color', color.hexString);
    });

    this.colorPaletteElement?.mouseClicked(() => {
      this.colorPickerElement?.toggleClass('hidden');
      if (this.colorPickerElement?.hasClass('hidden')) {
        this.isColorPickerElementOpen = false;
      } else {
        this.isColorPickerElementOpen = true;
        this.colorPickerElementRect = this.colorPickerElement?.elt.getBoundingClientRect();
      }
    });
  }

  isAllowedToDraw() {
    if (!this.isColorPickerElementOpen) {
      return true;
    }
    return !(
      this.p.winMouseX >= this.colorPickerElementRect.left &&
      this.p.winMouseX <= this.colorPickerElementRect.right &&
      this.p.winMouseY >= this.colorPickerElementRect.top &&
      this.p.winMouseY <= this.colorPickerElementRect.bottom
    );
  }
}
