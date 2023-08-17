import type P5 from 'p5';

export type ModalShowOptions = {
    onShow?: () => void;
    onClose?: () => void;
    title?: string;
    content?: string | P5.Element;
    buttons?: {
        accept?: {
            text: string;
            onClick?: () => void;
        };
        cancel?: {
            text: string;
            onClick?: () => void;
        };
    };
};

export class Modal {
    private modal: P5.Element;
    private title: P5.Element;
    private content: P5.Element;
    private acceptButton: P5.Element;
    private cancelButton: P5.Element;
    private closeButton: P5.Element;

    constructor(private p: P5, private id: string) {
        const modal = this.p.select(`#${this.id}`);
        if (!modal) {
            throw new Error(`Modal with id ${this.id} not found`);
        }
        this.modal = modal;
        this.title = this.selectElementOrThrow(`#${this.id} .modal-title`);
        this.content = this.selectElementOrThrow(`#${this.id} .modal-body`);
        this.acceptButton = this.selectElementOrThrow(
            `#${this.id} .modal-accept`
        );
        this.cancelButton = this.selectElementOrThrow(
            `#${this.id} .modal-cancel`
        );
        this.closeButton = this.selectElementOrThrow(
            `#${this.id} .modal-close`
        );
    }

    /**
     * Shows the modal
     * @param options Options for the modal
     * @param options.onClose Callback for when the modal is closed
     * @param options.title Title of the modal
     * @param options.content Content of the modal
     * @param options.buttons Buttons to show on the modal
     * @param options.buttons.accept Accept button
     * @param options.buttons.accept.text Text of the accept button
     * @param options.buttons.accept.onClick Callback for when the accept button is clicked
     * @param options.buttons.cancel Cancel button
     * @param options.buttons.cancel.text Text of the cancel button
     * @param options.buttons.cancel.onClick Callback for when the cancel button is clicked
     * @throws Error if the modal is already visible
     * @example
     * ```ts
     * const modal = new Modal(p, 'modal-id');
     * modal.show({
     *    title: 'Modal title',
     *    content: '<p>Modal content</p>',
     *    buttons: {
     *      accept: {
     *        text: 'Accept',
     *        onClick: () => {
     *          console.log('Accept button clicked');
     *        }
     *      },
     *      cancel: {
     *        text: 'Cancel',
     *        onClick: () => {
     *          console.log('Cancel button clicked');
     *        }
     *      }
     *    },
     *    onClose: () => {
     *      console.log('Modal closed');
     *    }
     * });
     * ```
     */
    show(options: ModalShowOptions): void {
        if (this.isVisible()) {
            throw new Error('Modal is already visible');
        }

        // Set the title
        this.title.html(options.title || '');

        // Clear old content
        this.content.html('');
        // Set the content
        if (typeof options.content === 'string') {
            this.content.html(options.content);
        } else {
            this.content.child(options.content);
        }

        // Set the buttons
        if (options.buttons?.accept) {
            this.acceptButton.html(options.buttons.accept.text);
            this.acceptButton.mouseClicked(() => {
                options.buttons?.accept?.onClick?.();
                options.onClose?.();
                this.hide();
            });
        } else {
            this.acceptButton.html('OK');
        }
        if (options.buttons?.cancel) {
            this.cancelButton.html(options.buttons.cancel.text);
            this.cancelButton.mouseClicked(() => {
                options.buttons?.cancel?.onClick?.();
                options.onClose?.();
                this.hide();
            });
        } else {
            this.cancelButton.html('Cancel');
        }

        this.closeButton.mouseClicked(() => {
            options.onClose?.();
            this.hide();
        });

        // Show the modal
        this.modal.removeClass('hidden');
    }

    /**
     * Hides the modal
     */
    hide(): void {
        this.modal.addClass('hidden');

        // Remove the event listeners
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.acceptButton.mouseClicked(() => {});
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.cancelButton.mouseClicked(() => {});
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.closeButton.mouseClicked(() => {});
    }

    /**
     * Returns whether the modal is visible or not
     * @returns Whether the modal is visible or not
     */
    isVisible(): boolean {
        return !this.modal.class().split(' ').includes('hidden');
    }

    /**
     * Selects an element from the modal
     * @param selector - The selector of the element to select
     * @returns The element with the given selector
     */
    private selectElementOrThrow(selector: string): P5.Element {
        const element = this.p.select(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        return element;
    }
}
