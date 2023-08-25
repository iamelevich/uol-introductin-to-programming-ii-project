import iro from '@jaames/iro';

import type P5 from 'p5';

// Displays and handles the colour palette.
export class ColorPalette {
  private readonly colorPaletteIdentifier = '.color-palette';
  private readonly colorPickerIdentifier = '.color-picker';
  private readonly defaultColor = '#ada1df';
  private readonly colorPickerWidth = 150;

  private readonly colorPicker: iro.ColorPicker;
  private readonly colorPaletteElement: P5.Element | null;
  private readonly colorPickerElement: P5.Element | null;
  private colorPickerElementRect: {
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
  private isColorPickerElementOpen = false;

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
    // Load event listeners for the color picker
    this.loadColors();
  }

  /**
   * Return current color
   * @returns {iro.Color}
   */
  get currentColor(): iro.Color {
    return this.colorPicker.color;
  }

  /**
   * Check is mouse is inside of the color picker element
   * @returns {boolean} True if the mouse is allowed to draw, false otherwise
   */
  isAllowedToDraw(): boolean {
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

  /**
   * Run from the constructor to load the colors
   */
  private loadColors() {
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
}
