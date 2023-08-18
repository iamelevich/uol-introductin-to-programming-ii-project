import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export type FilterConfig = {
  name: string;
  text: string;
};

export abstract class Filter {
  constructor(
    protected p: P5,
    protected pixelHelper: PixelHelper,
    protected modal: Modal,
    protected config: FilterConfig
  ) {
    // Create the button
    const filtersElement = this.p.select('#filters');
    filtersElement?.html(
      `
        <button class="btn-menu" id="${this.config.name}">
            ${this.config.text}
        </button>
        `,
      true
    );

    // Add the event listener
    this.p.select(`#${this.config.name}`)?.mouseClicked(() => {
      this.showModal();
    });
  }

  /**
   * Return modal content
   * @returns Modal content
   */
  protected getModalContent(): P5.Element | string {
    return `Are you sure that you want to apply ${this.config.text} filer?`;
  }

  /**
   * Show modal with filter config or are you sure text
   */
  protected showModal() {
    this.modal.show({
      title: this.config.text,
      content: this.getModalContent(),
      buttons: {
        accept: {
          text: 'Apply',
          onClick: () => {
            this.apply();
          }
        }
      }
    });
  }

  /**
   * Apply the filter to the image
   */
  abstract apply(): void;
}
