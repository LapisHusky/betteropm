(function() {
	function install() {
		OWOP.require("main").showPlayerList(true);
	}
	
	function uninstall() {
		OWOP.require("main").showPlayerList(false);
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})()
