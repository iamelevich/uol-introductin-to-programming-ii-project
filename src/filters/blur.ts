import type P5 from 'p5';
import { PixelHelper } from '../utils/pixelHelper';
import { Filter } from './filter';

export class BlurFilter extends Filter {
    constructor(p: P5, pixelHelper: PixelHelper) {
        super(p, pixelHelper, {
            name: 'blur-filter',
            text: 'Blur',
        });
    }

    apply() {
        this.p.filter(this.p.BLUR, 4);
    }
}
