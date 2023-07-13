import type P5 from 'p5';

/**
 * Return true if the mouse is in the canvas
 * @param p P5 instance
 * @returns
 */
export function isMouseInCanvas(p: P5): boolean {
    return (
        p.mouseX > 0 &&
        p.mouseX <= p.width &&
        p.mouseY > 0 &&
        p.mouseY <= p.height
    );
}
