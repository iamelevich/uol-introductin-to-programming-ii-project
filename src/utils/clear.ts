import type P5 from 'p5';
import { Modal } from './modal';

export function InitClear(p: P5, modal: Modal, id = 'clear-btn') {
    const clearButton = p.select(`#${id}`);
    if (!clearButton) {
        throw new Error(`Clear button with id ${id} not found`);
    }
    setupListeners(p, modal, clearButton);
}

function setupListeners(p: P5, modal: Modal, clearButton: P5.Element) {
    clearButton.mouseClicked(() => {
        modal.show({
            title: 'Clear canvas',
            content: '<p>Are you sure you want to clear the canvas?</p>',
            buttons: {
                accept: {
                    text: 'Clear',
                    onClick: () => {
                        clear(p);
                    },
                },
                cancel: {
                    text: 'Cancel',
                },
            },
        });
    });
}

function clear(p: P5) {
    p.background(255);

    // call loadPixels to update the drawing state
    // this is needed for some tools
    p.loadPixels();
}
