import type P5 from 'p5';
import { ColorPalette } from '../colourPalette';
import { IconType, Tool } from './tool';

type ColorArray = [number, number, number, number];

export class FillTool extends Tool {
    name = 'fill';
    icon = 'fa-solid fa-fill';
    iconType = IconType.FA;

    density: number;

    constructor(p: P5, private colorPalette: ColorPalette) {
        super(p);
        this.density = this.p.pixelDensity();
    }

    draw() {
        // do nothing
    }

    mouseClicked() {
        const rowSizeInPixels = this.p.width * this.density * 4;

        const fillColor: ColorArray = [
            this.colorPalette.currentColor.red,
            this.colorPalette.currentColor.green,
            this.colorPalette.currentColor.blue,
            255,
        ];
        this.p.loadPixels();

        const initialColor = this.getPixelColor(this.p.mouseX, this.p.mouseY);

        console.log(
            this.p.mouseX,
            this.p.mouseY,
            this.p.width,
            this.density,
            fillColor,
            initialColor
        );

        let queue = [];
        queue.push(this.p.createVector(this.p.mouseX, this.p.mouseY));

        while (queue.length) {
            const current = queue.shift();
            const currentIndex = this.getPixelOffset(current.x, current.y);
            const currentColor = this.getPixelColor(current.x, current.y);

            if (
                !this.arrayEquals(currentColor, initialColor) ||
                this.arrayEquals(currentColor, fillColor)
            ) {
                continue;
            }

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
                                rowSizeInPixels * rowIndex +
                                4 * columnIndex
                        ] = fillColor[colorIndex];
                    }
                }
            }

            queue = this.expandToNeighbours(queue, current);
            if (queue.length > 20000) {
                console.log('Queue is too big', queue.length);
                break;
            }
        }

        this.p.updatePixels();
    }

    expandToNeighbours(queue: P5.Vector[], current: P5.Vector) {
        const x = current.x;
        const y = current.y;

        if (x > 0) {
            queue.push(this.p.createVector(x - 1, y));
        }
        if (x < this.p.width) {
            queue.push(this.p.createVector(x + 1, y));
        }
        if (y > 0) {
            queue.push(this.p.createVector(x, y - 1));
        }
        if (y < this.p.height) {
            queue.push(this.p.createVector(x, y + 1));
        }

        return queue;
    }

    getPixelOffset(x: number, y: number): number {
        return (
            4 *
            (this.p.width * this.density * (y * this.density) +
                x * this.density)
        );
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

    arrayEquals(a, b) {
        return (
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index])
        );
    }
}
