import type P5 from 'p5';

/**
 * Color array type
 */
export type ColorArray = [number, number, number, number];

/**
 * Helper class to manipulate pixels
 */
export class PixelHelper {
    // The pixel density is used to calculate the pixel offset
    density: number;

    // The pixel width is used to calculate the pixel offset
    pixelWidth: number;

    // The pixel row size is used to calculate the pixel offset
    pixelRowSize: number;

    constructor(private p: P5) {
        this.density = this.p.pixelDensity();
        this.pixelWidth = this.p.width * this.density;
        this.pixelRowSize = this.pixelWidth * 4;
    }

    /**
     * Get the color of a pixel
     * @param x X coordinate
     * @param y Y coordinate
     * @returns
     */
    getPixelColor(x: number, y: number): ColorArray {
        const off = this.getPixelOffset(x, y);
        return [
            this.p.pixels[off],
            this.p.pixels[off + 1],
            this.p.pixels[off + 2],
            this.p.pixels[off + 3],
        ];
    }

    /**
     * Get the offset of a pixel in P5's pixels array
     * @param x X coordinate
     * @param y Y coordinate
     * @returns
     */
    getPixelOffset(x: number, y: number): number {
        return 4 * (this.pixelWidth * (y * this.density) + x * this.density);
    }

    /**
     * Fill a pixel with a provided color
     * @param x X coordinate
     * @param y Y coordinate
     * @param fillColor Color to fill the pixel with
     */
    fillPixelWithColor(x: number, y: number, fillColor: ColorArray) {
        const currentIndex = this.getPixelOffset(x, y);
        for (let colorIndex = 0; colorIndex < 4; colorIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < this.density;
                columnIndex++
            ) {
                for (let rowIndex = 0; rowIndex < this.density; rowIndex++) {
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
