import type P5 from 'p5';
import { ITool } from './tools/tool';

//container object for storing the tools. Functions to add new tools and select a tool
export function Toolbox(p: P5) {
	const self = this;

	this.tools = [];
	this.selectedTool = null;

	const toolbarItemClick = function() {
		//remove any existing borders
		const items = p.selectAll('.sideBarItem');
		for (let i = 0; i < items.length; i++) {
			items[i].style('border', '0')
		}

		const toolName = this.id().split('sideBarItem')[0];
		self.selectTool(toolName);

		//call loadPixels to make sure most recent changes are saved to pixel array
		p.loadPixels();
	}

	//add a new tool icon to the html page
	const addToolIcon = function(icon: string, name: string) {
		const sideBarItem = p.createDiv('<img src=\'' + icon + '\'></div>');
		sideBarItem.class('sideBarItem')
		sideBarItem.id(name + 'sideBarItem')
		sideBarItem.parent('sidebar');
		sideBarItem.mouseClicked(toolbarItemClick);
	};

	//add a tool to the tools array
	this.addTool = function(tool: ITool) {
		//check that the object tool has an icon and a name
		if (!tool.icon || !tool.name) {
			alert('make sure your tool has both a name and an icon');
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = function(toolName) {
		//search through the tools for one that's name matches
		//toolName
		for (let i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it.
				if (this.selectedTool != null && typeof this.selectedTool['unselectTool'] === 'function') {
					this.selectedTool.unselectTool();
				}
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];
				p.select('#' + toolName + 'sideBarItem').style('border', '2px solid blue');

				//if the tool has an options area. Populate it now.
				if (typeof this.selectedTool['populateOptions'] === 'function') {
					this.selectedTool.populateOptions();
				}
			}
		}
	};
}