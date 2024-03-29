import { FilterWithNumberInput } from './filterNumberInput';

import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

/**
 * Blur filter class
 */
export class BlurFilter extends FilterWithNumberInput {
  constructor(p: P5, pixelHelper: PixelHelper, modal: Modal) {
    super(p, pixelHelper, modal, {
      initialValue: 4,
      min: 0,
      max: 10,
      name: 'blur-filter',
      text: 'Blur'
    });
  }

  /**
   * Apply filter
   */
  apply() {
    this.p.filter(this.p.BLUR, (this.filterInput?.value() as number) || this.initialValue);
    this.p.loadPixels();
  }
}
