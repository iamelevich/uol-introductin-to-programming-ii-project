import type P5 from 'p5';
import { Modal } from './modal';

export function InitDownload(p: P5, modal: Modal, id = 'save-image-btn') {
    const downloadButton = p.select(`#${id}`);
    if (!downloadButton) {
        throw new Error(`Download button with id ${id} not found`);
    }
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
    const dowloadSetupElement: P5.Element = p
        .createDiv()
        .addClass('flex flex-row flex-wrap items-center');

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
    const typeInputWrapper = p
        .createDiv()
        .addClass('pl-4')
        .parent(dowloadSetupElement);
    p.createP('Image type:').parent(typeInputWrapper);
    // Element type is not correct in p5 types
    const typeRadio = p
        .createRadio('type')
        .addClass('flex flex-col')
        .parent(typeInputWrapper) as P5.Element & {
        option: (value: string) => void;
    };
    typeRadio.option('png');
    typeRadio.option('jpg');

    downloadButton.mouseClicked(() => {
        modal.show({
            title: 'Download image',
            content: dowloadSetupElement,
            buttons: {
                accept: {
                    text: 'Download',
                    onClick: () => {
                        download(
                            p,
                            nameInput.value() as string,
                            typeRadio.value() as 'png' | 'jpg'
                        );
                    },
                },
                cancel: {
                    text: 'Cancel',
                },
            },
        });
    });
}

function download(p: P5, name: string, type: 'png' | 'jpg') {
    p.saveCanvas(name, type);
}
