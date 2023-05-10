(function() {
	const chat = OPM.require("core-utils").chat;
	const players = OPM.require("core-utils").players;
	const renderer = OWOP.require("canvas_renderer");
	const original = renderer.centerCameraTo;
	
	function teleport(x, y) {
		original(x, y);
		renderer.centerCameraTo = function() {};
		setTimeout(function() {
			renderer.centerCameraTo = original;
		}, 5000);
	}
	
	function install() {
		chat.registerCommand("tp", function(args) {
			if (args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
				teleport(parseInt(args[0]), parseInt(args[1]));
			} else if (args.length === 1 && !isNaN(args[0])) {
				let player = players.list[parseInt(args[0])];
				
				if (!player) {
					OWOP.chat.local("No player with ID " + args[0]);
					return;
				}
				
				teleport(player.x / 16, player.y / 16);
			} else {
				OWOP.chat.local("Usage: /tp &lt;x&gt; &lt;y&gt; / &lt;player&gt;")
			}
		});
	}
	
	function uninstall() {
		chat.deregisterCommand("tp");
	}
	
	return {
		install: install,
		uninstall: uninstall,
		teleport: teleport
	};
})();
