(() => {
    const chat = OPM.require("core-utils").chat;
    function getPalette() {
        return new Promise(resolve => {
            let palette = [];
            fetch("https://cors-anywhere.herokuapp.com/http://colormind.io/api/", {
                method: "POST",
                body: JSON.stringify({
                    model: "default"
                })
            }).then(i => i.json()).then(i => {
                palette.push(...i.result);
                fetch("https://cors-anywhere.herokuapp.com/http://colormind.io/api/", {
                    method: "POST",
                    body: JSON.stringify({
                        model: "default",
                        input: [palette[4], "N", "N", "N", "N"]
                    })
                }).then(i => i.json()).then(i => {
                    palette.push(...i.result.slice(1));
                    OWOP.player.palette.splice(0);
                    OWOP.player.palette.push(...palette);
                    OWOP.player.paletteIndex = OWOP.player.paletteIndex;
                    OWOP.chat.local(`Palette was generated!`);
                    resolve(palette);
                });
            });
        });
    };

    const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS41ZEdYUgAAAPJJREFUOE9j+P//P8kYDGCMdSa2/5HxPCOb//YaRv/XTPX9f2BlEAoGawBp7DOw+v/Iyvn/U2sXOD5j4QjW+PBk1P//z5Pg+M+TxP9zWjwgVoM0ImvCpxGEB1Bjg77F/+PmDih4k6kdWOORtcH/7xyJRMHdJS4QjQ76xv+dzExQsKOJCVijlb7df0sDBxRso2MJ0eibZfs/dqMnCo6c6wrWKJy9/D93xR4UrOpXCtEYUGL3P/mYLwqOXecB1shTtuM/S8tFFKwYUj+QGhP3exOlka3h1H/loBpoggUCkGb/IgT2TYOkVXWfArBCZMzAwMAAAN8DxyM3w/t7AAAAAElFTkSuQmCC";
    const con = document.createElement("div");
    const img = document.createElement("input");
    const reader = new FileReader();
    con.style = `
        position: absolute;
        right: 85px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        background-image: url(${icon});
        background-repeat: no-repeat;
        pointer-events: all;
        border: 5px #aba389 solid;
        border-image: url(https://opm.glitch.me/client/img/small_border.png) 5 repeat;
        border-image-outset: 1px;
        background-color: #7e635c;
        box-shadow: 0px 0px 5px #000;`;
    img.style = `
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        cursor: pointer;`;
    con.append(img);
    img.type = "file";
    img.accept = "image/*";
    img.onchange = () => {
        reader.onloadend = () => {
            let image = new Image();
            image.onload = () => {
                let cnv = document.createElement("canvas");
                let ctx = cnv.getContext("2d");
                let w = image.width || image.naturalWidth;
                let h = image.height || image.naturalHeight;
                cnv.width = w;
                cnv.height = h;
                ctx.drawImage(image, 0, 0);
                let pixels = ctx.getImageData(0, 0, w, h).data;
                let palette = [];
                for(let i = 0; i < pixels.length; i += 4) {
                    let rgb = [pixels[i], pixels[i+1], pixels[i+2]]+"";
                    if(palette.indexOf(rgb) === -1) palette.push(rgb);
                }
                let oof = true;
                if(palette.length > 25) oof = confirm("Image has more than 25 colors, are you sure you want to continue?");
                if(!oof) return;
                palette = palette.map(i => i.split(","));
                OWOP.player.palette.push(...palette);
                OWOP.player.paletteIndex = OWOP.player.palette.length-1;
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(img.files[0]);
    };
    img.onclick = () => img.value = "";

    return {
        install: () => {
            if(!localStorage.palette) localStorage.palette = "{}";
            chat.registerCommand("palette", args => {
                if(!args[0] || args[0] === "help") return OWOP.chat.local(`/palette normal - get default palette.
/palette generate - generate palette with AI.
/palette list - get list of saved palettes.
/palette remove [name] - remove saved palette.
/palette save [name] - save current palette.
/palette load [name] - load palette.`);
                if(args[0] === "normal") {
                    OWOP.player.palette.splice(0);
                    OWOP.player.palette.push([228,166,114],[184,111,80],[116,63,57],[63,40,50],[158,40,53],[229,59,68],[251,146,43],[255,231,98],[99,198,77],[50,115,69],[25,61,63],[79,103,129],[175,191,210],[255,255,255],[44,232,244],[4,132,209]);
                    OWOP.player.paletteIndex = OWOP.player.paletteIndex;
                } else if(args[0] === "generate") getPalette();
                else if(args[0] === "list") OWOP.chat.local(`Saved palettes: ${Object.keys(JSON.parse(localStorage.palette))}`);
                else if(args[0] === "remove") {
                    let palettes = JSON.parse(localStorage.palette);
                    if(palettes[args[1]]) {
                        delete palettes[args[1]];
                        localStorage.palette = JSON.stringify(palettes);
                        OWOP.chat.local(`Palette '${args[1]}' was deleted.`);
                    } else OWOP.chat.local(`Palette '${args[1]}' doesn't exists.`);
                } else if(args[0] === "save") {
                    let palettes = JSON.parse(localStorage.palette);
                    if(palettes[args[1]]) return OWOP.chat.local(`Palette '${args[1]}' already exists!`);
                    palettes[args[1]] = OWOP.player.palette;
                    localStorage.palette = JSON.stringify(palettes);
                    OWOP.chat.local(`Palette '${args[1]}' was saved.`);
                } else if(args[0] === "load") {
                    let palettes = JSON.parse(localStorage.palette);
                    if(!palettes[args[1]]) return OWOP.chat.local(`Palette '${args[1]}' doesn't exist!`);
                    OWOP.player.palette.splice(0);
                    OWOP.player.palette.push(...palettes[args[1]]);
                    OWOP.player.paletteIndex = OWOP.player.paletteIndex;
                    OWOP.chat.local(`Palette '${args[1]}' was loaded.`);
                };
            });
            document.getElementById("palette").append(con);
        },
        uninstall: () => {
            chat.deregisterCommand("palette");
            con.remove();
        }
    };
})();
