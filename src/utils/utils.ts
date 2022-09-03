import type P5 from 'p5';

export function isMouseInCanvas(p: P5) {
    return (
        p.mouseX > 0 &&
        p.mouseX <= p.width &&
        p.mouseY > 0 &&
        p.mouseY <= p.height
    );
}
