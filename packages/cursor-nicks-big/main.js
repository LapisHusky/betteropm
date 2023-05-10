(function() {
	const renderer = OWOP.require("canvas_renderer").renderer;
	const players = OPM.require("core-utils").players;
	let old = renderer.renderPlayerId;
	
	function install() {
    
		renderer.renderPlayerId = function(ctx, fontsize, zoom, x, y, id, color) {
            let text;

            ctx.font = 20+"px sans-serif"

			if(players != undefined) {
				let nick = players.list[id].nick;
				text = nick ? `[${id}] ${nick}` : id;
			} else text = id;
			
            let textw = ctx.measureText(text).width + (zoom / 2);
		
			ctx.globalAlpha = 1;
			ctx.fillStyle = color;
			ctx.fillRect(x, y, textw, 22+zoom/2);
			ctx.globalAlpha = 0.2;
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#000000";
			ctx.strokeRect(x, y, textw, 22+zoom/2);
			ctx.globalAlpha = 1;
            //renderer.drawText(ctx, text, x + zoom / 4, y + fontsize + zoom / 8);
            renderer.drawText(ctx, text, x + zoom / 4, y + 20 + zoom / 8, false, 20)
        };
        
        
        renderer.drawText = function(ctx, str, x, y, centered, fontSize){
            ctx.strokeStyle = "#000000",
            ctx.fillStyle = "#FFFFFF",
            ctx.lineWidth = 2.5,
            ctx.globalAlpha = 0.5;
            if(fontSize != undefined) {
                ctx.font = fontSize+"px sans-serif"
            }
            if(centered) {
                x -= ctx.measureText(str).width >> 1;
            }
            ctx.strokeText(str, x, y);
            ctx.globalAlpha = 1;
            ctx.fillText(str, x, y);
        } 
	}
	
	function uninstall() {
		renderer.renderPlayerId = old;
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})();
