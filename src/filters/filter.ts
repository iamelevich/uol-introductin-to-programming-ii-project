import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export type FilterConfig = {
  name: string;
  text: string;
};

export abstract class Filter {
  constructor(
    protected p: P5,
    protected pixelHelper: PixelHelper,
    protected config: FilterConfig
  ) {
    // Create the button
    const filtersElement = this.p.select('#filters');
    filtersElement?.html(
      `
        <button class="btn-menu" id="${this.config.name}">
            ${this.config.text}
        </button>
        `,
      true
    );

    // Add the event listener
    this.p.select(`#${this.config.name}`)?.mouseClicked(() => {
      this.apply();
    });
  }

  /**
   * Apply the filter to the image
   */
  abstract apply(): void;
}
