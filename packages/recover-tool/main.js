(() => {
	return {
        install: () => {
            OWOP.tool.addToolObject(new OWOP.tool.class("Recover", OWOP.cursors.wand, OWOP.fx.player.RECT_SELECT_ALIGNED(1), true, tool => {
                tool.setEvent("mousedown mousemove", e => {
                    if(e.buttons === 0) return;
                    const [x, y] = [OWOP.mouse.tileX, OWOP.mouse.tileY];
                    const colors = {};
                    for(let X = -4; X < 4; X++)
                    for(let Y = -4; Y < 4; Y++) {
                        let influence = Math.abs((16-X)+(16-Y));
                        let col = OWOP.world.getPixel(x+X, y+Y);
                        if(!colors[col+""]) colors[col+""] = influence;
                        else colors[col+""] += influence;
                    };
                    let sel_col = Object.keys(Object.fromEntries(Object.entries(colors).sort( (a,b) => b[1] - a[1] )))[0].split(",");
                    if(
                        OWOP.world.getPixel(x, y)[0]+"" === sel_col[0] &&
                        OWOP.world.getPixel(x, y)[1]+"" === sel_col[1] &&
                        OWOP.world.getPixel(x, y)[2]+"" === sel_col[2]
                    ) return;
                    OWOP.world.setPixel(x, y, sel_col);
                });
            }));
        },
        uninstall: () => {
            document.getElementById("tool-recover").remove();
            delete OWOP.tool.allTools["recover"];
        }
	};
})()
