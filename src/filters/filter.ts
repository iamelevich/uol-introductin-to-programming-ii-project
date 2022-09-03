import type P5 from 'p5';
import { PixelHelper } from '../utils/pixelHelper';

export type FilterConfig = {
    name: string;
    text: string;
};

export abstract class Filter {
    constructor(
        protected p: P5,
        protected pixelHelper: PixelHelper,
        protected config: FilterConfig
    ) {
        const filtersElement = this.p.select('#filters');
        filtersElement.html(
            `
        <button class="btn-menu" id="${this.config.name}">
            ${this.config.text}
        </button>
        `,
            true
        );

        this.p.select(`#${this.config.name}`).mouseClicked(() => {
            this.apply();
        });
    }

    abstract apply(): void;
}
