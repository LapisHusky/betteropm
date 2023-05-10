(function () {

	let interval;

	let style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'ZoomSlider';
    
	const Body = document.createElement('div');
	Body.id = 'ZoomSlider-Body';
    
	let zoomWindow = document.createElement('div');
	zoomWindow.id = 'ZoomSlider-Window';
	zoomWindow.setAttribute('dragging', 'false');
    
	let title = document.createElement('div');
	title.id = 'ZoomSlider-WindowTitle';
	title.textContent = 'Zoom';
    
	let container = document.createElement('div');
	container.id = 'ZoomSlider-Container';
    
	let slider = document.createElement('div');
	slider.id = 'ZoomSlider-Slider';
    
	let sliderBar = document.createElement('div');
	sliderBar.id = 'ZoomSlider-SliderBar';
    
	let sliderTooltip = document.createElement('div');
	sliderTooltip.id = 'ZoomSlider-SliderTooltip';
        
	zoomWindow.appendChild(title);
	zoomWindow.appendChild(container);
	container.appendChild(slider);
	container.appendChild(sliderBar);
	container.appendChild(sliderTooltip);
    
	Body.appendChild(zoomWindow);
    
	const Camera = window.OWOP.camera;
    
	const tools = window.OWOP.require('tools');
    
	let posX, posY, divTop, divLeft;
    
	let diffX, diffY, zoomWindowDragging = false;
    
	let zoomSliderDragging = false;

	let sliderSet = 16, sliderSet2 = 16, tooltipFadeTicks = 0;
	
	const moveFunct = e => {
		e = e || window.event;
		if (zoomWindowDragging) {
			if (zoomWindow.getAttribute('dragging') !== 'true') zoomWindow.setAttribute('dragging', 'true');
			if (zoomWindow.style.left == '') zoomWindow.style.left = `${divLeft}px`;
			if (zoomWindow.style.top == '') zoomWindow.style.top = `${divTop}px`;
			let posX = e.clientX,
				posY = e.clientY,
				aX = posX - diffX,
				aY = posY - diffY,
				bodywidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				bodyheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			zoomWindow.style.left = `${posX < 0 ? - diffX : posX > bodywidth ? bodywidth - diffX : aX}px`;
			zoomWindow.style.top = `${posY < 0 ? - diffY : posY > bodyheight ? bodyheight - diffY : aY}px`;
		}
		if (zoomSliderDragging) {
			if (slider.style.top == '') slider.style.top = `${divTop}px`;
			let posY = e.clientY,
				aY = posY - diffY,
				bodyheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
				top = posY < 0 ? - diffY : posY > bodyheight ? bodyheight - diffY : aY;
			sliderSet2 = parseFloat(top <= sliderBar.offsetTop - 1 ? sliderBar.offsetTop - 1 : top >= sliderBar.offsetHeight + 7 ? sliderBar.offsetHeight + 7 : top).toFixed(1);
			Camera.zoom = Math.floor((sliderSet2 - 14 / sliderBar.offsetHeight - 14) * .315);
		}
	};

	const titleFunct = e => {
		e = e || window.event;
		let eve = e.button;
		let eve2 = e.which;
		if ((eve == 0 || eve2 == 1)) {
			posX = e.clientX;
			posY = e.clientY;
			divTop = zoomWindow.style.top == '' ? zoomWindow.offsetTop : zoomWindow.style.top;
			divLeft = zoomWindow.style.left == '' ? zoomWindow.offsetLeft : zoomWindow.style.left;
			if (zoomWindow.style.top !== '') divTop = divTop.replace('px', '');
			if (zoomWindow.style.left !== '') divLeft = divLeft.replace('px', '');
			diffX = posX - divLeft;
			diffY = posY - divTop;
			zoomWindowDragging = true;
		}
	};
	
	const sliderPressed = eve => {
		eve = eve || window.event;
		posY = eve.clientY;
		divTop = slider.style.top == '' ? slider.offsetTop : slider.style.top;
		if (slider.style.top !== '') divTop = divTop.replace('px', '');
		diffY = posY - divTop;
		zoomSliderDragging = true;
	};
	
	const mouseUpFunct = () => {
		zoomWindowDragging = false;
		zoomSliderDragging = false;
		window.setTimeout(() => zoomWindow.setAttribute('dragging', 'false'), 90);
	};

	const keyDownFunct = eve => {
		eve = eve || window.event;
		let keyCode = eve.which || eve.keyCode;
		switch (keyCode) {
		case 112:
			zoomWindowDragging = false;
			zoomSliderDragging = false;
			zoomWindow.setAttribute('dragging', 'false');
			if (eve.preventDefault) eve.preventDefault();
			break;
		default:
			return true;
		}
		return false;
	};

	function install() {
		
		zoomWindow.style.top = '';
		zoomWindow.style.left = '';

		let ZoomSliderCSS = `
			#ZoomSlider-Window, #ZoomSlider-Slider { background-color: #aba389; }
			#ZoomSlider-Window { border: 11px solid #aba389; }
			#ZoomSlider-Window { border-width: 11px; }
			#ZoomSlider-Window { -webkit-border-image: url(/img/window_out.png) 11 repeat; }
			#ZoomSlider-Window { -moz-border-image: url(/img/window_out.png) 11 repeat; }
			#ZoomSlider-Window { -o-border-image: url(/img/window_out.png) 11 repeat; }
			#ZoomSlider-Window { border-image: url(/img/window_out.png) 11 repeat; }
			#ZoomSlider-Window, #ZoomSlider-SliderTooltip { -moz-box-shadow: 0 0 5px #000; }
			#ZoomSlider-Window, #ZoomSlider-SliderTooltip { -webkit-box-shadow: 0 0 5px #000; }
			#ZoomSlider-Window, #ZoomSlider-SliderTooltip { box-shadow: 0 0 5px #000; }
			#ZoomSlider-Window { top: ${tools.toolsWindow.y}px; }
			#ZoomSlider-Window { left: ${tools.toolsWindow.x + tools.toolsWindow.realw + 10}px; }
			#ZoomSlider-Window { width: 32px; }
			#ZoomSlider-Window { height: 128px; }
			#ZoomSlider-Body { image-rendering: -webkit-optimize-contrast; }
			#ZoomSlider-Body { image-rendering: pixelated; }
			#ZoomSlider-Body { image-rendering: -o-pixelated; }
			#ZoomSlider-Body { image-rendering: -moz-crisp-edges; }
			#ZoomSlider-Body { -ms-interpolation-mode: nearest-neighbor; }
			#ZoomSlider-Body { font-size: 16px; }
			#ZoomSlider-Body { font-family: pixel-op, monospace; }
			#ZoomSlider-Body, #ZoomSlider-Window { position: fixed; }
			#ZoomSlider-Body { top: 0; }
			#ZoomSlider-Body { left: 0; }
			#ZoomSlider-WindowTitle { color: #7e635c; }
			#ZoomSlider-WindowTitle { text-shadow: 1px 1px #4d313b; }
			#ZoomSlider-WindowTitle { margin-top: -7px; }
			#ZoomSlider-WindowTitle { margin-bottom: 3px; }
			#ZoomSlider-WindowTitle, #ZoomSlider-Slider { min-width: 100%; }
			#ZoomSlider-WindowTitle { text-align: center; }
			#ZoomSlider-Body, #windows > #ZoomSlider-Body { border: 0; }
			#ZoomSlider-Body, #windows > #ZoomSlider-Body { margin: 0; }
			#ZoomSlider-Container, #ZoomSlider-SliderTooltip { background-color: #7e635c; }
			#ZoomSlider-Container { border: 5px solid #7e635c; }
			#ZoomSlider-Container { border-width: 5px; }
			#ZoomSlider-Container { -o-border-image: url(/img/window_in.png) 5 repeat; }
			#ZoomSlider-Container { border-image: url(/img/window_in.png) 5 repeat; }
			#ZoomSlider-Container { margin: 0 -5px; }
			#ZoomSlider-Container { height: 122px; }
			#ZoomSlider-Slider { -webkit-transition: filter .125s cubic-bezier(0, 0, 0, 1); }
			#ZoomSlider-Slider { -moz-transition: filter .125s cubic-bezier(0, 0, 0, 1); }
			#ZoomSlider-Slider { transition: filter .125s cubic-bezier(0, 0, 0, 1); }
			#ZoomSlider-Slider { height: 10px; }
			#ZoomSlider-Slider { -moz-box-shadow: 1px 1px #4d313b; }
			#ZoomSlider-Slider { -webkit-box-shadow: 1px 1px #4d313b; }
			#ZoomSlider-Slider { box-shadow: 1px 1px #4d313b; }
			#ZoomSlider-Slider { -webkit-filter: brightness(1); }
			#ZoomSlider-Slider { filter: brightness(1); }
			#ZoomSlider-Slider:active { -moz-box-shadow: none; }
			#ZoomSlider-Slider:active { -webkit-box-shadow: none; }
			#ZoomSlider-Slider:active { box-shadow: none; }
			#ZoomSlider-Slider:active { -webkit-transform: translateX(1px) translateY(1px); }
			#ZoomSlider-Slider:active { -ms-transform: translateX(1px) translateY(1px); }
			#ZoomSlider-Slider:active { transform: translateX(1px) translateY(1px); }
			#ZoomSlider-Slider:hover { -webkit-filter: brightness(110%); }
			#ZoomSlider-Slider:hover { filter: brightness(110%); }
			#ZoomSlider-Slider:active { -webkit-filter: brightness(90%); }
			#ZoomSlider-Slider:active { filter: brightness(90%); }
			#ZoomSlider-SliderBar { width: 5px; }
			#ZoomSlider-SliderBar { margin-left: auto; }
			#ZoomSlider-SliderBar { margin-right: auto; }
			#ZoomSlider-SliderBar { height: 100%; }
			#ZoomSlider-SliderBar { background-color: #4d313b; }
			#ZoomSlider-Slider, #ZoomSlider-SliderTooltip { position: absolute; }
			#ZoomSlider-Slider { top: 16px; }
			#ZoomSlider-SliderTooltip { border: 5px #aba389 solid; }
			#ZoomSlider-SliderTooltip { -o-border-image: url(https://opm.glitch.me/client/img/small_border.png) 5 repeat; }
			#ZoomSlider-SliderTooltip { border-image: url(https://opm.glitch.me/client/img/small_border.png) 5 repeat; }
			#ZoomSlider-Window, #ZoomSlider-SliderTooltip { border-image-outset: 1px; }
			#ZoomSlider-SliderTooltip { color: #fff; }
			#ZoomSlider-SliderTooltip { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
			#ZoomSlider-SliderTooltip { margin-left: 100%; }
			#ZoomSlider-SliderTooltip { left: 18px; }
			#ZoomSlider-SliderTooltip { height: 14px; }
			#ZoomSlider-SliderTooltip { line-height: 14px; }
			#ZoomSlider-SliderTooltip { top: 8px; }
			@-webkit-keyframes ZoomSliderFadeIn { from { opacity: 0; } to { opacity: 1; } }
			@-moz-keyframes ZoomSliderFadeIn { from { opacity: 0; } to { opacity: 1; } }
			@-o-keyframes ZoomSliderFadeIn { from { opacity: 0; } to { opacity: 1; } }
			@-ms-keyframes ZoomSliderFadeIn { from { opacity: 0; } to { opacity: 1; } }
			@keyframes ZoomSliderFadeIn { from { opacity: 0; } to { opacity: 1; } }
		`;
		
		document.getElementsByTagName('head')[0].appendChild(style);
		
		document.getElementById('windows').appendChild(Body);
        
		window.addEventListener('mousemove', moveFunct);
		window.addEventListener('touchmove', moveFunct);
		
		title.addEventListener('mousedown', titleFunct, {
			passive: true
		});
		title.addEventListener('touchstart', titleFunct, {
			passive: true
		});
		
		slider.addEventListener('mousedown', sliderPressed, {
			passive: true
		});
		slider.addEventListener('touchstart', sliderPressed, {
			passive: true
		});
		
		slider.addEventListener('dblclick', () => Camera.zoom = 16, {
			passive: true
		});
		
		window.addEventListener('mouseup', mouseUpFunct, {
			passive: true
		});
		window.addEventListener('touchend', mouseUpFunct, {
			passive: true
		});
		
		window.addEventListener('keydown', keyDownFunct);
		
		if (style.styleSheet) style.styleSheet.cssText = ZoomSliderCSS; else style.appendChild(document.createTextNode(ZoomSliderCSS));
		
		interval = window.setInterval(() => {
			
			Body.style.display = typeof window.OWOP.windowSys.windows.Tools == 'undefined' ? 'none' : '';
			if (sliderSet != Math.floor(Camera.zoom / 32 * (sliderBar.offsetHeight - 7))) sliderSet = Math.floor(Camera.zoom / 32 * (sliderBar.offsetHeight - 7));
			if (slider.style.top != `${13 + Math.floor(sliderSet)}px`) slider.style.top = `${13 + Math.floor(sliderSet)}px`;
			if (sliderTooltip.style.top != `${5 + Math.floor(sliderSet)}px`) {
				sliderTooltip.style.top = `${5 + Math.floor(sliderSet)}px`;
				sliderTooltip.textContent = `${Camera.zoom}00%`;
				tooltipFadeTicks = 400;
			}
			sliderTooltip.style.display = tooltipFadeTicks > 0 ? '' : 'none';
			if (tooltipFadeTicks > 0) tooltipFadeTicks -= 1;
			
		}, 0);

		tooltipFadeTicks = 0;
		
	}
	
	function uninstall() {
        
		window.removeEventListener('mousemove', moveFunct);
		window.removeEventListener('touchmove', moveFunct);
		
		title.removeEventListener('mousedown', titleFunct, {
			passive: true
		});
		title.removeEventListener('touchstart', titleFunct, {
			passive: true
		});
		
		slider.removeEventListener('mousedown', sliderPressed);
		slider.removeEventListener('touchstart', sliderPressed);
		
		window.removeEventListener('mouseup', mouseUpFunct);
		window.removeEventListener('touchend', mouseUpFunct);
		
		window.removeEventListener('keydown', keyDownFunct);
		
		style.parentNode.removeChild(style);
		
		Body.parentNode.removeChild(Body);

		clearInterval(interval);
		
	}
	
	return {
		install: install,
		uninstall: uninstall
	};

})();
