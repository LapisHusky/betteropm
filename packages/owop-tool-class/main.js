(function() {
    class Tool {
        #_name = "";
        #_icon = "";
        #_pixelSelectorWidth = 0;
        #_pixelSelectorHeight = 0;
        #_outlineAutoColor = false;
        #_rank = "";
        #_clickEvent = function() {};
        #_holdEvent = function() {};
        #_releaseEvent = function() {};
        #_selectEvent = function() {};
        #_deselectEvent = function() {};
        #_graphicsEvent = function() {};
        #_extra = {};

        constructor(name, icon, pixelSelectorWidth, pixelSelectorHeight, outlineAutoColor, rank) {
            this.#_name = name;
            this.#_icon = icon;
            this.#_pixelSelectorWidth = pixelSelectorWidth;
            this.#_pixelSelectorHeight = pixelSelectorHeight;
            this.#_outlineAutoColor = outlineAutoColor;
            this.#_rank = rank;
        }

        setClickEvent(func) {
            this.#_clickEvent = func;
        }

        setHoldEvent(func) {
            this.#_holdEvent = func;
        }

        setReleaseEvent(func) {
            this.#_releaseEvent = func;
        }

        setSelectEvent(func) {
            this.#_selectEvent = func;
        }

        setDeselectEvent(func) {
            this.#_deselectEvent = func;
        }

        setGraphicsEvent(func) {
            this.#_graphicsEvent = func;
        }

        setExtraProperty(name, val) {
            this.#_extra[name] = val;
        }

        add() {
            OWOP.tool.addToolObject(new OWOP.tool.class(this.#_name, OWOP.cursors[this.#_icon],
                null, OWOP.RANK[this.#_rank], tool => {
                    let lastX, lastY;

                    tool.extra = this.#_extra;

                    tool.setFxRenderer((fx, ctx) => {
                        function drawOutlineRect(c, x, y, w, h) {
                            let z = OWOP.camera.zoom;
                            x -= OWOP.camera.x;
                            y -= OWOP.camera.y;

                            c.strokeRect(x * z, y * z, w * z, h * z);
                        }

                        function drawRect(c, x, y, w, h) {
                            let z = OWOP.camera.zoom;
                            x -= OWOP.camera.x;
                            y -= OWOP.camera.y;

                            c.fillRect(x * z, y * z, w * z, h * z);
                        }

                        if (this.#_pixelSelectorWidth < 1 || this.#_pixelSelectorHeight < 1 ||
                            this.#_graphicsEvent(ctx, OWOP.mouse.tileX, OWOP.mouse.tileY, drawOutlineRect, drawRect, tool.extra)) return;

                        if (this.#_outlineAutoColor) {
                            ctx.strokeStyle = "rgba(" + OWOP.player.selectedColor[0] + "," + OWOP.player.selectedColor[1] +
                                "," + OWOP.player.selectedColor[2] + "," + (OWOP.player.selectedColor[3] / 255) + ")";
                            drawOutlineRect(ctx, OWOP.mouse.tileX, OWOP.mouse.tileY, this.#_pixelSelectorWidth, this.#_pixelSelectorHeight);
                        }
                        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                        drawRect(ctx, OWOP.mouse.tileX, OWOP.mouse.tileY, this.#_pixelSelectorWidth, this.#_pixelSelectorHeight);
                    });

                    tool.setEvent("mousedown", (m, e) => {
                        if (m.buttons == 1) {
                            this.#_clickEvent(OWOP.mouse.tileX, OWOP.mouse.tileY, OWOP.player.selectedColor, "left", tool.extra);
                        } else if (m.buttons == 2) {
                            this.#_clickEvent(OWOP.mouse.tileX, OWOP.mouse.tileY, OWOP.player.selectedColor, "right", tool.extra);
                        }
                    });

                    tool.setEvent("mousemove mousedown", (m, e) => {
                        if (!lastX && !lastY) {
                            lastX = OWOP.mouse.tileX;
                            lastY = OWOP.mouse.tileY;
                        }

                        OWOP.util.line(lastX, lastY, OWOP.mouse.tileX, OWOP.mouse.tileY, 1, (x, y) => {
                            if (m.buttons == 1) {
                                this.#_holdEvent(x, y, OWOP.player.selectedColor, "left", tool.extra);
                            } else if (m.buttons == 2) {
                                this.#_holdEvent(x, y, OWOP.player.selectedColor, "right", tool.extra);
                            }
                        });

                        lastX = OWOP.mouse.tileX;
                        lastY = OWOP.mouse.tileY;
                    });

                    tool.setEvent("mouseup", () => {
                        lastX = null;
                        lastY = null;
                        this.#_releaseEvent(tool.extra);
                    });

                    tool.setEvent("select", () => {
                        this.#_selectEvent(tool.extra);
                    });
                    tool.setEvent("deselect", () => {
                        this.#_deselectEvent(tool.extra);
                    });
                }));
        }
    }

    return {
        install: () => {},
        uninstall: () => {},
        Tool: Tool
    };
})();
