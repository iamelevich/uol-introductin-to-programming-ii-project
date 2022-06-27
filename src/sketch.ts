import P5 from 'p5';

import { HelperFunctions } from './helperFunctions';
import { Toolbox } from './toolbox';
import { ColourPalette } from './colourPalette';

import { FreehandTool } from './tools/freehandTool';
import { LineToTool } from './tools/lineToTool';
import { SprayTool } from './tools/sprayTool';
import { RirrorDrawTool } from './tools/mirrorDrawTool';
import { RectangleTool } from './tools/rectangleTool';
import { CircleTool } from './tools/circleTool';

const sketch = function(p: P5) {
    const toolbox = new Toolbox(p);

    p.setup = function() {
        const canvasContainer = p.select('#content');
        const c = p.createCanvas((canvasContainer.size() as any).width, (canvasContainer.size() as any).height);
        c.parent('content');

        //create helper functions and the colour palette
        new HelperFunctions(p);
        new ColourPalette(p);

        //add the tools to the toolbox.
        toolbox.addTool(new FreehandTool(p));
        toolbox.addTool(new LineToTool(p));
        toolbox.addTool(new SprayTool(p));
        toolbox.addTool(new RirrorDrawTool(p));
        toolbox.addTool(new RectangleTool(p));
        toolbox.addTool(new CircleTool(p));
        p.background(255);
    };

    p.draw = function() {
        if (typeof toolbox.selectedTool['draw'] == 'function') {
            toolbox.selectedTool.draw();
        } else {
            alert('it doesn\'t look like your tool has a draw method!');
        }
    };
};

new P5(sketch);