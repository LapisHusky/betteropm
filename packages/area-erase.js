(() => {
	return {
		install: () => {
			if(OWOP.player.rank < 2) OWOP.chat.local("[AreaErase] You're not moderator/admin.");
			OWOP.tool.addToolObject(new OWOP.tool.class('AreaErase', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), 2, function (tool) {
				function drawText(ctx, str, x, y, centered) {
					ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
					if (centered) {
						x -= ctx.measureText(str).width >> 1;
					}
					ctx.strokeText(str, x, y);
					ctx.globalAlpha = 1;
					ctx.fillText(str, x, y);
				}
				document.addEventListener("keydown", rainbowToggle, false);

				var rainbowPressed = null;
				function rainbowToggle(e) {
				  /* tab key pressed to toggle rainbow mode */
				  if (e.keyCode == 9) {
					rainbowPressed = !rainbowPressed;
				  }
				}
				function fillChunk(chunkX, chunkY, c) {
						var color = c[2] << 16 | c[1] << 8 | c[0];
						var chunk = OWOP.require("main").misc.world.chunks[`${chunkX},${chunkY}`];
						if (chunk) {
							var empty = true;
							firstLoop: for (var y = 0; y < OWOP.options.serverAddress[0].proto.chunkSize; y++) {
								for (var x = 0; x < OWOP.options.serverAddress[0].proto.chunkSize; x++) {
									if ((chunk.get(x, y) & 0xFFFFFF) != color) {
										empty = false;
										break firstLoop;
									}
								}
							}
							if (!empty) {
								chunk.set(color);
								OWOP.net.protocol.setChunk(chunkX, chunkY, new Array(256).fill(color));
							}
						}
					}
				tool.setFxRenderer(function (fx, ctx, time) {
					if (!fx.extra.isLocalPlayer) return 1;
					var x = fx.extra.player.x;
					var y = fx.extra.player.y;
					var fxx = (Math.round(x / 256) * 16 - OWOP.camera.x) * OWOP.camera.zoom;
					var fxy = (Math.round(y / 256) * 16 - OWOP.camera.y) * OWOP.camera.zoom;
					var oldlinew = ctx.lineWidth;
					ctx.lineWidth = 1;
					if (tool.extra.end) {
						var s = tool.extra.start;
						var e = tool.extra.end;
						var x = (s[0] * 16 - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
						var y = (s[1] * 16 - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
						var rw = e[0] - s[0];
						var rh = e[1] - s[1];
						var w = rw * OWOP.camera.zoom * 16;
						var h = rh * OWOP.camera.zoom * 16;
						ctx.beginPath();
						ctx.rect(x, y, w, h);
						ctx.globalAlpha = 1;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3, 4]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();
						if (tool.extra.isSure) {
							ctx.globalAlpha = 0.6;
							ctx.fillStyle = "#00EE00";
							ctx.fill();
						}
						ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
						ctx.fillStyle = OWOP.renderer.patterns.unloaded;
						ctx.fill();
						ctx.setLineDash([]);
						var oldfont = ctx.font;
						ctx.font = "16px sans-serif";
						var txt = (tool.extra.isSure ? "Click again to confirm. " : !tool.extra.clicking ? "Click to erase. " : "") + '(' + Math.abs(rw) + 'x' + Math.abs(rh) + ')';
						var txtx = window.innerWidth >> 1;
						var txty = window.innerHeight >> 1;
						txtx = Math.max(x, Math.min(txtx, x + w));
						txty = Math.max(y, Math.min(txty, y + h));

						drawText(ctx, txt, txtx, txty, true);
						ctx.font = oldfont;
						ctx.lineWidth = oldlinew;
						return 0;
					} else {
						ctx.beginPath();
						ctx.moveTo(0, fxy + 0.5);
						ctx.lineTo(window.innerWidth, fxy + 0.5);
						ctx.moveTo(fxx + 0.5, 0);
						ctx.lineTo(fxx + 0.5, window.innerHeight);

						//ctx.lineWidth = 1;
						ctx.globalAlpha = 1;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();

						ctx.setLineDash([]);
						ctx.lineWidth = oldlinew;
						return 1;
					}
				});

				tool.extra.start = null;
				tool.extra.end = null;
				tool.extra.clicking = false;
				tool.extra.isSure = false;

				var timeout = null;

				var sure = function sure() {
					if (tool.extra.isSure) {
						clearTimeout(timeout);
						timeout = null;
						tool.extra.isSure = false;
						return true;
					}
					tool.extra.isSure = true;
					setTimeout(function () {
						tool.extra.isSure = false;
						timeout = null;
					}, 1000);
					return false;
				};

				tool.setEvent('mousedown', function (mouse, event) {
					var get = {
						rx: function rx() {
							return mouse.tileX / 16;
						},
						ry: function ry() {
							return mouse.tileY / 16;
						},
						x: function x() {
							return Math.round(mouse.tileX / 16);
						},
						y: function y() {
							return Math.round(mouse.tileY / 16);
						}
					};
					var s = tool.extra.start;
					var e = tool.extra.end;
					var isInside = function isInside() {
						return get.rx() >= s[0] && get.rx() < e[0] && get.ry() >= s[1] && get.ry() < e[1];
					};
					if (mouse.buttons === 1 && !tool.extra.end) {
						tool.extra.start = [get.x(), get.y()];
						tool.extra.clicking = true;
						tool.setEvent('mousemove', function (mouse, event) {
							if (tool.extra.start && mouse.buttons === 1) {
								tool.extra.end = [get.x(), get.y()];
								return 1;
							}
						});
						var finish = function finish() {
							tool.setEvent('mousemove mouseup deselect', null);
							tool.extra.clicking = false;
							var s = tool.extra.start;
							var e = tool.extra.end;
							if (e) {
								if (s[0] === e[0] || s[1] === e[1]) {
									tool.extra.start = null;
									tool.extra.end = null;
								}
								if (s[0] > e[0]) {
									var tmp = e[0];
									e[0] = s[0];
									s[0] = tmp;
								}
								if (s[1] > e[1]) {
									var tmp = e[1];
									e[1] = s[1];
									s[1] = tmp;
								}
							}
							OWOP.renderer.render(OWOP.renderer.rendertype.FX);
						};
						tool.setEvent('deselect', finish);
						tool.setEvent('mouseup', function (mouse, event) {
							if (!(mouse.buttons & 1)) {
								finish();
							}
						});
					} else if (mouse.buttons === 1 && tool.extra.end) {
						if (isInside() && sure()) {
							tool.extra.start = null;
							tool.extra.end = null;
							var _ref = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
								x = _ref[0],
								y = _ref[1],
								w = _ref[2],
								h = _ref[3];

							for (var i = x; i < x + w; i++) {
								for (var j = y; j < y + h; j++) {
									if(!rainbowPressed) {
									fillChunk(i, j, OWOP.player.selectedColor); //_local_player.player.selectedColor
									} else {
									fillChunk(i, j,[(Math.random()*255)|0, (Math.random()*255)|0, (Math.random()*255)|0])
									}

								}
							}
						} else if (!isInside()) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
					} else if (mouse.buttons === 2 && tool.extra.end) {
						if (isInside() && sure()) {
							tool.extra.start = null;
							tool.extra.end = null;
							var _ref = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
								x = _ref[0],
								y = _ref[1],
								w = _ref[2],
								h = _ref[3];

							for (var i = x; i < x + w; i++) {
								for (var j = y; j < y + h; j++) {
									fillChunk(i, j, [255, 255, 255]);
								}
							}
						} else if (!isInside()) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
					}
				});
				}));
		},
		uninstall: () => {
			delete OWOP.tool.allTools.areaerase;
		}
	}
})();
