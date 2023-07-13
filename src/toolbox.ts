import type P5 from 'p5';
import { IconType, ITool } from './tools/tool';

const SIDEBAR_ITEM_IDENTIFIER = 'sidebar-item';
const SIDEBAR_ITEM_ACTIVE_CLASSES = 'border-2 border-slate-600';

/**
 * Toolbox class
 */
export class Toolbox {
    p: P5;
    tools: ITool[];
    selectedTool: ITool | null;
    toolbarItemClick: () => void;

    constructor(p: P5) {
        this.p = p;
        this.tools = [];
        this.selectedTool = null;

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        /**
         * Handle click on toolbar item
         */
        this.toolbarItemClick = function () {
            //remove any existing borders
            const items = self.p.selectAll(`.${SIDEBAR_ITEM_IDENTIFIER}`);
            for (const item of items) {
                for (const classToRemove of SIDEBAR_ITEM_ACTIVE_CLASSES.split(
                    ' '
                )) {
                    item.removeClass(classToRemove);
                }
            }

            const toolName = (this as any)
                .id()
                .split(SIDEBAR_ITEM_IDENTIFIER)[0];
            self.selectTool(toolName);

            //call loadPixels to make sure most recent changes are saved to pixel array
            p.loadPixels();
        };
    }

    /**
     * Add a tool to the toolbox
     * @param tool Tool to add to the toolbox
     */
    addTool(tool: ITool) {
        //check that the object tool has an icon and a name
        if (!tool.icon || !tool.name) {
            alert('make sure your tool has both a name and an icon');
        }
        this.tools.push(tool);
        this.addToolIcon(tool);
        //if no tool is selected (ie. none have been added so far)
        //make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    }

    /**
     * Add a tool icon to the toolbox
     * @param tool Tool to add to the toolbox
     */
    addToolIcon(tool: ITool) {
        let divContent = '';
        if (tool.iconType == IconType.FA) {
            divContent = `<i class='${tool.icon} fa-xl text-center w-full'></i>`;
        } else {
            divContent = `<img class='rounded-lg' src='${tool.icon}'></div>`;
        }
        const sideBarItem = this.p.createDiv(divContent);
        sideBarItem.class(
            `${SIDEBAR_ITEM_IDENTIFIER} mx-1 mb-1 w-10 h-10 flex items-center rounded-lg bg-slate-100 hover:cursor-pointer hover:border-2 hover:border-slate-500`
        );
        sideBarItem.id(tool.name + SIDEBAR_ITEM_IDENTIFIER);
        sideBarItem.parent('sidebar');
        sideBarItem.mouseClicked(this.toolbarItemClick);
    }

    /**
     * Select a tool from the toolbox
     * @param toolName Name of the tool to select
     */
    selectTool(toolName: string) {
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
                this.p
                    .select(`#${toolName}${SIDEBAR_ITEM_IDENTIFIER}`)
                    ?.addClass(SIDEBAR_ITEM_ACTIVE_CLASSES);

                if (typeof this.selectedTool['selectTool'] === 'function') {
                    this.selectedTool.selectTool();
                }

                //if the tool has an options area. Populate it now.
                if (
                    typeof this.selectedTool['populateOptions'] === 'function'
                ) {
                    this.selectedTool.populateOptions();
                }
            }
        }
    }
}
