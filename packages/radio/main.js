(function() {
	const {windowSys, GUIWindow} = OWOP.require("windowsys");
	let win;
	
	function install() {
		let width = 450;
		let height = 100;
		win = new GUIWindow("DayDun Radio", {closeable: true}, wdow => {
			let iframe = document.createElement("iframe");
			iframe.src = "https://daydun.com/radio/";
			iframe.width = width;
			iframe.height = height;
			iframe.frameBorder = 0;
			iframe.style.margin = "-4px";
			iframe.style.marginBottom = "-7px";
			wdow.container.appendChild(iframe);
			wdow.container.style.overflow = "visible";
		}).move(window.innerWidth - width - 108 - 14, window.innerHeight - height - 16 - 31);
		windowSys.addWindow(win);
	}
	
	function uninstall() {
		windowSys.delWindow(win);
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})()
