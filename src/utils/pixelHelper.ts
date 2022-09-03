import type P5 from 'p5';
import { ColorPalette } from '../colourPalette';

export type ColorArray = [number, number, number, number];

export class PixelHelper {
    density: number;
    pixelWidth: number;
    pixelRowSize: number;

    constructor(
        private p: P5,
        private colorPalette: ColorPalette
    ) {
        this.density = this.p.pixelDensity();
        this.pixelWidth = this.p.width * this.density;
        this.pixelRowSize = this.pixelWidth * 4;
    }

    getPixelColor(x: number, y: number): ColorArray {
        const off = this.getPixelOffset(x, y);
        return [
            this.p.pixels[off],
            this.p.pixels[off + 1],
            this.p.pixels[off + 2],
            this.p.pixels[off + 3],
        ];
    }

    getPixelOffset(x: number, y: number): number {
        return (
            4 *
            (this.pixelWidth * (y * this.density) +
                x * this.density)
        );
    }

    fillPixelWithColor(x: number, y: number, fillColor: ColorArray) {
        const currentIndex = this.getPixelOffset(x, y);
        for (let colorIndex = 0; colorIndex < 4; colorIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < this.density;
                columnIndex++
            ) {
                for (
                    let rowIndex = 0;
                    rowIndex < this.density;
                    rowIndex++
                ) {
                    this.p.pixels[
                        currentIndex +
                            colorIndex +
                            this.pixelRowSize * rowIndex +
                            4 * columnIndex
                    ] = fillColor[colorIndex];
                }
            }
        }

    }
}