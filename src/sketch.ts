import P5 from 'p5';

import { ColorPalette } from './colourPalette';
import { BlurFilter } from './filters/blur';
import { GrayscaleFilter } from './filters/grayscale';
import { InvertFilter } from './filters/invert';
import { PosterizeFilter } from './filters/posterize';
import { Toolbox } from './toolbox';
import { CircleTool } from './tools/circleTool';
import { FillTool } from './tools/fillTool';
import { LineToTool } from './tools/lineToTool';
import { MirrorDrawTool } from './tools/mirrorDrawTool';
import { PencilTool } from './tools/pencilTool';
import { RectangleTool } from './tools/rectangleTool';
import { SprayTool } from './tools/sprayTool';
import { InitClear } from './utils/clear';
import { InitDownload } from './utils/download';
import { Modal } from './utils/modal';
import { PixelHelper } from './utils/pixelHelper';
import { isMouseInCanvas } from './utils/utils';

type SizeType = {
  width: number;
  height: number;
};

/**
 * Sketch function
 * @param p P5 instance
 */
const sketch = function (p: P5) {
  const toolbox = new Toolbox(p);
  let colorPalette: ColorPalette | undefined;
  let modal: Modal | undefined;

  /**
   * Setup function
   */
  p.setup = function () {
    const canvasContainer = p.select('#content');
    const c = p.createCanvas(
      (canvasContainer?.size() as SizeType).width,
      (canvasContainer?.size() as SizeType).height
    );
    c.parent('content');

    // Create modal
    modal = new Modal(p, 'modal');

    // Init clear button
    InitClear(p, modal);

    // Init download button
    InitDownload(p, modal);

    // Create color palette
    colorPalette = new ColorPalette(p);
    const pixelHelper = new PixelHelper(p);

    //add the tools to the toolbox.
    toolbox.addTool(new PencilTool(p));
    toolbox.addTool(new LineToTool(p));
    toolbox.addTool(new SprayTool(p));
    toolbox.addTool(new MirrorDrawTool(p));
    toolbox.addTool(new RectangleTool(p, colorPalette));
    toolbox.addTool(new CircleTool(p, colorPalette));
    toolbox.addTool(new FillTool(p, colorPalette, pixelHelper));

    // Init filters
    new GrayscaleFilter(p, pixelHelper, modal);
    new BlurFilter(p, pixelHelper, modal);
    new PosterizeFilter(p, pixelHelper, modal);
    new InvertFilter(p, pixelHelper, modal);

    p.background(255);
  };

  /**
   * Draw loop
   * @returns
   */
  p.draw = function () {
    // When color panel is open or modal is visible - do not process click
    if (!colorPalette?.isAllowedToDraw() || modal?.isVisible()) {
      return;
    }

    // Process draw() function of the selected tool
    if (toolbox.selectedTool !== null && typeof toolbox.selectedTool['draw'] == 'function') {
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
    console.log(modal?.isVisible());
    // When color panel is open - do not process click
    if (!colorPalette?.isAllowedToDraw() || modal?.isVisible()) {
      return;
    }
    // Call mouseClicked is it exists in selectec tool
    if (toolbox.selectedTool !== null && typeof toolbox.selectedTool['mouseClicked'] == 'function') {
      toolbox.selectedTool.mouseClicked();
    }
  };
};

new P5(sketch);
