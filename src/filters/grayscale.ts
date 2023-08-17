import type P5 from 'p5';
import { PixelHelper } from '../utils/pixelHelper';
import { Filter } from './filter';

export class GrayscaleFilter extends Filter {
    // The conversational factor is used to round the average value to the nearest conversational factor
    readonly conversationalFactor = 255 / 56;

    constructor(p: P5, pixelHelper: PixelHelper) {
        super(p, pixelHelper, {
            name: 'grayscale-filter',
            text: 'Grayscale',
        });
    }

    apply() {
        for (let i = 0; i < this.p.pixels.length; i += 4) {
            // Get the average value of the RGB components
            const averageValue =
                (this.p.pixels[i] +
                    this.p.pixels[i + 1] +
                    this.p.pixels[i + 2]) /
                3;
            // Round the average value to the nearest conversational factor
            const gray = Math.round(
                (averageValue / this.conversationalFactor + 0.5) *
                    this.conversationalFactor
            );
            // Set the RGB components to the gray value
            this.p.pixels[i] = gray;
            this.p.pixels[i + 1] = gray;
            this.p.pixels[i + 2] = gray;
        }
        // Update the pixels
        this.p.updatePixels();
    }
}
