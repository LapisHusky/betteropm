(function() {
	const addTool = OWOP.tool.addToolObject;
	const Tool = OWOP.tool.class;
	const cursors = OWOP.cursors;
	const PLAYERFX = OWOP.fx.player;
	const RANK = OWOP.RANK;
	const protocol = OWOP.require("conf").protocol;
	const player = OWOP.player;
	const misc = OWOP.misc;
	const tools = OWOP.tool.allTools;
	const updateToolbar = OWOP.tool.updateToolbar;
	
	let tool;
	
	function install() {
		tool = new Tool("Pixel Eraser", cursors.erase, PLAYERFX.RECT_SELECT_ALIGNED(16), RANK.USER, function(tool) {
			let index = 0;
			let color;
			let activeChunk = [null, null];
			function tick() {
				for (let i=0; i<256; i++) {
					let x = activeChunk[0] * 16 + index % 16;
					let y = activeChunk[1] * 16 + Math.floor(index / 16);
					
					let oldPixel = misc.world.getPixel(x, y);
					
					if (oldPixel[0] !== color[0] || oldPixel[1] !== color[1] || oldPixel[2] !== color[2]) {
						if (!misc.world.setPixel(x, y, color)) break;
					}
					
					index = (index + 1) % 256;
				}
			}
			function fillChunk(chunkX, chunkY, color) {
				let chunk = misc.world.getChunkAt(chunkX, chunkY);
				if (!chunk) return;
				
				let byteColor = color[2] << 16 | color[1] << 8 | color[0];
				
				for (let y=0; y<protocol.chunkSize; y++) {
					for (let x=0; x<protocol.chunkSize; x++) {
						if ((chunk.get(x, y) & 0xFFFFFF) === byteColor) continue;
						
						queue.push([x, y]);
					}
				}
			}
			tool.setEvent("mousedown mousemove", function(mouse) {
				if (mouse.buttons & 0b1) {
					color = player.selectedColor;
				} else if (mouse.buttons & 0b10) {
					color = [255, 255, 255];
				} else {
					return;
				}
				
				let x = Math.floor(mouse.tileX / protocol.chunkSize);
				let y = Math.floor(mouse.tileY / protocol.chunkSize);
				
				if (activeChunk[0] !== x || activeChunk[1] !== y) {
					index = 0;
					activeChunk = [x, y];
				}
				tool.setEvent("tick", tick);
			});
			tool.setEvent("mouseup deselect", function(mouse) {
				if (!mouse || !(mouse.buttons & 0b1)) {
					activeChunk = [null, null];
					tool.setEvent("tick", null);
				}
			});
		});
		addTool(tool);
	}
	
	function uninstall() {
		delete tools[tool.id];
		updateToolbar();
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})()
