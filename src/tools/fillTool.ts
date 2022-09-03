import type P5 from 'p5';
import { ColorPalette } from '../colourPalette';
import { IconType, Tool } from './tool';

type ColorArray = [number, number, number, number];

// Not stable, can't achive stable performace with p5
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

    mouseClicked(e?: object) {
        const fillColor: ColorArray = [
            this.colorPalette.currentColor.red,
            this.colorPalette.currentColor.green,
            this.colorPalette.currentColor.blue,
            255 * this.colorPalette.currentColor.alpha,
        ];
        this.p.loadPixels();

        const initialColor = this.getPixelColor(this.p.mouseX, this.p.mouseY);

        console.log(this.density, fillColor, initialColor);

        let queue = [];
        queue.push(this.p.createVector(this.p.mouseX, this.p.mouseY));

        while (queue.length) {
            const current = queue.shift();
            const currentIndex = 4 * (this.p.width * current.y + current.x);
            const currentColor = this.getPixelColor(current.x, current.y);

            if (!this.isColorsEqual(currentColor, initialColor)) {
                continue;
            }

            for (let i = 0; i < 4; i++) {
                this.p.pixels[currentIndex + i] = fillColor[0 + i];
            }

            queue = this.expandToNeighbours(queue, current);
        }

        this.p.updatePixels();
    }

    expandToNeighbours(queue: P5.Vector[], current: P5.Vector) {
        const x = current.x;
        const y = current.y;

        if (x - 1 > 0) {
            queue.push(this.p.createVector(x - 1, y));
        }

        if (x + 1 < this.p.width) {
            queue.push(this.p.createVector(x + 1, y));
        }

        if (y - 1 > 0) {
            queue.push(this.p.createVector(x, y - 1));
        }

        if (y + 1 < this.p.height) {
            queue.push(this.p.createVector(x, y + 1));
        }

        return queue;
    }

    getPixelColor(x: number, y: number): ColorArray {
        const off = 4 * (this.p.width * y + x) * this.density;
        return [
            this.p.pixels[off],
            this.p.pixels[off + 1],
            this.p.pixels[off + 2],
            this.p.pixels[off + 3],
        ];
    }

    isColorsEqual(c1: ColorArray, c2: ColorArray): boolean {
        for (let i = 0; i < 4; i++) {
            if (c1[i] != c2[i]) {
                return false;
            }
        }
        return true;
    }
}
