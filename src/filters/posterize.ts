import { FilterWithNumberInput } from './filterNumberInput';

import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export class PosterizeFilter extends FilterWithNumberInput {
  constructor(p: P5, pixelHelper: PixelHelper, modal: Modal) {
    super(p, pixelHelper, modal, {
      initialValue: 10,
      min: 2,
      max: 255,
      name: 'posterize-filter',
      text: 'Posterize'
    });
  }

  apply() {
    this.p.filter(this.p.POSTERIZE, (this.filterInput?.value() as number) || this.initialValue);
  }
}
