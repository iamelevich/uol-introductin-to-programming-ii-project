import P5 from 'p5';

import { HelperFunctions } from './utils/helperFunctions';
import { Toolbox } from './toolbox';
import { ColorPalette } from './colourPalette';

import { PencilTool } from './tools/pencilTool';
import { LineToTool } from './tools/lineToTool';
import { SprayTool } from './tools/sprayTool';
import { MirrorDrawTool } from './tools/mirrorDrawTool';
import { RectangleTool } from './tools/rectangleTool';
import { CircleTool } from './tools/circleTool';
import { FillTool } from './tools/fillTool';
import { PixelHelper } from './utils/pixelHelper';
import { GrayscaleFilter } from './filters/grayscale';
import { isMouseInCanvas } from './utils/utils';
import { BlurFilter } from './filters/blur';

/**
 * Sketch function
 * @param p P5 instance
 */
const sketch = function (p: P5) {
    const toolbox = new Toolbox(p);
    let colorPalette: ColorPalette | undefined;

    /**
     * Setup function
     */
    p.setup = function () {
        const canvasContainer = p.select('#content');
        const c = p.createCanvas(
            (canvasContainer?.size() as any).width,
            (canvasContainer?.size() as any).height
        );
        c.parent('content');

        //create helper functions and the colour palette
        HelperFunctions(p);
        colorPalette = new ColorPalette(p);
        const pixelHelper = new PixelHelper(p, colorPalette);

        //add the tools to the toolbox.
        toolbox.addTool(new PencilTool(p));
        toolbox.addTool(new LineToTool(p));
        toolbox.addTool(new SprayTool(p));
        toolbox.addTool(new MirrorDrawTool(p));
        toolbox.addTool(new RectangleTool(p, colorPalette));
        toolbox.addTool(new CircleTool(p, colorPalette));
        toolbox.addTool(new FillTool(p, colorPalette, pixelHelper));

        // Init filters
        new GrayscaleFilter(p, pixelHelper);
        new BlurFilter(p, pixelHelper);

        p.background(255);
    };

    /**
     * Draw loop
     * @returns
     */
    p.draw = function () {
        // When color panel is open - do not process click
        if (colorPalette?.isAllowedToDraw() === false) {
            return;
        }

        // Process draw() function of the selected tool
        if (
            toolbox.selectedTool !== null &&
            typeof toolbox.selectedTool['draw'] == 'function'
        ) {
            toolbox.selectedTool.draw();
        } else {
            alert(`it doesn't look like your tool has a draw method!`);
        }
    };

    /**
     * Process mouseClicked event
     * @param e MouseEvent
     * @returns
     */
    p.mouseClicked = (e) => {
        // Do not process clicks out the canvas
        if (!isMouseInCanvas(p)) {
            return;
        }
        // When color panel is open - do not process click
        if (colorPalette?.isAllowedToDraw() === false) {
            return;
        }
        // Call mouseClicked is it exists in selectec tool
        if (
            toolbox.selectedTool !== null &&
            typeof toolbox.selectedTool['mouseClicked'] == 'function'
        ) {
            toolbox.selectedTool.mouseClicked();
        }
    };
};

new P5(sketch);
