import type { ToolOption } from '../options/option';
import type P5 from 'p5';

// IconType is used to determine the type of icon to use for the tool
export enum IconType {
  FA = 'font-awesome',
  Image = 'image'
}

// Tool interface defines the methods and properties that all tools must implement
export interface ITool {
  name: string;
  icon: string;
  iconType: IconType;
  options: ToolOption<unknown>[];
  cursorClass: string;
  draw(): void;
  populateOptions?(): void;
  selectTool?(): void;
  unselectTool?(): void;
  mouseClicked?(e?: object): void;
}

// ToolConfig defines the properties that can be passed to the Tool constructor
export type ToolConfig = {
  name?: string;
  icon?: string;
  iconType?: IconType;
  cursorClass?: string;
};

/**
 * Base class for all tools
 */
export abstract class Tool implements ITool {
  // Name of the tool
  name: string;

  // Icon of the tool
  icon: string;

  // Cursor class of the tool
  cursorClass: string;

  // Icon type of the tool
  iconType: IconType;

  // Array of tool options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: ToolOption<any>[] = [];

  constructor(
    protected p: P5,
    { name, icon, iconType = IconType.FA, cursorClass = 'cursor-pencil' }: ToolConfig = {}
  ) {
    this.name = name || 'unnamed';
    this.icon = icon || 'fa-solid fa-circle';
    this.iconType = iconType;
    this.cursorClass = cursorClass;
  }

  /**
   * Call on tool select each time. Here basic action - to change cursor
   */
  selectTool(): void {
    const contentElement = this.p.select('#content');
    if (contentElement) {
      const cursorClasses = contentElement
        .class()
        .split(' ')
        .filter((classElelemt) => /^cursor-.*/.test(classElelemt));
      for (const classElement of cursorClasses) {
        contentElement.removeClass(classElement);
      }
      contentElement.addClass(this.cursorClass);
    }
  }

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  unselectTool() {
    this.p.updatePixels();
    //clear options
    this.p.select('.options')?.html('');
  }

  /**
   * Populate all registered tool options
   */
  populateOptions(): void {
    for (const option of this.options) {
      option.addToList();
    }
  }

  /**
   * Draw method, should be implemented in child classes
   */
  abstract draw(): void;
}
