import P5 from 'p5';

import { HelperFunctions } from './helperFunctions';
import { Toolbox } from './toolbox';
import { ColorPalette } from './colourPalette';

import { PencilTool } from './tools/freehandTool';
import { LineToTool } from './tools/lineToTool';
import { SprayTool } from './tools/sprayTool';
import { RirrorDrawTool } from './tools/mirrorDrawTool';
import { RectangleTool } from './tools/rectangleTool';
import { CircleTool } from './tools/circleTool';
import { FillTool } from './tools/fillTool';

const sketch = function (p: P5) {
    const toolbox = new Toolbox(p);
    let colorPalette: ColorPalette | undefined;

    p.setup = function () {
        const canvasContainer = p.select('#content');
        const c = p.createCanvas(
            (canvasContainer.size() as any).width,
            (canvasContainer.size() as any).height
        );
        c.parent('content');

        //create helper functions and the colour palette
        new HelperFunctions(p);
        colorPalette = new ColorPalette(p);

        //add the tools to the toolbox.
        toolbox.addTool(new PencilTool(p));
        toolbox.addTool(new LineToTool(p));
        toolbox.addTool(new SprayTool(p));
        toolbox.addTool(new RirrorDrawTool(p));
        toolbox.addTool(new RectangleTool(p));
        toolbox.addTool(new CircleTool(p));
        toolbox.addTool(new FillTool(p, colorPalette));
        p.background(255);
    };

    p.draw = function () {
        // Do not process clicks out the canvas
        if (
            p.mouseX < 0 ||
            p.mouseY < 0 ||
            p.mouseX > p.width ||
            p.mouseY > p.height
        ) {
            return;
        }
        // When color panel is open - do not process click
        if (colorPalette?.isAllowedToDraw() === false) {
            return;
        }

        // Process draw() function of the selected tool
        if (typeof toolbox.selectedTool['draw'] == 'function') {
            toolbox.selectedTool.draw();
        } else {
            alert("it doesn't look like your tool has a draw method!");
        }
    };

    p.mouseClicked = (e) => {
        // Do not process clicks out the canvas
        if (
            p.mouseX < 0 ||
            p.mouseY < 0 ||
            p.mouseX > p.width ||
            p.mouseY > p.height
        ) {
            return;
        }
        // When color panel is open - do not process click
        if (colorPalette?.isAllowedToDraw() === false) {
            return;
        }
        // Call mouseClicked is it exists in selectec tool
        if (typeof toolbox.selectedTool['mouseClicked'] == 'function') {
            toolbox.selectedTool.mouseClicked();
        }
    };
};

new P5(sketch);
