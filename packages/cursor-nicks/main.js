(function() {
	const renderer = OWOP.require("canvas_renderer").renderer;
	const players = OPM.require("core-utils").players;
	let old = renderer.renderPlayerId;
	
	function install() {
		renderer.renderPlayerId = function(ctx, fontsize, zoom, x, y, id, color) {
			let text;
			if(players) {
				let nick = players.list[id].nick;
				text = nick ? `[${id}] ${nick}` : id;
			} else text = id;
			
			
			let textw = ctx.measureText(text).width + (zoom / 2);
		
			ctx.globalAlpha = 1;
			ctx.fillStyle = color;
			ctx.fillRect(x, y, textw, zoom);
			ctx.globalAlpha = 0.2;
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#000000";
			ctx.strokeRect(x, y, textw, zoom);
			ctx.globalAlpha = 1;
			renderer.drawText(ctx, text, x + zoom / 4, y + fontsize + zoom / 8);
		};
	}
	
	function uninstall() {
		renderer.renderPlayerId = old;
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})();
