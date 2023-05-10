// Created by dimden but who cares (original idea by kapycta123)
(() => {
    const Tool = new OWOP.tool.class("Shadow", OWOP.cursors.cursor, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
        tool.setEvent("mousemove mousedown", e => {
            const [ x, y ] = [ OWOP.mouse.tileX, OWOP.mouse.tileY ];
            const col = OWOP.player.selectedColor;
            let scol = [col[0]-30, col[1]-30, col[2]-30];

            if(scol[0] < 0) scol[0] = 0;
            if(scol[1] < 0) scol[1] = 0;
            if(scol[2] < 0) scol[2] = 0;

            if (e.buttons === 1) {
				const px = OWOP.world.getPixel(x, y+1);
                OWOP.world.setPixel(x, y, col);
                if(!(px[0] === col[0] && px[1] === col[1] && px[2] === col[2])) OWOP.world.setPixel(x, y+1, scol);
			} else if(e.buttons === 2) OWOP.world.setPixel(x, y, [255, 255, 255]);
        });
    });
    return {
        install: () => OWOP.tool.addToolObject(Tool),
        uninstall: () => {
            document.getElementById("tool-shadow").remove();
            delete OWOP.tool.allTools.shadow;
        }
    };
})();
