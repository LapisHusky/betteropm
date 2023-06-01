(function() {
	let plt = OWOP.require('main').playerListTable,
		pl = OWOP.require('main').playerList,
		pls = OPM.require('core-utils').players.list,
		sn = false,
		cm = OWOP.require('context').createContextMenu,
		tp = OPM.require('core-utils').chat.commands.tp,
		ui, fi, tr, id, rs = false,
		is;
	document.addEventListener('keydown', e => {
		if(e.keyCode === 27) {
			clearInterval(fi);
			if(id) {
				id = '';
				rs = false;
				OWOP.chat.local('Stopped following')
			}
		}
	});
	document.styleSheets[0].insertRule('#player-list>table>tr>td:nth-child(3){border-right:1px solid rgba(0,0,0,0.3)}');
	document.styleSheets[0].insertRule('#player-list>table>tr>td:nth-child(4){border-right:1px solid rgba(0,0,0,0.3)}');
	document.styleSheets[0].insertRule('#player-list>table>tr>td:nth-child(5){border-right:1px solid rgba(0,0,0,0.3)}');

	function up() {
		sn = document.querySelector('#show-nicks').checked;
		localStorage.setItem('show-nicks', sn);
		if(sn) {
			plt.children[0].innerHTML = "<th>Id</th><th>X</th><th>Y</th><th>Nick</th><th>Tool</th><th>Color</th>"
		} else plt.children[0].innerHTML = "<th>Id</th><th>X</th><th>Y</th><th>Tool</th><th>Color</th>"
	}
	return {
		install: () => {
			is = true;
			if(rs) {
				if(pls[id]) {
					clearInterval(fi);
					fi = setInterval(() => {
						if(pls[id]) {
							tp([id])
						} else {
							clearInterval(fi);
							id = '';
							rs = false;
							OWOP.chat.local('Stopped following because player left')
						}
					}, 200);
					rs = true;
					OWOP.chat.local(`Following '${id}' resumed. Press esc to stop`)
				} else {
					id = '';
					rs = false;
					OWOP.chat.local('Stopped following because player left')
				}
			}
			window.color = function(...c) {
				OWOP.player.selectedColor = c
			};
			plt.children[0].innerHTML += "<th>Tool</th><th>Color</th>";
			document.querySelector('div.content').insertAdjacentHTML('beforeend', `<label id="plp"><input id="show-nicks" type="checkbox">Show nicks</label>`);
			if(localStorage.getItem('show-nicks')) {
				document.querySelector('#show-nicks').checked = (localStorage.getItem('show-nicks') === "true") ? true : false;
				up()
			}
			document.querySelector('#show-nicks').oninput = up;
			clearInterval(ui);
			ui = setInterval(() => {
				Object.keys(pl).forEach(p => {
					if(sn) {
						if(pl[p].children.length === 5) {
							pl[p].deleteCell(4);
							pl[p].deleteCell(3)
						}
						if(pl[p].children.length !== 6) {
							let nickelement = document.createElement("td");
							nickelement.innerText = pls[p].nick?pls[p].nick.slice(0, 16):"";
							pl[p].appendChild(nickelement);
							pl[p].innerHTML += `<td>${pls[p].tool}</td><td><div style="width:15px;height:15px;background-color:rgb(${pls[p].rgb.join(',')})" title="${pls[p].rgb.join(', ')}" onclick="color(${pls[p].rgb})"></div></td>`;
							pl[p].children[0].title = pls[p].nick ? pls[p].nick : ""
						} else {
							pl[p].deleteCell(5);
							pl[p].deleteCell(4);
							pl[p].deleteCell(3);
							let nickelement = document.createElement("td");
							nickelement.innerText = pls[p].nick?pls[p].nick.slice(0, 16):"";
							pl[p].appendChild(nickelement);
							pl[p].innerHTML += `<td>${pls[p].tool}</td><td><div style="width:15px;height:15px;background-color:rgb(${pls[p].rgb.join(',')})" title="${pls[p].rgb.join(', ')}" onclick="color(${pls[p].rgb})"></div></td>`;
							pl[p].children[0].title = pls[p].nick ? pls[p].nick : ""
						}
					} else {
						if(pl[p].children.length === 6) {
							pl[p].deleteCell(5);
							pl[p].deleteCell(4);
							pl[p].deleteCell(3)
						}
						if(pl[p].children.length !== 5) {
							pl[p].innerHTML += `<td>${pls[p].tool}</td><td><div style="width:15px;height:15px;background-color:rgb(${pls[p].rgb.join(',')})" title="${pls[p].rgb.join(', ')}" onclick="color(${pls[p].rgb})"></div></td>`;
							pl[p].children[0].title = pls[p].nick ? pls[p].nick : ""
						} else {
							pl[p].deleteCell(4);
							pl[p].deleteCell(3);
							pl[p].innerHTML += `<td>${pls[p].tool}</td><td><div style="width:15px;height:15px;background-color:rgb(${pls[p].rgb.join(',')})" title="${pls[p].rgb.join(', ')}" onclick="color(${pls[p].rgb})"></div></td>`;
							pl[p].children[0].title = pls[p].nick ? pls[p].nick : ""
						}
					}
				});
				Object.keys(pl).forEach(p => {
					pl[p].children[0].addEventListener('click', e => {
						if(!is) return;
						tr = e.target;
						cm(e.clientX, e.clientY, [
							['Teleport', () => tp([tr.innerText])],
							['Tell', () => {
								document.querySelector('#chat-input').value = `/tell ${tr.innerText} `;
								document.querySelector('#chat-input').focus()
							}],
							[tr && id === tr.innerText ? 'Unfollow' : 'Follow', () => {
								if(id === tr.innerText) {
									clearInterval(fi);
									id = '';
									rs = false;
									OWOP.chat.local('Stopped following');
									return
								}
								id = tr.innerText;
								rs = true;
								clearInterval(fi);
								fi = setInterval(() => {
									if(pls[id]) {
										tp([id])
									} else {
										clearInterval(fi);
										id = '';
										rs = false;
										OWOP.chat.local('Stopped following because player left')
									}
								}, 200);
								OWOP.chat.local(`Following '${id}'. Press esc to stop`)
							}],
							['Copy ID', () => navigator.clipboard.writeText(tr.innerText)],
							[tr && OWOP.muted.includes(Number(tr.innerText)) ? "Unmute" : "Mute", () => {
								if(OWOP.muted.includes(Number(tr.innerText))) {
									OWOP.muted.splice(OWOP.muted.indexOf(Number(tr.innerText)), 1)
								} else OWOP.muted.push(Number(tr.innerText))
							}],
							['Ban if admin', () => OWOP.chat.send(`/banid ${tr.innerText} -1`)]
						])
					})
				})
			}, 1500)
		},
		uninstall: () => {
			is = false;
			document.querySelector('#plp').remove();
			delete window.color;
			plt.children[0].innerHTML = "<th>Id</th><th>X</th><th>Y</th>";
			clearInterval(ui);
			clearInterval(fi);
			if(id) {
				OWOP.chat.local('Paused following. To resume, install script again');
				resume = true
			}
			Object.keys(pl).forEach(p => {
				pl[p].children[0].title = '';
				if(sn) {
					pl[p].deleteCell(5);
					pl[p].deleteCell(4);
					pl[p].deleteCell(3)
				} else {
					pl[p].deleteCell(4);
					pl[p].deleteCell(3)
				}
			})
		}
	}
})();
