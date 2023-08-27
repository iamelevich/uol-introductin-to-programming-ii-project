import type { Modal } from './modal';
import type P5 from 'p5';

/**
 * Initializes the clear button and its listeners
 * @param p - p5 instance
 * @param modal - modal instance
 * @param id - id of the clear button
 */
export function InitClear(p: P5, modal: Modal, id = 'clear-btn') {
  // Select the clear button
  const clearButton = p.select(`#${id}`);
  // Check if the clear button exists
  if (!clearButton) {
    throw new Error(`Clear button with id ${id} not found`);
  }
  // Setup listeners for the clear button
  setupListeners(p, modal, clearButton);
}

/**
 * Setup listeners for the clear button
 * @param p - p5 instance
 * @param modal - modal instance
 * @param clearButton - clear button element
 */
function setupListeners(p: P5, modal: Modal, clearButton: P5.Element) {
  // Clear button click listener (shows a modal)
  clearButton.mouseClicked(() => {
    modal.show({
      title: 'Clear canvas',
      content: '<p>Are you sure you want to clear the canvas?</p>',
      buttons: {
        accept: {
          text: 'Clear',
          onClick: () => {
            clear(p);
          }
        },
        cancel: {
          text: 'Cancel'
        }
      }
    });
  });
}

/**
 * Clears the canvas
 * @param p - p5 instance
 */
function clear(p: P5) {
  p.background(255);

  // call loadPixels to update the drawing state
  // this is needed for some tools
  p.loadPixels();
}
