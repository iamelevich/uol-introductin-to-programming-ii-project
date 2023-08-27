import type P5 from 'p5';

/**
 * Abstract class for tool options
 */
export abstract class ToolOption<T> {
  // Selector for the options element
  private readonly optionsSelector = '.options';
  // Reference to the options element
  private readonly optionsElement: P5.Element | null = null;

  constructor(
    protected p: P5,
    protected cb: (value: T) => void
  ) {
    this.optionsElement = this.p.select(this.optionsSelector);
  }

  /**
   * Adds a new option to the options element
   * @param optionHTML HTML to add to the options element
   */
  protected addNewOption(optionHTML: string): void {
    this.optionsElement?.html(`<div class="rounded-lg bg-slate-200 p-2 mb-2">${optionHTML}</div>`, true);
  }

  /**
   * Adds a new block option to the options element
   * @param optionHTML - HTML to add to the options element
   * @param blockId - ID of the block to add the option to
   */
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

  /**
   * Normalize string to lowercase and replace spaces with dashes
   * @param s string to normalize
   * @returns normalized string
   */
  protected normalize(s: string): string {
    return s.toLowerCase().replace(/\s/g, '-');
  }

  abstract addToList(): void;
}
