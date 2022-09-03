import type P5 from 'p5';
import { IconType, ITool } from './tools/tool';

const SIDEBAR_ITEM_IDENTIFIER = 'sidebar-item';
const SIDEBAR_ITEM_ACTIVE_CLASSES = 'border-2 border-slate-600';

//container object for storing the tools. Functions to add new tools and select a tool
export function Toolbox(p: P5) {
  const self = this;

  this.tools = [];
  this.selectedTool = null;

  const toolbarItemClick = function () {
    //remove any existing borders
    const items = p.selectAll(`.${SIDEBAR_ITEM_IDENTIFIER}`);
    for (const item of items) {
      for (const classToRemove of SIDEBAR_ITEM_ACTIVE_CLASSES.split(' ')) {
        item.removeClass(classToRemove);
      }
    }

    const toolName = this.id().split(SIDEBAR_ITEM_IDENTIFIER)[0];
    self.selectTool(toolName);

    //call loadPixels to make sure most recent changes are saved to pixel array
    p.loadPixels();
  };

  //add a new tool icon to the html page
  const addToolIcon = function (tool: ITool) {
    let divContent = '';
    if (tool.iconType == IconType.FA) {
      divContent = `<i class='${tool.icon} fa-xl text-center w-full'></i>`;
    } else {
      divContent = `<img class='rounded-lg' src='${tool.icon}'></div>`;
    }
    const sideBarItem = p.createDiv(divContent);
    sideBarItem.class(
      `${SIDEBAR_ITEM_IDENTIFIER} mx-1 mb-1 w-10 h-10 flex items-center rounded-lg bg-slate-100 hover:cursor-pointer hover:border-2 hover:border-slate-500`
    );
    sideBarItem.id(tool.name + SIDEBAR_ITEM_IDENTIFIER);
    sideBarItem.parent('sidebar');
    sideBarItem.mouseClicked(toolbarItemClick);
  };

  //add a tool to the tools array
  this.addTool = function (tool: ITool) {
    //check that the object tool has an icon and a name
    if (!tool.icon || !tool.name) {
      alert('make sure your tool has both a name and an icon');
    }
    this.tools.push(tool);
    addToolIcon(tool);
    //if no tool is selected (ie. none have been added so far)
    //make this tool the selected one.
    if (this.selectedTool == null) {
      this.selectTool(tool.name);
    }
  };

  this.selectTool = function (toolName) {
    //search through the tools for one that's name matches
    //toolName
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i].name == toolName) {
        //if the tool has an unselectTool method run it.
        if (
          this.selectedTool != null &&
          typeof this.selectedTool['unselectTool'] === 'function'
        ) {
          this.selectedTool.unselectTool();
        }
        //select the tool and highlight it on the toolbar
        this.selectedTool = this.tools[i];
        p.select(`#${toolName}${SIDEBAR_ITEM_IDENTIFIER}`).addClass(
          SIDEBAR_ITEM_ACTIVE_CLASSES
        );

        //if the tool has an options area. Populate it now.
        if (typeof this.selectedTool['populateOptions'] === 'function') {
          this.selectedTool.populateOptions();
        }
      }
    }
  };
}
