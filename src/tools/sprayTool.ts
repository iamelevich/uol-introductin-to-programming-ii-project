import type P5 from 'p5';
import { RangeOption } from '../options/range';
import { isMouseInCanvas } from '../utils/utils';
import { IconType, Tool, ToolConfig } from './tool';

export class SprayTool extends Tool {
    points = 13;
    spread = 10;

    constructor(p: P5, config: ToolConfig = {}) {
        super(p, {
            name: 'spray',
            icon: 'fa-solid fa-spray-can',
            iconType: IconType.FA,
            cursorClass: 'cursor-spray',
            ...config,
        });
        this.options.push(
            new RangeOption(
                p,
                (value: number) => {
                    this.points = value;
                },
                {
                    label: 'Points',
                    initialValue: 13,
                    minValue: 5,
                    maxValue: 100,
                }
            )
        );
        this.options.push(
            new RangeOption(
                p,
                (value: number) => {
                    this.spread = value;
                },
                {
                    label: 'Spread',
                    initialValue: 10,
                    minValue: 5,
                    maxValue: 100,
                }
            )
        );
    }

    draw() {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if (this.p.mouseIsPressed && isMouseInCanvas(this.p)) {
            for (let i = 0; i < this.points; i++) {
                this.p.point(
                    this.p.random(
                        this.p.mouseX - this.spread,
                        this.p.mouseX + this.spread
                    ),
                    this.p.random(
                        this.p.mouseY - this.spread,
                        this.p.mouseY + this.spread
                    )
                );
            }
            this.p.loadPixels();
        }
    }

    // Reset strokeWeight to 1
    unselectTool(): void {
        super.unselectTool();
        this.p.strokeWeight(1);
    }
}
