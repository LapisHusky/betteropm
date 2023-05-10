(function() {
	const chat = OPM.require("core-utils").chat;
	const net = OWOP.net;
	const eventSys = OWOP.eventSys;
	const retryingConnect = OWOP.require("main").retryingConnect;
	
	function install() {
		chat.registerCommand("world", function(args) {
			let world = args.join(" ");
			
			history.pushState(null, "", "/" + world);
			
			net.protocol.ws.close();
			eventSys.once(OWOP.events.net.disconnected, function() {
				retryingConnect(() => OWOP.net.currentServer, world || "main");
			});
		});
	}
	
	function uninstall() {
		chat.deregisterCommand("world");
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})();
