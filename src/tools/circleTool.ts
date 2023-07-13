import type P5 from 'p5';
import { ColorPalette } from '../colourPalette';
import { VariantOption } from '../options/variants';
import { isMouseInCanvas } from '../utils/utils';
import { IconType, Tool, ToolConfig } from './tool';

enum FillType {
    Fill = 'fill',
    NoFill = 'no-fill',
}

export class CircleTool extends Tool {
    startMouseX = -1;
    startMouseY = -1;
    drawing = false;

    fillType = FillType.Fill;

    constructor(
        p: P5,
        private colorPalette: ColorPalette,
        config: ToolConfig = {}
    ) {
        super(p, {
            name: 'circle',
            icon: 'fa-regular fa-circle',
            iconType: IconType.FA,
            ...config,
        });

        this.options.push(
            new VariantOption<FillType>(
                p,
                (val) => {
                    this.fillType = val;
                },
                {
                    variants: [
                        {
                            name: 'fill',
                            icon: 'fa-solid fa-circle',
                            value: FillType.Fill,
                            isActive: true,
                        },
                        {
                            name: 'no-fill',
                            icon: 'fa-regular fa-circle',
                            value: FillType.NoFill,
                            isActive: false,
                        },
                    ],
                }
            )
        );
    }

    /**
     * Draw circle on mouse drag
     */
    draw() {
        if (this.p.mouseIsPressed && isMouseInCanvas(this.p)) {
            if (this.startMouseX == -1) {
                this.startMouseX = this.p.mouseX;
                this.startMouseY = this.p.mouseY;
                this.drawing = true;
                this.p.loadPixels();
            } else {
                this.p.updatePixels();
                if (this.fillType === FillType.NoFill) {
                    this.p.noFill();
                } else {
                    this.p.fill(this.colorPalette.currentColor.hexString);
                }
                const diameter = this.p.max(
                    this.p.abs(this.p.mouseX - this.startMouseX),
                    this.p.abs(this.p.mouseY - this.startMouseY)
                );
                this.p.circle(
                    this.startMouseX + (this.p.mouseX - this.startMouseX) / 2,
                    this.startMouseY + (this.p.mouseY - this.startMouseY) / 2,
                    diameter
                );
            }
        } else if (this.drawing) {
            this.drawing = false;
            this.startMouseX = -1;
            this.startMouseY = -1;
            this.p.loadPixels();
        }
    }
}
