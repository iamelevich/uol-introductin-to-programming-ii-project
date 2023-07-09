import type P5 from 'p5';
import { ToolOption } from './option';

export type VariantOptionConfig<T> = {
    variants: VariantOptionConfigVariant<T>[];
};

export type VariantOptionConfigVariant<T> = {
    isActive: boolean;
    name: string;
    icon: string;
    value: T;
};

export class VariantOption<T> extends ToolOption {
    options: VariantOptionConfig<T>;

    constructor(
        protected p: P5,
        protected cb: (value: T) => void,
        options: VariantOptionConfig<T> = {
            variants: [],
        }
    ) {
        super(p, cb);
        this.options = {
            ...options,
        };
    }

    addToList(): void {
        for (const variant of this.options.variants) {
            const normalizedName = this.normalize(variant.name);
            this.addBlockOption(`
                <button class="btn-option ${
                    variant.isActive ? 'btn-option-active' : ''
                }" id='${normalizedName}'><i class="${
                variant.icon
            }"></i></button>
            `);
            const btn = this.p.select(`#${normalizedName}`);
            btn?.mouseClicked(() => {
                this.cb(variant.value);
                const activeBtn = this.p.select('.btn-option-active');
                if (activeBtn) {
                    activeBtn.removeClass('btn-option-active');
                }
                btn?.addClass('btn-option-active');
            });
        }
    }
}
