(function() {
	const tools = OWOP.require("tools");
	const toolsWindow = tools.toolsWindow;
	let updateToolbar = tools.updateToolbar;
  let updateToolWindow = tools.updateToolWindow;
	
	let sound = new Audio("https://freesound.org/data/previews/160/160076_2888453-lq.mp3");
		
  let image = new Image();
  image.src = "https://i.imgur.com/fVd2yCh.png";
  image.style.margin = "-4px -4px -7px -4px";
  image.addEventListener("click", function() {
    sound.play();
  });
	
	function install() {
		tools.updateToolbar = function() {
			const container = toolsWindow.container;
			container.innerHTML = "";
			container.appendChild(image);
			container.style.maxWidth = "";
			container.style.overflow = "visible";
		};
		tools.updateToolbar();
    tools.updateToolWindow = function() {};
	}
	
	function uninstall() {
		tools.updateToolbar = updateToolbar;
		tools.updateToolbar();
    tools.updateToolWindow = updateToolWindow;
	}
	
	return {
		install: install,
		uninstall: uninstall
	};
})();
