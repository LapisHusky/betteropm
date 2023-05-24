(function() {
    const FX = OWOP.require("Fx");
    const OLD_RECT_FADE_ALIGNED = FX.WORLDFX.RECT_FADE_ALIGNED;

    function install() {
        function RECT_FADE_ALIGNED(size, x, y, startTime = Date.now()) {
            return (fx, ctx, time) => {
                var alpha = 1 - (time - startTime) / 1000;
                if (alpha <= 0) {
                    fx.delete();
                    return 2; /* 2 = An FX object was deleted */
                }

                var camera = OWOP.camera;
                var options = OWOP.options;
                var player = OWOP.player;
                var RANK = OWOP.RANK;

                var fxx = (x * size - camera.x) * camera.zoom;
                var fxy = (y * size - camera.y) * camera.zoom;
                var s = camera.zoom * size;
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = fx.extra.htmlRgb || "#000000";
                ctx.strokeRect(fxx, fxy, s, s);
                if (options.enableIdView && camera.zoom >= 8 && fx.extra.tag) {
                    fxx += s;
                    var str = fx.extra.tag;
                    var ts = ctx.measureText(str).width;
                    ctx.fillStyle = "#FFFFFF";
                    ctx.strokeStyle = "#000000";
                    ctx.strokeText(str, fxx, fxy);
                    ctx.fillText(str, fxx, fxy);
                }

                return 0; /* 0 = Animation not finished */
            }
        }

        FX.WORLDFX.RECT_FADE_ALIGNED = RECT_FADE_ALIGNED;
    }

    function uninstall() {
        FX.WORLDFX.RECT_FADE_ALIGNED = OLD_RECT_FADE_ALIGNED;
    }

    return {
        install: install,
        uninstall: uninstall
    };
})();
