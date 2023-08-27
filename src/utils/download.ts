import type { Modal } from './modal';
import type P5 from 'p5';

/**
 * Initializes the download button and its listeners
 * @param p - P5 instance
 * @param modal - Modal instance
 * @param id - Id of the download button
 */
export function InitDownload(p: P5, modal: Modal, id = 'save-image-btn') {
  // Select the download button
  const downloadButton = p.select(`#${id}`);
  // Check if the download button exists
  if (!downloadButton) {
    throw new Error(`Download button with id ${id} not found`);
  }
  // Setup listeners for the download button
  setupListeners(p, modal, downloadButton);
}

/**
 * Setup listeners for the download button
 * @param p - P5 instance
 * @param modal - Modal instance
 * @param downloadButton - Download button element
 */
function setupListeners(p: P5, modal: Modal, downloadButton: P5.Element) {
  // Create download setup element
  const dowloadSetupElement: P5.Element = p.createDiv().addClass('flex flex-row flex-wrap items-center');

  // Create name input
  const nameInputWrapper = p.createDiv().parent(dowloadSetupElement);
  p.createSpan('Image name:').parent(nameInputWrapper);
  const nameInput = p
    .createInput('image', 'text')
    .addClass(
      'w-full h-8 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700 dark:border-gray-500 px-1'
    )
    .value('image from Draw It!')
    .parent(nameInputWrapper);

  // Create type input
  const typeInputWrapper = p.createDiv().addClass('pl-4').parent(dowloadSetupElement);
  p.createP('Image type:').parent(typeInputWrapper);
  // Element type is not correct in p5 types
  const typeRadio = p.createRadio('type').addClass('flex flex-col').parent(typeInputWrapper) as P5.Element & {
    option: (value: string) => void;
    selected: (value: string) => void;
  };
  // Add download types
  typeRadio.option('png');
  typeRadio.option('jpg');
  typeRadio.selected('png');

  // Add click listener to the download button. Shows a modal with the download setup element
  downloadButton.mouseClicked(() => {
    modal.show({
      title: 'Download image',
      content: dowloadSetupElement,
      buttons: {
        accept: {
          text: 'Download',
          onClick: () => {
            download(p, nameInput.value() as string, typeRadio.value() as 'png' | 'jpg');
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
 * Downloads the canvas as an image
 * @param p - P5 instance
 * @param name - Name of the image
 * @param type - Type of the image
 */
function download(p: P5, name: string, type: 'png' | 'jpg') {
  p.saveCanvas(name, type);
}
