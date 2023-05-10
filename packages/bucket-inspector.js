(function() {
	let element;
	let interval;
	
	function install() {
		element = document.createElement("span");
		element.className = "top-bar";
		element.style.float = "left";
		OWOP.elements.topBar.appendChild(element);
		setInterval(function() {
			let pb = OWOP.net.protocol.placeBucket;
			pb.update();
			element.textContent = `Place bucket: ${pb.allowance.toFixed(1)} (${pb.rate}/${pb.time}s)`;
		}, 100);
	}
	
	function uninstall() {
		clearInterval(interval);
		OWOP.elements.topBar.removeChild(element);
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})();
