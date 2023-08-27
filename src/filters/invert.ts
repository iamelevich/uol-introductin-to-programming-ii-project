import { Filter } from './filter';

import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

/**
 * Invert filter class
 */
export class InvertFilter extends Filter {
  constructor(p: P5, pixelHelper: PixelHelper, modal: Modal) {
    super(p, pixelHelper, modal, {
      name: 'invert-filter',
      text: 'Invert'
    });
  }

  /**
   * Apply filter
   */
  apply() {
    this.p.filter(this.p.INVERT);
    this.p.loadPixels();
  }
}
