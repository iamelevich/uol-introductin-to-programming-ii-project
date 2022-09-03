import type P5 from 'p5';
import { ColorPalette } from '../colourPalette';
import { VariantOption } from '../options/variants';
import { IconType, Tool, ToolConfig } from './tool';

enum FillType {
    Fill = 'fill',
    NoFill = 'no-fill'
}

export class RectangleTool extends Tool {
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
            name: 'rectangle',
            icon: 'fa-regular fa-square',
            iconType: IconType.FA, 
            ...config
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
                            icon: 'fa-solid fa-square',
                            value: FillType.Fill,
                            isActive: true
                        },
                        {
                            name: 'no-fill',
                            icon: 'fa-regular fa-square',
                            value: FillType.NoFill,
                            isActive: false
                        }
                    ],
                }
            )
        );
    }

    draw() {
        if (this.p.mouseIsPressed) {
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
                this.p.rect(
                    this.startMouseX,
                    this.startMouseY,
                    this.p.mouseX - this.startMouseX,
                    this.p.mouseY - this.startMouseY
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
