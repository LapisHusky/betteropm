(function() {
	const addTool = OWOP.tool.addToolObject;
	const Tool = OWOP.tool.class;
	const cursors = OWOP.cursors;
	const PLAYERFX = OWOP.fx.player;
	const RANK = OWOP.RANK;
	const player = OWOP.player;
	const misc = OWOP.misc;
	const tools = OWOP.tool.allTools;
	const updateToolbar = OWOP.tool.updateToolbar;
	const camera = OWOP.camera;
	
	let tool;
	
	function install() {
		tool = new Tool("Circle", cursors.wand, PLAYERFX.NONE, RANK.USER, function(tool) {
			let start = null;
			let end = null;
			let queue = [];
			function isFilled(x, y, width, height) {
				return Math.sqrt(Math.pow(x / width, 2) + Math.pow(y / height, 2)) <= 1;
			}
			function isStroked(x, y, width, height) {
				return isFilled(x, y, width, height) && (
					!isFilled(x + 1, y    , width, height) ||
					!isFilled(x - 1, y    , width, height) ||
					!isFilled(x    , y + 1, width, height) ||
					!isFilled(x    , y - 1, width, height)
				);
			}
			function circle(x1, y1, x2, y2, plot) {
				if (x2 < x1) [x1, x2] = [x2, x1];
				if (y2 < y1) [y1, y2] = [y2, y1];
				
				let width = x2 - x1 + 1;
				let height = y2 - y1 + 1;
				
				for (let y=0; y<height; y++) {
					for (let x=0; x<width; x++) {
						if (isStroked(
							x - width / 2 + 0.5,
							y - height / 2 + 0.5,
							width / 2,
							height / 2)
						) {
							plot(x + x1, y + y1);
						}
					}
				}
			}
			let defaultFx = PLAYERFX.RECT_SELECT_ALIGNED(1);
			tool.setFxRenderer((fx, ctx, time) => {
				ctx.globalAlpha = 0.8;
				ctx.strokeStyle = fx.extra.player.htmlRgb;
				if (!start || !end || !fx.extra.isLocalPlayer) {
					defaultFx(fx, ctx, time);
				} else {
					ctx.beginPath();
					circle(start[0], start[1], end[0], end[1], (x, y) => {
						ctx.rect((x - camera.x) * camera.zoom, (y - camera.y) * camera.zoom, camera.zoom, camera.zoom);
					});
					ctx.stroke();
				}
			});
			function tick() {
				for (let i=queue.length - 1; i>=0; i--) {
					let pixel = queue[i];
					if (misc.world.setPixel(pixel[0], pixel[1], player.selectedColor)) {
						queue.splice(i, 1);
					}
				}
				
				if (queue.length === 0) {
					start = null;
					end = null;
					tool.setEvent("tick", null);
				}
			}
			tool.setEvent("mousedown", mouse => {
				if (!(mouse.buttons & 0b100)) {
					queue = [];
					tool.setEvent("tick", null);
					start = [mouse.tileX, mouse.tileY];
					end = [mouse.tileX, mouse.tileY];
				}
			});
			tool.setEvent("mousemove", mouse => {
				if (!queue.length) {
					end = [mouse.tileX, mouse.tileY];
				}
			});
			tool.setEvent("mouseup", mouse => {
				if (!(mouse.buttons & 0b11) && !queue.length) {
					end = [mouse.tileX, mouse.tileY];
					if (!start) {
						end = null;
						return;
					}
					circle(start[0], start[1], end[0], end[1], (x, y) => {
						queue.push([x, y]);
					});
					tool.setEvent("tick", tick);
				}
			});
			tool.setEvent("deselect", mouse => {
				queue = [];
				start = null;
				end = null;
				tool.setEvent("tick", null);
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
})();
