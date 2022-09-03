import type P5 from 'p5';
import { ToolOption } from '../options/option';

export enum IconType {
  FA = 'font-awesome',
  Image = 'image',
}

export interface ITool {
  name: string;
  icon: string;
  iconType: IconType;
  options: ToolOption[];
  draw(): void;
  populateOptions?(): void;
  unselectTool?(): void;
}

export abstract class Tool implements ITool {
    name = 'tool';
    icon = 'no icon';
    iconType = IconType.FA;
    options: ToolOption[] = [];

    constructor(protected p: P5) {}

    abstract draw(): void;

    //when the tool is deselected update the pixels to just show the drawing and
    //hide the line of symmetry. Also clear options
    unselectTool() {
      this.p.updatePixels();
      //clear options
      this.p.select('.options').html('');
    }

    /**
     * Populate all registered tool options
     */
    populateOptions(): void {
        for (const option of this.options) {
            option.addToList();
        }
    }
}
