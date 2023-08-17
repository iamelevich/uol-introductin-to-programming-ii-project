import type P5 from 'p5';

export abstract class ToolOption<T> {
  readonly optionsSelector = '.options';

  optionsElement: P5.Element | null = null;

  constructor(
    protected p: P5,
    protected cb: (value: T) => void
  ) {
    this.optionsElement = this.p.select(this.optionsSelector);
  }

  normalize(s: string): string {
    return s.toLowerCase().replace(/\s/g, '-');
  }

  protected addNewOption(optionHTML: string): void {
    this.optionsElement?.html(`<div class="rounded-lg bg-slate-200 p-2 mb-2">${optionHTML}</div>`, true);
  }

  protected addBlockOption(optionHTML: string, blockId = 'options-block'): void {
    let blockElement = this.p.select(`${this.optionsSelector} #${blockId}`);
    if (!blockElement) {
      blockElement = this.p.createDiv();
      blockElement.id(blockId);
      blockElement.class('grid grid-cols-2 justify-items-center');
      if (this.optionsElement) {
        blockElement.parent(this.optionsElement);
      }
    }
    blockElement.html(`${optionHTML}`, true);
  }

  abstract addToList(): void;
}
