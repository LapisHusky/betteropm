//v1.6
(function () {

	const helpContent = window.OWOP.require ? window.OWOP.require('main').elements.bigChatToggle.parentNode.parentNode : document.querySelector('#help .content');

	const localStorage = window.OWOP.require ? window.OWOP.require('main').misc.localStorage : localStorage;

	const owopChat = window.OWOP.require ? window.OWOP.require('global').PublicAPI.chat : window.OWOP.chat;

	const body = window.document.getElementsByTagName('body')[0];

	let isInstalled = false;

	let css = `
	
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window { border-image-source: var(--owop98-windowBorder); }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window { border-image-slice: 20; }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window { border-image-width: 20px; }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window { border-image-outset: 0; }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window, #ZoomSlider-Slider { border-image-repeat: stretch; }
#player-list > table > tr:nth-child(even), #player-list > table > tr:nth-child(odd), #ZoomSlider-SliderBar, #emotes-container #emote-button:hover { background-color: var(--owop98-brightColor); }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window, button, #ZoomSlider-Slider, #toole-container > button.selected, #playercount-display, #xy-display, #palette-create, #palette, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, .top-bar, #player-list > table > tr:first-child, #chat.active, #dev-chat.active, #chat-messages > li, .context-menu, #NewChat-Messages, #emotes-list, #add-emote { background-color: var(--owop98-color); }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window, button, #ZoomSlider-Slider, #NewChat-Messages, #NewChat-Input, #add-emote { border-color: var(--owop98-color); }
#windows > div, .winframe, #help, #NewChat-Window, #ZoomSlider-Window, #playercount-display, #xy-display, #palette-create, #palette, .top-bar, #ZoomSlider-Slider, .context-menu, .framed, #ZoomSlider-SliderTooltip, #emotes-list { box-shadow: none; }
html, body, #status-msg, .whitetext, #xy-display, #chat, #dev-chat, #playercount-display, #NewChat-Input, #NewChat-TellToInput, #NewChat-TellToInputError, #NewChat-Messages, #NewChat-Body, #NewChat-ContextMenuInput, #chat-input, .top-bar, #ZoomSlider-Body, #add-emote { font-family: 'Microsoft Sans Serif', pixel-op, arial, sans-serif; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, .whitetext, #player-list > table, #ZoomSlider-SliderTooltip, #NewChat-WindowTitle { font-size: 12px; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #chat-messages > li > .nick, #NewChat-Window, #ZoomSlider-WindowTitle, th { font-weight: 800; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle, #NewChat-ContextMenuButton:hover, #NewChat-ContextMenuButtonWithIcon:hover, #NewChat-WindowTitle { color: var(--owop98-titleColor); }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, .whitetext, #xy-display, #chat, #dev-chat, #playercount-display, #status-msg, #NewChat-Window, #ZoomSlider-WindowTitle, #NewChat-Tab:hover, #NewChat-TabSelected, #NewChat-ContextMenuButtonWithIcon:hover, #NewChat-ContextMenuButton:hover, #NewChat-ContextMenuInput, #NewChat-TellToInput, #NewChat-TellToInput::placeholder, #NewChat-TellToInputError::placeholder, #NewChat-TellToGo, #NewChat-Messages, #NewChat-Input, #NewChat-Tab, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, #NewChat-TellToMenu, .top-bar, #player-list > table, #ZoomSlider-SliderTooltip, #NewChat-WindowTitle, #add-emote, #emotes-list { text-shadow: none; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle, #NewChat-RepeatCounter, #NewChat-ContextMenuButton:hover, #NewChat-ContextMenuButtonWithIcon:hover, #NewChat-TellToInput, #NewChat-TellToInputError, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-Tab:after, #NewChat-TellToButton:after, #NewChat-TellToIDButton:hover, #NewChat-TellToGo:hover { background-color: #000080; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle { background-image: var(--owop98-windowTitleBackground); }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle { background-size: 100%; }
#windows > div > span, #help > .title { margin-bottom: 2px; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle { margin-top: -8px; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle { height: 16px; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle { line-height: 16px; }
.wincontainer, #help > .content, .windowCloseButton, .windowCloseButton:active, #ZoomSlider-Container, #player-list > table, #emotes-title, #category-title { border: 0; }
.wincontainer, #help > .content, .windowCloseButton, button.windowCloseButton:active, #NewChat-TabSelected:after, #ZoomSlider-Container, #toole-container > button.selected:hover:active { background: 0; }
button, button:hover, button:active, #ZoomSlider-Slider, .context-menu, #add-emote { border-image-source: var(--owop98-border); }
#windows > div > div > input, #ZoomSlider-SliderBar, #player-list, #chat-input, #toole-container > button.selected, #toole-container > button:hover:active, #NewChat-Messages, #NewChat-Input { border-image-source: var(--owop98-innerBorder); }
button:hover:active, #palette-create:hover:active, #add-emote:hover:active { border-image-source: var(--owop98-borderPressed); }
#ZoomSlider-Slider:hover:active, #ZoomSlider-Slider:active, #toole-container > button.selected { background-image: var(--owop98-checkers); }
button:active, button:hover, #NewChat-Minimize:hover, #NewChat-Maximize:hover, #NewChat-Restore:hover, #NewChat-Minimize:hover:active, #NewChat-Maximize:hover:active, #NewChat-Restore:hover:active, #ZoomSlider-Slider, #ZoomSlider-Slider:hover, #ZoomSlider-Slider:active { filter: none; }
#playercount-display, #xy-display, #palette-create, #palette, .top-bar, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, .top-bar, #emotes-list { border-image-source: var(--owop98-borderSmall); }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle { background-repeat: round; }
.whitetext:not(#status), #xy-display, #chat, #dev-chat, #playercount-display, #NewChat-Input, #NewChat-Messages, #NewChat-Tab, #NewChat-TabSelected, #NewChat-ContextMenu, #NewChat-ContextMenuInput, #NewChat-ContextMenuInput::placeholder, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, .top-bar, #player-list > table, #chat-messages, #dev-chat-messages, #chat-input, #ZoomSlider-SliderTooltip, .wincontainer, button, input, #chat-messages > li, #add-emote, #emotes-list { color: var(--owop98-textColor); }
#add-emote, #emotes-container { border: 2px solid var(--owop98-color); }
#add-emote { padding: 1px 8px; }
#add-emote { border-image: var(--owop98-border) 2 / 1 / 0 repeat; }
#emotes-container { border-image: var(--owop98-innerBorder) 2 / 1 / 0 repeat; }
#load-scr { background: #007b7b; }
.windowCloseButton, .windowCloseButton:hover, .windowCloseButton:active, button.windowCloseButton:active { background-image: var(--owop98-closeButton); }
.windowCloseButton, .windowCloseButton:hover, .windowCloseButton:active, button.windowCloseButton:active, #NewChat-TitleIcon, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { background-position: 0 0; }
.windowCloseButton, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { background-repeat: no-repeat; }
.windowCloseButton, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { height: 12px; }
.windowCloseButton, #NewChat-TitleIcon, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { width: 14px; }
.windowCloseButton:hover:active, button.windowCloseButton:hover:active, #NewChat-Minimize:hover:active, #NewChat-Maximize:hover:active, #NewChat-Restore:hover:active { background-position: 0 -12px; }
.windowCloseButton { top: -6px; }
.windowCloseButton { right: -5px; }
#xy-display, #chat, #dev-chat, #playercount-display, #chat-messages, #dev-chat-messages, #NewChat-Window, #NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon, .top-bar, #chat-input, #emotes-title, #category-title { font-size: 15px; }
#playercount-display, #xy-display { z-index: 1; }
#windows > div > span, #help > .title, #ZoomSlider-WindowTitle, #NewChat-Window, #ZoomSlider-WindowTitle { text-align: left; }
#palette-create { background-image: var(--owop98-plus); }
#palette-create { width: 22px; }
#palette-create { height: 22px; }
#NewChat-TabsContainer { min-width: 100%; }
#NewChat-TabsContainer, #NewChat-Window, #ZoomSlider-WindowTitle { width: 100%; }
#NewChat-TabsContainer { top: 16px; }
#NewChat-TabsContainer { position: absolute; }
#NewChat-Window { padding: 0 0 0 10px; }
#NewChat-TitleIcon { margin-left: -6px; }
#NewChat-Window, #ZoomSlider-WindowTitle, #NewChat-TitleIcon { top: 1px; }
#NewChat-TitleIcon { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVDhPvZLRCcAgEEO1m7iKc/npWjqKjnJtQk8UROtPH6ReizEBa0XEvLRhg8Xj4vjdBLgXxhMTyTkLqtIYQuDHFTFGro+xVT2mJZ6AxG1Vrdfzb9VaK2Xgg/kLpRRJKWFkIk/C3XDocM5RQJO89/xzNHGlIUnVb5hqZoKGl5lmJhExN5YN7hwOaTzWAAAAAElFTkSuQmCC); }
#NewChat-TitleIcon { height: 14px; }
#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon, #NewChat-TellToIDButton, #NewChat-TellToGo, #opm button:active, #chat-messages > li, #chat, #dev-chat { transition: none; }
#NewChat-ContextMenu { background-image: none; }
#NewChat-ContextMenu { opacity: 1 !important; }
#NewChat-ContextMenuIcon, #emotes-list:before { display: none; }
#NewChat-ContextMenuButton[disabled=true], #NewChat-ContextMenuButton[disabled=true]:hover, #NewChat-ContextMenuButtonWithIcon[disabled=true], #NewChat-ContextMenuButtonWithIcon[disabled=true]:hover { color: #7b7b7b; }
#NewChat-ContextMenuButton[disabled=true], #NewChat-ContextMenuButton[disabled=true]:hover, #NewChat-ContextMenuButtonWithIcon[disabled=true], #NewChat-ContextMenuButtonWithIcon[disabled=true]:hover { text-shadow: 1px 1px #fff; }
#chat-input { font-weight: 500; }
#NewChat-ContextMenuLine, #NewChat-TellToLine { background: #7b7b7b; }
#NewChat-ContextMenuLine, #NewChat-TellToLine { border-bottom: 1px solid #fff; }
#NewChat-ContextMenuLine, #NewChat-TellToLine { margin: 1px 0; }
#NewChat-Tab:after, #NewChat-TabSelected:after { content: none; }
#NewChat-Minimize { background-image: var(--owop98-minimizeButton); }
#NewChat-Maximize { background-image: var(--owop98-maximizeButton); }
#NewChat-Restore { background-image: var(--owop98-restoreButton); }
#NewChat-Maximize, #NewChat-Restore { right: 0; }
#NewChat-Maximize, #NewChat-Restore, #NewChat-Minimize { top: 3px; }
#NewChat-Maximize, #NewChat-Restore { margin-right: -4px; }
#NewChat-Minimize { right: 10px; }
#NewChat-Window, #ZoomSlider-Window[maximized="true"] { box-shadow: 0 -1px #fff, 0 -2px var(--owop98-brightColor); }
#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon { padding: 1px 10px 1px 28px; }
#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon { margin: 0; }
#windows > div > span { margin-bottom: 6px; }
#ZoomSlider-WindowTitle { margin-bottom: 3px; }
#ZoomSlider-Slider { border-width: 5px; }
#ZoomSlider-Slider { border-style: outset; }
#ZoomSlider-Slider:active { transform: none; }
.top-bar[style*="color: white"], span[style*="color: white"], .top-bar[style*="color:white"], span[style*="color:white"], pre[style*="color: white"], pre[style*="color:white"], #motd [style*="color: #ffffff"], #motd { color: var(--owop98-textColor) !important; }
#ZoomSlider-SliderBar { margin-top: 4px; }
#ZoomSlider-Slider { height: 10px; }
#ZoomSlider-Slider { margin-top: -4px; }
#ZoomSlider-Slider, #help-button > img { box-sizing: border-box; }
#ZoomSlider-Slider { margin-left: 5px; }
#ZoomSlider-Slider { border-image-slice: 5; }
#palette-input, #add-emote { curs'o'r: default; }
#ZoomSlider-SliderBar, #player-list, #chat-input { border-width: 2px; }
#ZoomSlider-SliderBar, #player-list, #chat-input { border-color: var(--owop98-brightColor); }
#ZoomSlider-SliderBar, #player-list, #chat-input { border-style: solid; }
#ZoomSlider-SliderBar { width: 0; }
#ZoomSlider-SliderBar, #player-list, #chat-input { border-image-slice: 2; }
#ZoomSlider-Container { height: 120px; }
#ZoomSlider-Window { height: 130px; }
#opm { font: 16px pixel-op, sans-serif; }
#opm button:hover { -webkit-filter: brightness(110%); }
#opm button:hover { filter: brightness(110%); }
#opm button:hover { transition: -webkit-filter .125s; }
#opm button:hover { transition: filter .125s; }
#opm button:hover { transition: filter .125s, -webkit-filter .125s; }
#opm button:active { -webkit-filter: brightness(90%); }
#opm button:active { filter: brightness(90%); }
#windows > div > span, #ZoomSlider-WindowTitle, #help > .title { margin-left: -5px; }
#help-button > img { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGbSURBVFhHrZYBroQgDER1L67ezJv5eUC/aApt1UlmASnMWCnZ+TiOyYN5noeBaZ+5dkMwDYhwiUNDb+cqHzXyq60KxNG1xGklzsrUHd0MeDYqS/lpzbA2mykDA2oGEF/Xtb5Vn9u2EptWpEEVB8y5M0EGWiqPTN7X7PtenzUPO7wOHogLZS3itCmDLhNn54W4UPZA/Bw3AQrPzgcGEBbxUAa+EBeyVzgDlgHmhdp8S4nxZuBHuaS2C6osbZb7KbBUnQHKM4LW0IXMaen0rGnjRxxexWBZuGzybo53j4NNMaJC0n0XH3223poecgZYpBFExOXbe8XB+ATe4DmwEXHgNhCpFg+WZclGzUMIPOJRbNuWd3QZGL1ZSXsdPIBpgLenFDXIoYtePC3MMzBKv3z33l0hae6Bc/DaAHOtuCUK5ACC1wYAWRD20Iq2cBmoXRWSAaAZ6AkLzEMoqUVII+I9YUscuKqgtDoRv1eJR/gffIIRRyEyl0zkPu0lwEH1YUvLQBG9/l+I8PMyjMJ1FY/wRhx8UIbPxadpmv4A7jwFNoggXhsAAAAASUVORK5CYII=); }
#help-button > img { background-size: 64px; }
#help-button > img { padding-left: 64px; }
#help-button > img { height: 64px; }
#help-button > img { width: 64px; }
#chat.active, #dev-chat.active { box-shadow: 0 -1px 0 var(--owop98-brightestColor), 1px 0 0 #7b7b7b, 1px -1px 0 #7b7b7b, 1px -2px 0 var(--owop98-brightColor), 2px 0 0 #000, 2px -2px 0 #000, -1px -1px 0 var(--owop98-brightestColor), -1px 1px 0 var(--owop98-brightestColor), -2px -2px 0 var(--owop98-brightColor), -2px 2px 0 var(--owop98-brightColor); }
#chat-messages > li > .nick { color: #0880cb; }
#chat-messages > li.discord > .nick { color: var(--owop98-discordColor); }
#chat-messages > li.moderator { color: var(--owop98-modColor); }
#chat-messages > li [style*="color: #1fd574"], #chat-messages > li [style*="color: #68fb67"] { color: var(--owop98-modColor) !important; }
#chat-messages > li span[style*="color: #65f1da"], #chat-messages > li span[style*="color: #67fbee"], #chat-messages > li [style*="color: #3bb9c5"] { color: var(--owop98-discordColor) !important; }
#chat-messages > li a:link { color: var(--owop98-linkColor); }
#chat-messages > li a:visited { color: #8000ff; }
#chat-input, #NewChat-Input, input { background-color: var(--owop98-inputColor); }
#toole-container > button:hover:active div { margin: -16px -2px; }
#toole-container > button.selected div { margin: -17px -3px; }
#chat-messages > li.tell, #chat-messages > li > .tell { color: var(--owop98-tellColor); }
#chat-messages > li.admin { color: var(--owop98-adminColor); }
#chat-messages > li.server { color: var(--owop98-serverColor); }
#chat-messages > li [style*="color: #ffb28c"] { color: var(--owop98-adminColor) !important; }
#chat-messages > li span[style*="color: #fff89a"] { color: var(--owop98-tellColor) !important; }
input:focus { outline-offset: -2px; }
button:focus { outline-offset: -3px; }
#opm button:focus, .windowCloseButton:focus, #toole-container > button:focus { outline: 0; }
input:focus, button:focus { outline: #000 dotted 1px; }
.framed, #ZoomSlider-SliderTooltip { border: 1px solid #000; }
.framed, #ZoomSlider-SliderTooltip { background-color: var(--owop98-tooltipColor); }
.framed, #ZoomSlider-SliderTooltip { padding: 2px; }
.framed { opacity: 1; }
#ZoomSlider-SliderTooltip { pointer-events: none; }
#ZoomSlider-SliderTooltip { margin-top: -2px; }
#ZoomSlider-SliderTooltip { left: 5px; }
#motd h2 { color: #fff !important; }
#motd > div > span[style*="font-weight:"] { text-shadow: none !important; }
.windowCloseButton { -ms-interpolation-mode: nearest-neighbor; }
.windowCloseButton { image-rendering: -moz-crisp-edges; }
.windowCloseButton { image-rendering: pixelated; }
#add-emote { font-size: 14px; }
#add-emote, #add-emote:hover { background: none; }
#emotes-container { max-height: 165px; }
#emotes-list { bottom: 27px; }
#emotes-list { margin-left: -1px; }
#emotes-container #emote-button:hover { border-radius: 0; }
div[style*="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS41ZEdYUgAAAPJJREFUOE9j+P//P8kYDGCMdSa2/5HxPCOb//YaRv/XTPX9f2BlEAoGawBp7DOw+v/Iyvn/U2sXOD5j4QjW+PBk1P//z5Pg+M+TxP9zWjwgVoM0ImvCpxGEB1Bjg77F/+PmDih4k6kdWOORtcH/7xyJRMHdJS4QjQ76xv+dzExQsKOJCVijlb7df0sDBxRso2MJ0eibZfs/dqMnCo6c6wrWKJy9/D93xR4UrOpXCtEYUGL3P/mYLwqOXecB1shTtuM/S8tFFKwYUj+QGhP3exOlka3h1H/loBpoggUCkGb/IgT2TYOkVXWfArBCZMzAwMAAAN8DxyM3w/t7AAAAAElFTkSuQmCC"] {
	background-color: var(--owop98-color) !important;
	box-shadow: none !important;
	border-image-source: var(--owop98-borderSmall) !important;
	width: 22px !important;
	height: 22px !important;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA+SURBVChTY3xq7fKfAQ1IHdnNCGa8SMaQY4LSRINBqIHx/38Mf+EFpNuQfMwXw4o5lpvAwcraemkYBisDAwCyGA+yun3iBgAAAABJRU5ErkJggg==) !important;
}
input[type="checkbox"] { filter: contrast(9); }
div[style*="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS41ZEdYUgAAAPJJREFUOE9j+P//P8kYDGCMdSa2/5HxPCOb//YaRv/XTPX9f2BlEAoGawBp7DOw+v/Iyvn/U2sXOD5j4QjW+PBk1P//z5Pg+M+TxP9zWjwgVoM0ImvCpxGEB1Bjg77F/+PmDih4k6kdWOORtcH/7xyJRMHdJS4QjQ76xv+dzExQsKOJCVijlb7df0sDBxRso2MJ0eibZfs/dqMnCo6c6wrWKJy9/D93xR4UrOpXCtEYUGL3P/mYLwqOXecB1shTtuM/S8tFFKwYUj+QGhP3exOlka3h1H/loBpoggUCkGb/IgT2TYOkVXWfArBCZMzAwMAAAN8DxyM3w/t7AAAAAElFTkSuQmCC"]:hover:active { border-image-source: var(--owop98-borderPressed) !important; }
[style*="color: rgb(255, 0, 0)"], [style*="color:rgb(255, 0, 0)"], [style*="color: #f00"], [style*="color:#f00"], [style*="color: #FF5555"], [style*="color:#FF5555"], [style*="color: #F55"], [style*="color:#F55"] { color: var(--owop98-redColor) !important; }
[style*="color: rgb(0, 0, 255)"], [style*="color:rgb(0, 0, 255)"], [style*="color: #00f"], [style*="color:#00f"] { color: var(--owop98-blueColor) !important; }
::-webkit-scrollbar-button, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:active, ::-webkit-scrollbar-button:disabled, ::-webkit-scrollbar-button:active { border-image-source: var(--owop98-border); }
::-webkit-scrollbar-button, ::-webkit-scrollbar-button:hover, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:disabled, ::-webkit-scrollbar-track, ::-webkit-scrollbar-button:active { background-color: var(--owop98-color); }
::-webkit-scrollbar-track { background-image: var(--owop98-checkers); }
::-webkit-scrollbar-button:disabled:single-button:decrement { background-image: var(--owop98-leftArrowDisabled); }
::-webkit-scrollbar-button:disabled:single-button:increment { background-image: var(--owop98-rightArrowDisabled); }
::-webkit-scrollbar-button:disabled:single-button:vertical:decrement { background-image: var(--owop98-upArrowDisabled); }
::-webkit-scrollbar-button:disabled:single-button:vertical:increment { background-image: var(--owop98-downArrowDisabled); }
::-webkit-scrollbar-button:single-button:vertical:decrement { background-image: var(--owop98-upArrow); }
::-webkit-scrollbar-button:single-button:vertical:increment { background-image: var(--owop98-downArrow); }
::-webkit-scrollbar-button:single-button:vertical:decrement:hover:active, ::-webkit-scrollbar-button:single-button:vertical:increment:hover:active, ::-webkit-scrollbar-button:single-button:decrement:hover:active, ::-webkit-scrollbar-button:single-button:increment:hover:active { background-position: 1px 1px; }
::-webkit-scrollbar-button:single-button:decrement { background-image: var(--owop98-leftArrow); }
::-webkit-scrollbar-button:single-button:increment { background-image: var(--owop98-rightArrow); }
::-webkit-scrollbar-button:single-button:decrement, ::-webkit-scrollbar-button:single-button:increment, ::-webkit-scrollbar-button:single-button:vertical:decrement, ::-webkit-scrollbar-button:single-button:vertical:increment, ::-webkit-scrollbar-button:disabled:single-button:increment, ::-webkit-scrollbar-button:disabled:single-button:decrement, ::-webkit-scrollbar-button:disabled:single-button:vertical:decrement, ::-webkit-scrollbar-button:disabled:single-button:vertical:increment { background-position: 0 0; }
::-webkit-scrollbar-button:hover:active { border-image-source: var(--owop98-borderPressed); }
body {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAADVSURBVHhe7ZuxFYIwGAZ/rVwD9rBiAfdJY8MYjGHLKAzBAih4z/dcgOa+ay6hyyU0PHJZlmUrKX3fV+0BjLTW9o3fjhPQdV3N8/zNImFf7ziO9RdgGM6PcHs+GJ3H677+Alx5piUBsJYEwFoSAGtJAKwlAbCWBMBaEgBr0X8QySuAtSQA1pIAWEsCYC0JgLUkANaSAFhLAmAtCYC1JADWkgBYSwJgLQmAtSQA1pIAWEsCYC0JgLUkANaSAFhLAmAtCYC1HL/KTtPE1MVxd/hj7fX5qqo35PIolvdOptwAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB5SURBVFhH7ZALDsAgCENBj73Db3w65Q5tE/aQVFnqZs9rqehsxSfKPbn6vME6h2d373ku3/Sgn/fLm3MUZpe5F54zH1Vv//ty//X0naz2HD/+y2vn9desiFn4ouOWAgBppQBAWikAkFYKAKSVAgBppQBAWikAkFRmH+IqAnK+ElaZAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABOSURBVDhP7dSxDQAgCETR01FYk5oxWI1VNKKFHQm0vMTC5ofqhpktFBERcEIVzHwOWfM23Ug+94dKOhTrUKxDMd8jVX3fHBHxGSgPGwBslH1O965Jk0YAAAAASUVORK5CYII=);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABJSURBVDhPY7x3795/BjKAkpISAwNIM6mguroaZOF/Jog5YMBIAgYDZM0kg1HNJIKRqBmcMebOnQvlEg9aW1vB6ZSsXMXAwMAAAH0CQvphmUNRAAAAAElFTkSuQmCC);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVDhP7ZSxDQAxCAOd34TZGIOWOVklCRH6FglaTrKEC670EpGNJqoKhKgcM9vOd8vj3quSeMcv6jKinBHljCjn7REzR61BRPAp8F1pAhyzkE7uV7cmWAAAAABJRU5ErkJggg==);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAxSURBVDhPY6yurv7PQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYAIpeObF9sFBMAAAAAElFTkSuQmCC);
	--owop98-brightestColor: #fff;
	--owop98-brightColor: #dedede;
	--owop98-color: #bdbdbd;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAJUExURf///3t7e////y02hA4AAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAJUExURf///3t7e////y02hA4AAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAJUExURf///3t7e////y02hA4AAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAJUExURf///3t7e////y02hA4AAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACuSURBVDhPvZRRDsMgDEOTXQxuBtwMTrbVCNQ0SbfCx55UVUG1bMAqvw9oEWamLmytjaXf1Fop50yvMS9zEcYY+zPRs+QiRAwgBXNNY6LKD+9EwAh11DvMHgGcZGwPs0cdVc4SE/UpvQCllDE+AwXg471cObAVFfXujrBeIaV0Cr/dmSaEsH+qRghn6a7niRHKxkyBVwI3qm6PhyvUUT3cPQI4ydia/1/H1u+RiOgDS9FcEjE4p0oAAAAASUVORK5CYII=);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAIAAABFpVsAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABpSURBVDhPY/z//z8DEYCRkZEFSB08eBDCxwUOHDgAJJkgHGLAUFIKCgE4cHBwgLLAAOJxOCDXVDRj0ABIKX4VtATApAJyQENDA4SPH0C9hRZMWMFQSgPkRiwQ4EkxFJiKJz0Qm7kZGBgA+gIcuKW0krIAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAIAAABFpVsAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAB+SURBVDhPzZPdCcAgDIST4mCO5mg6mT2J+Nc22oLQ70ENHDEXI8cYaQFmNthCCBI/4b3HmqSCtTafGkQkHHlfoGYFbQ4w3PMi6x5pV+ttEwpVOni6kqRT0TYwKqkA55zEOtmW7l2YN6uY/voEQJmYf40LULrWSfVhWP3cRHQCkY0kQJsQcygAAAAASUVORK5CYII=);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAIAAABFpVsAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAACcSURBVDhPtZNRDoAgDEPBeDCOxtHgZFgyrWMCkhjfhzJsi0P0pRS3gPd+xy3nLPWIlBKumxQr1FRNCOEcXUgksFLAZ0A7bylnOdAe0KSaPHqEWVtwanOTamIMt1QHdKnSV9Fv4KjUF4gxSj3nbGveu/DhuIDnCrJFHSnQ20dnI+UsB8MPC0wePeClLThptqk6xtBI9epPVn9u59wBDgY8SDXt3pAAAAAASUVORK5CYII=);
	--owop98-textColor: #000;
	--owop98-inputColor: #fff;
	--owop98-tooltipColor: #ffe;
	--owop98-plus: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAvSURBVChTY/z//z8DOmBkZAQLAuUYwQJIgAlKEw0GoQaQpzB9jQeQbsPIC1YGBgA7/w8P82s3NgAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAiSURBVBhXY/z//z8DEIAIRmSaCZsgiAZJYAiCaKrpYGAEAOkmFQisixrxAAAAAElFTkSuQmCC);
	--owop98-leftArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAAG0lEQVQI12NgQAYNDIwNDMwNDOxgEsgGiqACAFk2A5A3D93rAAAAAElFTkSuQmCC);
	--owop98-rightArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAAGklEQVQI12NgQAJMDAzMQNTAwHwATIJFUAEALd4B1Eru2lAAAAAASUVORK5CYII=);
	--owop98-upArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAAGElEQVQIHWPABIwMDMwNDOwHGPgfMGAAADAIAjsFOUPaAAAAAElFTkSuQmCC);
	--owop98-downArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAAF0lEQVQIHWPABPwPGNgPMDA3MDAyYAIAOTICOy23jPkAAAAASUVORK5CYII=);
	--owop98-adminColor: #800;
	--owop98-modColor: #080;
	--owop98-tellColor: #840;
	--owop98-linkColor: #00f;
	--owop98-redColor: #f00;
	--owop98-discordColor: #488;
	--owop98-blueColor: #00f;
	--owop98-serverColor: #f08;
	--owop98-titleColor: #fff;
}
body[color-scheme="win93"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAHt7ewD///8A/729vd7e3v///8q7+coAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAA8SURBVEjHYwjFDwIYwtLwAgGGMBe8AKjA2RgFKKEAlVEFI00BwQQzqmBUwaiCUQWjCmisIFAQLxBgIAQAtbTgvAtKSMwAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAKnSURBVBgZBcGBgdswAMQwnK10/32jPAss3eO+fsf343d8X/fjHve4xz1+x33dj/v6ftzjd3xf9+P3usf34x73dY97/I573I/7usc9vh+/1z2+H/f4vb4fv9f3uMfv+H78Ht9/7ut+/I7v8Xvd4x73477u8T3u8Tu+H7/XPR6IAcIsAkAgDRYMRDOWYYyBNGgGmgXNImMEGmARNGgE2CzYn8Y8MEsjY8RGgAbNIhAzDKQxAmkALAgxy9KYBmZAACyCxcCIgRF5gAabkCEGAqAxaIosS7OIWWJgaSBmAJBGsMSDMQEYQCAGTfMED2QAggZjMWKWRYCNaUJMsxgjCDFYGjHNGDCNNMswDfYHMA0ET5Ye8mATCNOMJhpswjTDDAGMAZoYJoaJxiwNlkaGYIgpC5oeTZQFwB8Q8yAAACKySFlCGpEGAsQyIGIwxlJCpBEAaBAbjLEMYwLAAMwDLBhAgxFjGBhpmkWAARSJRlCiMcYENgYQNENMCAqeGAQaA3kASAAwzcZEWRYDaYyBLI0ZY5gGC8YigAAYWASymBhLLM3AEjAPxAALBgAxBoAYyCJoxmKAZWxiEQOzoDQNANM0JgwALDHMEvLAFLM0KIsIMBosmyFNYxoRoIGR2BgUCMxYlgZNwf7IMgAAI6QZzQOYpceyjMbALCEGiCHAMgAsUZqlRAyMRgLNMpaBHoAAgEGYBcsDLNifgBnSSLNAmoAxAIxpwmAzYmDTDAgMBqRpMBpjDBpTzCgI82BpYEwTYdCIGTGAsgw0ECAWiGmkLMCmWUKiWcYSSymCpQxplmbIA4MmxrIMjGFgIANoyrKUZsGCwAKYMFEEI8aCEgvGQIMBLEaMeSACREQgyiIxmoABGgNpBBholoFNMcuAGQ1iAABkAWBM81DkPw7wGDqSiTzUAAAAAElFTkSuQmCC);
}
body[color-scheme="winstandard"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQokakBAQICAgKbK8NTQyOnn4////y7aLIQAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAA9SURBVEjHYwjFDwIZwtLwAkWGMBe8AKjAgQEFGKMAk1EFI00BwQQzqmBUwaiCUQWjCmisIEgJL1BkECQAAI+fzApyNIUPAAAAAElFTkSuQmCC);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABkSURBVEhL7Y/BDcAwCAMp9Nc5ulz2H6AhDkraBaxKvgcYx4/4uO7m7hHh0fcYJ+Rm9j2t91mZvLYMRE2szKQcFzIpU8CarzA/58rU35ZpP0cF2KgAGxVgowJsVICNCrBRAS5mD4r0AnvpZAEgAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAPUExURf///0BAQICAgOnn4/////sZNWkAAAABdFJOUwBA5thmAAAAIUlEQVQI12MwhgJDBhMXCFBkMGGAgMHAMlKCAEUGQRgAAF/UCnut6fWDAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAPUExURf///0BAQICAgOnn4/////sZNWkAAAABdFJOUwBA5thmAAAAIklEQVQI12MwhgABBhMXEHACMhhAgImWDCMlMBBgEIQAAQCCDwfndSFrlAAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAPUExURf///0BAQICAgOnn4/////sZNWkAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggIVBkVBCDBhUGSAgMHAUjaGABMGFxgAABp9CsciYTFgAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAxSURBVDhPY2xoaPjPQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYAGisOe3QvXfMAAAAAElFTkSuQmCC);
	--owop98-brightestColor: #fff;
	--owop98-brightColor: #e9e7e3;
	--owop98-color: #d4d0c8;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAJUExURf///4CAgP///zzgnT4AAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAJUExURf///4CAgP///zzgnT4AAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAJUExURf///4CAgP///zzgnT4AAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAJUExURf///4CAgP///zzgnT4AAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAICAgNTQyP///zuMmWoAAAAJcEhZcwAADsIAAA7CARUoSoAAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAMUExURQAAAICAgNTQyP///zuMmWoAAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAICAgNTQyP///zuMmWoAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAICAgNTQyP///zuMmWoAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
}
body[color-scheme="dark"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURSMjIzY2NkBAQGBgYH9/f5WVlZubm4qfnlEAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAA9SURBVEjHY3DBD5wY3NLwAiYGN0G8AKhA2BgFhKKAwFEFI00BwQQzqmBUwaiCUQWjCmiswIEBL2BiUCIAAFSX/wXOi70xAAAAAElFTkSuQmCC);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAAAAACDjCb1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAlSURBVDjLY0xkYAQBJJIBjY8hgMRnZGBioBCMGjBqwKgBg8UAAJd4ALR2tiuDAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAPUExURf///yMjI0BAQH9/f5ubm4AAsKIAAAABdFJOUwBA5thmAAAAIUlEQVQI12MwhgIjBhMXCBBiMGGAgMHAMhSEACEGJRgAAAvQCa3209vrAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAPUExURf///yMjI0BAQH9/f5ubm4AAsKIAAAABdFJOUwBA5thmAAAAIklEQVQI12MwhgAFBhMXEHAEMhhAgJGWDENBMFBgUIIABQC3rgjbUE0ilwAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAPUExURf///yMjI0BAQH9/f5ubm4AAsKIAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggIVBkVBCDBhUGSAgMHAUjaGABMGFxgAABp9CsciYTFgAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAxSURBVDhPY6yvr//PQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYADw5OeGt9yuOAAAAAElFTkSuQmCC);
	--owop98-brightestColor: #9b9b9b;
	--owop98-brightColor: #7f7f7f;
	--owop98-color: #363636;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///yMjI5ubm8+hxc0AAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///yMjI5ubm8+hxc0AAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///yMjI5ubm8+hxc0AAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///yMjI5ubm8+hxc0AAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURSMjIzY2NkBAQJubm////z+tLTMAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABPSURBVAjXYzAGAyMGQ0EQYELQIo4ijmC+iwtEHMhF5sPlUfUZMIAAE4MSBEBpZQYFsDgzgwJYnTAS7QKEIFrExREi7iKIwofJo+qDuNsYANUeEiKrmrXNAAAAAElFTkSuQmCC);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURSMjIzY2NkBAQJubm////z+tLTMAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAA7SURBVAjXYzAGAyMGQ0EQYCKBdnFxRKEh4gYMIMDEoAQBUFqZQQEszsygAFYnTAIt4uKCQkPEIe42BgAmGRCKZI+QlwAAAABJRU5ErkJggg==);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURSMjIzY2NkBAQJubm////z+tLTMAAAAJcEhZcwAADsAAAA7AAWrWiQkAAABJSURBVAjXYzAGAyMGQ0EQYGIwFHFxcUGhBQVF8NJQdVD9BgwgwMSgBAFQWplBASzOzKAAVicMpIH6HJFpR0FBvDRMHUQ/xN3GAFEUFFOcHl2fAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURSMjIzY2NkBAQJubm////z+tLTMAAAAJcEhZcwAADsAAAA7AAWrWiQkAAABUSURBVAjXTc7BCcAwDANAk04gmgFCu0DbTGDQ/jM1VvywPodEDLGpfPYi0oqddAmEUSXA1JF7uXss0uzaSW8b2g8bendWSUpHD1eVqzJF7uVu/3v+dJMT7QBd56kAAAAASUVORK5CYII=);
	--owop98-textColor: #fff;
	--owop98-inputColor: #7f7f7f;
	--owop98-tooltipColor: #363636;
	--owop98-plus: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAuSURBVChTY/z//z8DFgATZITScMAEpYkGg1ADyNNYfY0LkGUDlIkChnGwMjAAACeFDAwM7NUaAAAAAElFTkSuQmCC);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAcSURBVBhXY/j//z/D7NmzgRQqjVUQRNNex38GAKm/aGuDvICKAAAAAElFTkSuQmCC);
	--owop98-leftArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAG0lEQVQI12NgQAYNDIwNDMwNDOxgEsgGiqACAFk2A5A3D93rAAAAAElFTkSuQmCC);
	--owop98-rightArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAGklEQVQI12NgQAJMDAzMQNTAwHwATIJFUAEALd4B1Eru2lAAAAAASUVORK5CYII=);
	--owop98-upArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAA2SURBVDhPY/z//z8DJYAJSpMNRg0gbADBKMJnAEwzXkNwGYCuCach2AzApRir+GhKHHgDGBgAtrwNEunjLjUAAAAASUVORK5CYII=);
	--owop98-downArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAF0lEQVQIHWPABPwPGNgPMDA3MDAyYAIAOTICOy23jPkAAAAASUVORK5CYII=);
	--owop98-adminColor: #f88;
	--owop98-modColor: #0f0;
	--owop98-tellColor: #f80;
	--owop98-linkColor: #88f;
	--owop98-redColor: #f77;
	--owop98-discordColor: #6cc;
	--owop98-blueColor: #3d5ddd;
}
body[color-scheme="wheat"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAICAALy8QciwSN7eoO7uz+7u0N8ZEcQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYwjFDwIYwtLwAgWGMBe8AKjAURAFGKMAk1EFI00BwQQzqmBUwaiCUQWjCmisIEgJL1BgIAQA5RPYm3ySqLgAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAABMSURBVEhL7c8xCgAgDAPAtC/Xn1ul4qLQLQg5B0M7aKw3S8h7gnmcnY+Vc1Weh7m6zSO8Hip+wPE5FWBTATYVYFMBNhVgUwE2FeACBnzLAd2JBFzgAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///wAAALy8Qe7uz+7u0EO9FnMAAAACdFJOUwAAdpPNOAAAACxJREFUCNdjcIECJ4ZQKDBicBGEAGSWK26WAFVYqCYzMDBCWM7GEGDEoAQDACobFRK1vBMJAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAASUExURQAAAP///wAAALy8Qe7uz+7u0EO9FnMAAAACdFJOUwAAdpPNOAAAACtJREFUCNdjcIEABYZQMAhWYHARBAFhGINZgcGVAoYwNoazMRgoMChBgAIAfuIPbo7P6xgAAAAASUVORK5CYII=);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAPUExURf///wAAALy8Qe7uz+7u0OyY6FwAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggIVBkVBCDBhUGSAgMHAUjaGABMGFxgAABp9CsciYTFgAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAySURBVDhPY9yzx/E/AzUAyCAgYKAEg8xggppHMRg1iDAYNYgwGDWIMBh8BlGpYGNgAAC3TjrR1U6w1QAAAABJRU5ErkJggg==);
	--owop98-brightestColor: #eeeed0;
	--owop98-brightColor: #eeeecf;
	--owop98-color: #dedea0;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///7y8Qf///+V4hgwAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///7y8Qf///+V4hgwAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///7y8Qf///+V4hgwAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAJUExURf///7y8Qf///+V4hgwAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAALy8Qd7eoO7u0E5U7UQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAALy8Qd7eoO7u0E5U7UQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAALy8Qd7eoO7u0E5U7UQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAALy8Qd7eoO7u0E5U7UQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAcSURBVBhXY/j//z/Du3cXgBQqjVUQRNNex38GADa7d9HkydouAAAAAElFTkSuQmCC);
}
body[color-scheme="discord"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAACMlKTY5P2hqb05dlHKJ2pabpX8DONQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYzDGDwwYzNLwAgEGMyW8AKhAxQUFhKKAoFEFI00BwQQzqmBUwaiCUQWjCmiswFAQLxBgIAQAu8ph3k6p960AAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABcSURBVEhL7Y9RCoAwDEOTHtAbeCzva9spzKHfQciDttlSCuG2HyTRVT3nGLcA49uqahlDX+25P1nrqclK4uVz3a8LLbrnGz/HAdQ4gBoHUOMAahxAjQOocQAtwAmIvQHy8w8U6QAAAABJRU5ErkJggg==);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAACMlKWhqb5abpZgDAZEAAAABdFJOUwBA5thmAAAAIUlEQVQI12MwhgJDBhMXCFBkMGGAgMHAMlKCAEUGQRgAAF/UCnut6fWDAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAACMlKWhqb5abpZgDAZEAAAABdFJOUwBA5thmAAAAIklEQVQI12MwhgABBhMXEHACMhhAgImWDCMlMBBgEIQAAQCCDwfndSFrlAAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAACMlKWhqb5abpZgDAZEAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggIVBkVBCDBhUGSAgMHAUjaGABMGFxgAABp9CsciYTFgAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAxSURBVDhPY1RW1fzPQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYALhlNbEkFGQ+AAAAAElFTkSuQmCC);
	--owop98-brightestColor: #969ba5;
	--owop98-brightColor: #686a6f;
	--owop98-color: #36393f;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///yMlKZabpeblXvEAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///yMlKZabpeblXvEAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///yMlKZabpeblXvEAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///yMlKZabpeblXvEAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAACMlKTY5P5abpf///+pC7cUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABMSURBVAjXYzAGAwMGIyUQEEDQKk4qTmC+iwtEHMhF5sPlUfUZCoKAAAMqYGZgBIsLMzCC1Skj0S5ACKJVXJwg4i5KKHyYPKo+iLuNAV3rFbgbcJQkAAAAAElFTkSuQmCC);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAACMlKTY5P5abpf///+pC7cUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA4SURBVAjXYzAGAwMGIyUQECCBdnFxQqEh4oaCICDAgAqYGRjB4sIMjGB1yiTQKi4uKDREHOJuYwDpLhSoQ+0grgAAAABJRU5ErkJggg==);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAACMlKTY5P5abpf///+pC7cUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABHSURBVAjXYzAGAwMGIyUQEGAwUnFxcUGhlZRU8NJQdVD9hoIgIMCACpgZGMHiwgyMYHXKQBqozwmZdlJSwkvD1EH0Q9xtDACwhRcuJnDRqgAAAABJRU5ErkJggg==);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAACMlKTY5P5abpf///+pC7cUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABTSURBVAjXVc7BDYAwDAPAVCxQxAamAwDdIPL+M9GYPII/J1uNVJvKZQ8ivThIl0AYVQJMHbmXu3uPdPtns6b9sKZ3Z5WkdIxwVbkqU+Re7r5/zxfILxbqFoTEFwAAAABJRU5ErkJggg==);
	--owop98-textColor: #fff;
	--owop98-inputColor: #4e5d94;
	--owop98-tooltipColor: #36393f;
	--owop98-plus: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAuSURBVChTY/z//z8DFgATZITScMAEpYkGg1ADyNNYfY0LkGUDlIkChnGwMjAAACeFDAwM7NUaAAAAAElFTkSuQmCC);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAcSURBVBhXY/j//z/DtNlLgRQqjVUQRNNex38GAMM8aMU9jb2fAAAAAElFTkSuQmCC);
	--owop98-leftArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAG0lEQVQI12NgQAYNDIwNDMwNDOxgEsgGiqACAFk2A5A3D93rAAAAAElFTkSuQmCC);
	--owop98-rightArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAGklEQVQI12NgQAJMDAzMQNTAwHwATIJFUAEALd4B1Eru2lAAAAAASUVORK5CYII=);
	--owop98-upArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAA2SURBVDhPY/z//z8DJYAJSpMNRg0gbADBKMJnAEwzXkNwGYCuCach2AzApRir+GhKHHgDGBgAtrwNEunjLjUAAAAASUVORK5CYII=);
	--owop98-downArrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAF0lEQVQIHWPABPwPGNgPMDA3MDAyYAIAOTICOy23jPkAAAAASUVORK5CYII=);
	--owop98-adminColor: #f88;
	--owop98-modColor: #0f0;
	--owop98-tellColor: #f80;
	--owop98-linkColor: #7289da;
	--owop98-redColor: #f77;
	--owop98-discordColor: #6cc;
	--owop98-blueColor: #3d5ddd;
}
body[color-scheme="maple"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAIAAAMamRubYrvLs1yf9ov8AAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA7SURBVEjHY3DBDxwYCChQYHAxxguACgwFUYASClAeVTDSFBBMMKMKRhWMKhhVMKqAxgqclPACBQZCAAB6z2WOsJJDsQAAAABJRU5ErkJggg==);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVEhL7Y9LCgAhDEOTenGPPhY/yMjMNgh5i1BjER8rwSALMwNj2DOH2Y/j/34r432Vw8cjmdsf1k7vz7L3swxcjgXUWECNBdRYQI0F1FhAjQW0AA8+4wGwKBSM/AAAAABJRU5ErkJggg==);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAMUExURf///wAAAMamRvLs1yIZzhoAAAABdFJOUwBA5thmAAAAIklEQVQI12P4DwQXGEDkBIYPDAwM1CZfrVq1agJDKBAEAABZUiN1okoebwAAAABJRU5ErkJggg==);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURQAAAP///wAAAMamRvLs11j+HgEAAAACdFJOUwAAdpPNOAAAACdJREFUCNdjcIEABQYI7QxkCAKBADMtGAIMQABkOBuDgQKDEgQoAAAvUQ5gSIT83AAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAMUExURf///wAAAMamRvLs1yIZzhoAAAABdFJOUwBA5thmAAAAI0lEQVQI12NYBQQbGKaGhoZ+YJjAwMBAbXL/////PzD8B5EA9DQkdTyWsRQAAAAASUVORK5CYII=);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAySURBVDhPYzy2zO0/AzUAyCAgYKAEg8xggppHMRg1iDAYNYgwGDWIMBh8BlGpYGNgAABPqzq18tj1lgAAAABJRU5ErkJggg==);
	--owop98-brightestColor: #f2ecd7;
	--owop98-brightColor: #f2ecd7;
	--owop98-color: #e6d8ae;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///8amRv////hGHzEAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///8amRv////hGHzEAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///8amRv////hGHzEAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///8amRv////hGHzEAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAMamRubYrvLs1z3dHQQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAMamRubYrvLs1z3dHQQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAMamRubYrvLs1z3dHQQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAMamRubYrvLs1z3dHQQAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAcSURBVBhXY/j//z/DpzfXgRQqjVUQRNNex38GAGZMeHPNt0mWAAAAAElFTkSuQmCC);
}
body[color-scheme="opm"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAE4+RINmOoJncbmWZMWof9zLsZlnywAAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYwjFDwIYwtLwAgWGMBe8AKjAURAFGKMAk1EFI00BwQQzqmBUwaiCUQWjCmisIEgJL1BgIAQA5RPYm3ySqLgAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABbSURBVEhL7Y9LCgAhDEOrB3Pl3vvfRvubUS8QhDyRpg0tpIzWpRha7KeIzqTixuWm8Im+7P5Vr5e72THO/rz6LYU4pdS19jQMgIYB0DAAGgZAwwBoGAANA2ARmcLkAXccJRj/AAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///wAAAINmOsWof9zLsZmEUSQAAAACdFJOUwAAdpPNOAAAAClJREFUCNdjcIECJwbXUAgwYnAVhAC6sxhAQJABxmIAspyNIcCIQQkGAA6RFGBSY7vbAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///wAAAINmOsWof9zLsZmEUSQAAAACdFJOUwAAdpPNOAAAACtJREFUCNdjcIEABQbXUBAIBjIEQUCYygwBZiBDgAEIgAxnYzBQYFCCAAUAjxAPatoewEoAAAAASUVORK5CYII=);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAAINmOsWof9zLsTahrwsAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggJlBkVBCHBmUGSAgMHAUnGBAGcGYxgAAG6BC5Vm1boHAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAxSURBVDhPY2xOs/rPQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYAAeYOHmDAqvOAAAAAElFTkSuQmCC);
	--owop98-brightestColor: #dccbb1;
	--owop98-brightColor: #c5a87f;
	--owop98-color: #b99664;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///4NmOtzLsX9qFMgAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///4NmOtzLsX9qFMgAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///4NmOtzLsX9qFMgAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///4NmOtzLsX9qFMgAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAINmOrmWZNzLsbea6a4AAAAJcEhZcwAADr8AAA6/ATgFUyQAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAMUExURQAAAINmOrmWZNzLsbea6a4AAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAINmOrmWZNzLsbea6a4AAAAJcEhZcwAADr8AAA6/ATgFUyQAAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAINmOrmWZNzLsbea6a4AAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAcSURBVBhXY/j//z/DndMbgRQqjVUQRNNex38GAHmbcekx1heMAAAAAElFTkSuQmCC);
	--owop98-adminColor: #6a2525;
	--owop98-modColor: #395a28;
	--owop98-tellColor: #70612d;
	--owop98-linkColor: #3e4054;
	--owop98-redColor: #6a2525;
	--owop98-discordColor: #22446e;
	--owop98-blueColor: #7c81a9;
	--owop98-serverColor: #53345a;
}
body[color-scheme="winaero"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURWlpaaCgoJm00bnR6vDw8Pj4+P///3QD4n8AAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYwjFDwIYwtLwAgGGMBe8AKjASQkFGKMAk1EFI00BwQQzqmBUwaiCUQWjCmisIFAQLxBgIAQAPhbhrCC/3HAAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABbSURBVEhL7Y/RDQAhCEOL+09wc7jIbSQnUcEFmkv6SGqR/tSe/sIMcIknrKvbPOv72o4t95yYx70dG7GVLvEk16TIXNonf0YF2KgAGxVgowJsVICNCrBRAS7AAB54ApFSavTLAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///2lpaaCgoPj4+P///4Yla/0AAAACdFJOUwAAdpPNOAAAACxJREFUCNdjcIECJwbXUAgwYnAVhACSWQwUshgYGOEsMDBicDaGACMGJRgAAPHDFAwaZZ/bAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///2lpaaCgoPj4+P///4Yla/0AAAACdFJOUwAAdpPNOAAAACtJREFUCNdjcIEABQbXUBAIBjIEQUCYHIYAM36GAAMQABnOxmCgwKAEAQoAhbAPN1PKftgAAAAASUVORK5CYII=);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///2lpaaCgoPj4+P///ykAldIAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggJlBkVBCHBmUGSAgMHAUnGBAGcGYxgAAG6BC5Vm1boHAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAySURBVDhPY1ywYMF/BmoAkEFAwEAJBpnBBDWPYjBqEGEwahBhMGoQYTD4DKJSwcbAAAD3Vzttq3iY1QAAAABJRU5ErkJggg==);
	--owop98-brightColor: #f8f8f8;
	--owop98-color: #f0f0f0;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///2lpaf///4MYfGgAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///2lpaf///4MYfGgAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///2lpaf///4MYfGgAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///6CgoP///1q/GDIAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAGlpaaCgoPDw8P///y6i+ewAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABPSURBVAjXY3ABA0cGZ2MQUETQBswGzGA+AwNEHMhF5sPlUfU5KYGAIoMgBEBpEQYhsLgKgxBYnQkSzQCEINqAgRkizmCMwofJo+qDuNsFAE8cGuaSTAyCAAAAAElFTkSuQmCC);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAGlpaaCgoPDw8P///y6i+ewAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA7SURBVAjXY3ABA0cGZ2MQUCSBZmBgRqEh4k5KIKDIIAgBUFqEQQgsrsIgBFZnQgJtwMCAQkPEIe52AQD+IRx+0QuJdwAAAABJRU5ErkJggg==);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAGlpaaCgoPDw8P///y6i+ewAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABJSURBVAjXY3ABA0cGZ2MQUGRwNmBgYEChjY0N8NJQdVD9TkogoMggCAFQWoRBCCyuwiAEVmcCpIH6mJFpZmNjvDRMHUQ/xN0uANMmGLUkVWgvAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAGlpaaCgoPDw8P///y6i+ewAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABUSURBVAjXTc7RCcAgEAPQwE1QcQFLBxDSBWzdfya9eB+Xn0eCB2IqAz89LdkBk6TrVZIIjbGnu+/2NFwnYUXR/qDo3ZsFII3d3VXuipCxp7vz77kAr6cZG9rGQ5IAAAAASUVORK5CYII=);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAcSURBVBhXY/j//z/Djx8/gBQqjVUQRNNex38GAHMyfAlR9lDxAAAAAElFTkSuQmCC);
	--owop98-titleColor: #000;
}
body[color-scheme="marine"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAAAAgBi0wEiQiIjAuKXPycjg2Cf5g0gAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYwjFDwIYwtLwAgOGMBe8AKjAURAFKKEAlVEFI00BwQQzqmBUwaiCUQWjCmisINgYLzBgIAQAA8zOmjx1n3MAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABSSURBVEhL7Y9LCgAhDEMTvfgcfayL+UT3QchDQkkL8ghe6GTnSB34NnrAfV/Z6km/ruSg8vPdr58r6Z+h4XAi4CYCbiLgJgJuIuAmAm4i4AW4AeBGAahJGa1LAAAAAElFTkSuQmCC);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAAEiQiKXPycjg2MAT66IAAAABdFJOUwBA5thmAAAAIUlEQVQI12MwhgJDBhMXCFBkMGGAgMHAMlKCAEUGQRgAAF/UCnut6fWDAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAAEiQiMjg2OHv7Tn62ooAAAABdFJOUwBA5thmAAAAIklEQVQI12NwgQABBmdjEDACMhhAgImWDCclMBBgEIQAAQDFKAi9h/paBQAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAAEiQiKXPycjg2MAT66IAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggJlBkVBCHBmUGSAgMHAUnGBAGcGYxgAAG6BC5Vm1boHAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAySURBVDhPY/SY0PGfgRoAZBAQMFCCQWYwQc2jGIwaRBiMGkQYjBpEGAw+g6hUsDEwAACNbjltOq3k8QAAAABJRU5ErkJggg==);
	--owop98-brightestColor: #c8e0d8;
	--owop98-brightColor: #a5cfc9;
	--owop98-color: #88c0b8;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///0iQiMjg2C179moAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///0iQiMjg2C179moAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///0iQiMjg2C179moAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///0iQiMjg2C179moAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAEiQiIjAuKXPyXaDsOgAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAMUExURQAAAEiQiIjAuKXPyXaDsOgAAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAEiQiIjAuKXPyXaDsOgAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAEiQiIjAuKXPyXaDsOgAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAcSURBVBhXY/j//z/DiQc3gBQqjVUQRNNex38GAEncdLnnNZlMAAAAAElFTkSuQmCC);
}
body[color-scheme="plum"] {
	--owop98-windowBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAEhAYHhgWKiYkKCEuL2xq9jQyLcVTa4AAAAJcEhZcwAADr8AAA6/ATgFUyQAAAA8SURBVEjHYwjFDwIYwtLwAgWGMGO8AKjAUBAFuKAA51EFI00BwQQzqmBUwaiCUQWjCmisIEgJL1BgIAQAPhmPw5xhc6IAAAAASUVORK5CYII=);
	--owop98-windowTitleBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAIAAAAphe5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABaSURBVEhL7Y/BCcAwDAMlT5Znx+j+UzR1TGkD6VcEdBBZmPhxPNoZDLK/MWs8CWLa9LxLZEFuss4fFqUOfz68clCb72ElNscCaiygxgJqLKDGAmosoMYCWoALuiYB+RumpW4AAAAASUVORK5CYII=);
	--owop98-border: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///wAAAHhgWL2xq9jQyPMwpmcAAAACdFJOUwAAdpPNOAAAACxJREFUCNdjcIECJwbXUAgwYnAVBAMGGIuBApYgmSwGMDBicDaGACMGJRgAAKACE5RIOgiDAAAAAElFTkSuQmCC);
	--owop98-borderSmall: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAASUExURQAAAP///wAAAHhgWL2xq9jQyPMwpmcAAAACdFJOUwAAdpPNOAAAACdJREFUCNdjcIEABQbXUBAIBjIEgUCAmSYMBiAAMpyNwUCBQQkCFABi5g7SU4nB5wAAAABJRU5ErkJggg==);
	--owop98-innerBorder: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAPUExURf///wAAAHhgWL2xq9jQyFwVWEgAAAABdFJOUwBA5thmAAAAIUlEQVQI12NQggJlBkVBCHBmUGSAgMHAUnGBAGcGYxgAAG6BC5Vm1boHAAAAAElFTkSuQmCC);
	--owop98-borderPressed: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAxSURBVDhPY2xOs/rPQA0AMggIGCjBIDOYoOZRDEYNIgxGDSIMRg0iDAafQVQq2BgYAAeYOHmDAqvOAAAAAElFTkSuQmCC);
	--owop98-brightestColor: #d8d0c8;
	--owop98-brightColor: #bdb1ab;
	--owop98-color: #a89890;
	--owop98-leftArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///3hgWNjQyJm2neQAAAABdFJOUwBA5thmAAAAH0lEQVQI12NgwA0EQEQEEDOCCFY4CyzGIAEiOND1AABGygHwSiHwtwAAAABJRU5ErkJggg==);
	--owop98-rightArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///3hgWNjQyJm2neQAAAABdFJOUwBA5thmAAAAIklEQVQI12NgwAlYQAQrmHAAEQEgIgNELAASbA1AgglDEwBEeAI+ZZyz2gAAAABJRU5ErkJggg==);
	--owop98-upArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///3hgWNjQyJm2neQAAAABdFJOUwBA5thmAAAAHUlEQVQI12NgwA8YQQSrA5AQDQASoSFAQmsVbvUARoACKRXFE+IAAAAASUVORK5CYII=);
	--owop98-downArrowDisabled: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAJUExURf///3hgWNjQyJm2neQAAAABdFJOUwBA5thmAAAAHklEQVQI12NgwA9CQ4CEaBSQYM0AEowLQIINuNUDAGNeAqfZTyt8AAAAAElFTkSuQmCC);
	--owop98-closeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAHhgWKiYkNjQyIAnpNMAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABKSURBVAjXY/j///8BhlerVjlAiBcaWkAWA4jbtArKgojBlVwNDXVggAEDBtHQ0AIGqVWrNkAJLi4g0aAFJBasgrHAYnAlQCs/AAD5OCzjTluyNwAAAABJRU5ErkJggg==);
	--owop98-minimizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAMUExURQAAAHhgWKiYkNjQyIAnpNMAAAA2SURBVAjXY/j///8BhlerVjngIRi0YASIezU01IEBBgwYRENDCxikVq3agIdo4IIRIC7Qyg8A16cwXYkUDJcAAAAASUVORK5CYII=);
	--owop98-maximizeButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAHhgWKiYkNjQyIAnpNMAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABDSURBVAjXY/j///8BhlerVjkwvGDgghGrujAJkARY3dXQUAcGGDBgEA0NLWCQWrVqA4MUAxOM0FqESYAlQOqAVn4AAFR2KcMjQNGcAAAAAElFTkSuQmCC);
	--owop98-restoreButton: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYAgMAAAC3qSTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAHhgWKiYkNjQyIAnpNMAAAAJcEhZcwAADr8AAA6/ATgFUyQAAABWSURBVAjXY/j///8BhlerVjlAiQYmING1yIHhBYMSkFjFBCK0QFwtqJKroaEODDBgwCAaGlrAILVq1QYosYABSCxaASQYOICEVgOI6AJxuaBKgFZ+AACu/ish+ru+3AAAAABJRU5ErkJggg==);
	--owop98-checkers: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADr8AAA6/ATgFUyQAAAAcSURBVBhXY/j//z/DjQsngBQqjVUQRNNex38GAPcdc5l+XU27AAAAAElFTkSuQmCC);
	--owop98-adminColor: #6a2525;
	--owop98-modColor: #395a28;
	--owop98-tellColor: #70612d;
	--owop98-linkColor: #3e4054;
	--owop98-redColor: #6a2525;
	--owop98-discordColor: #22446e;
	--owop98-blueColor: #7c81a9;
	--owop98-serverColor: #53345a;
}

	`;

	let cssCode = css;

	let colorSchemeNamesArray = [],
		colorSchemeNames = {};

	const setColorScheme = (id = colorSchemesDropdown.value) => {

		if (isInstalled) body.setAttribute('color-scheme', id);
		if (colorSchemesDropdown) colorSchemesDropdown.value = id;

		localStorage.setItem('owop98-ColorScheme', id);

	};

	const changeStyleCode = code => {

		cssCode = code;
		style.innerHTML = '';
		if (style.styleSheet) style.styleSheet.cssText = cssCode;
		else style.appendChild(document.createTextNode(cssCode));

	};

	const setSchemeCommand = params => {

		if (params.length < 1 || colorSchemeNamesArray.indexOf(params[0].toLowerCase()) < 0) {

			if (colorSchemeNamesArray.indexOf(params[0].toLowerCase()) < 0) owopChat.local('Invaild color scheme ID.');
			owopChat.local('Usage: /setscheme (color scheme ID)');
			owopChat.local('To see list of color schemes, type /schemes');

		} else if (colorSchemeNamesArray.indexOf(params[0].toLowerCase()) > -1) {

			setColorScheme(params[0]);
			owopChat.local(`Changed current color scheme to ${colorSchemeNames[params[0]]}.`);

		}

	};

	const schemesCommand = () => owopChat.local(`Color schemes: ${colorSchemeNamesArray.sort().join(', ')}`);

	const addColorSchemeOption = (name, id) => {

		if (typeof id == 'string') id = id.toLowerCase();
		if (typeof name !== 'string') name = id.charAt(0).toUpperCase() + id.toLowerCase().slice(1);

		if (Object.keys(colorSchemeNames).indexOf(id) < 0) {

			let colorScheme = document.createElement('option');
			colorScheme.value = id;
			colorScheme.innerHTML = name;
			colorSchemeNamesArray.push(id);
			colorSchemeNames[id] = name;

			colorSchemesDropdown.append(colorScheme);

			return true;

		} else return false;

	};

	const removeColorSchemeOption = id => {

		if (typeof id == 'string') id = id.toLowerCase();

		if (Object.keys(colorSchemeNames).indexOf(id) > -1) {

			if (colorSchemesDropdown.value == id) setColorScheme('default');

			if (colorSchemesDropdown.options.forEach) {

				colorSchemesDropdown.options.forEach(option => {

					if (option.value == id) option.remove();

				});

			} else {

				let i = 0;
				while (i < colorSchemesDropdown.options.length) {

					if (colorSchemesDropdown.options[i].value == id) colorSchemesDropdown.options[i].remove();
					i++;

				}

			}

			if (colorSchemeNamesArray.indexOf(id) > -1) colorSchemeNamesArray = colorSchemeNamesArray.filter(rid => rid !== id);
			if (typeof colorSchemeNames[id] !== 'undefined') delete colorSchemeNames[id];

			return true;

		} else return false;

	};

	let style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'owop-98';

	let colorSchemesLabel = document.createElement('div');
	colorSchemesLabel.id = 'owop-98-color-schemes-label';
	colorSchemesLabel.innerHTML = 'Color scheme:';

	let colorSchemesDropdown = document.createElement('select');
	colorSchemesDropdown.id = 'owop-98-color-schemes-dropdown';
	colorSchemesDropdown.name = 'owop-98-color-schemes';
	colorSchemesDropdown.onchange = () => setColorScheme(colorSchemesDropdown.value);

	addColorSchemeOption('Windows Classic (default)', 'default');
	addColorSchemeOption('Windows 93', 'win93');
	addColorSchemeOption('Windows Standard', 'winstandard');
	addColorSchemeOption('Dark', 'dark');
	addColorSchemeOption('Discord', 'discord');
	addColorSchemeOption('Wheat', 'wheat');
	addColorSchemeOption('Maple', 'maple');
	addColorSchemeOption('Windows Aero', 'winaero');
	addColorSchemeOption('OPM', 'opm');
	addColorSchemeOption('Marine', 'marine');
	addColorSchemeOption('Plum', 'plum');

	if (typeof localStorage['owop98-ColorScheme'] !== 'string') localStorage.setItem('owop98-ColorScheme', 'default');

	changeStyleCode(css);

	const chat = window.OPM.require('core-utils').chat;

	function install() {

		isInstalled = true;

		body.appendChild(style);
		helpContent.appendChild(colorSchemesLabel);
		helpContent.appendChild(colorSchemesDropdown);

		setColorScheme(localStorage['owop98-ColorScheme']);

		chat.registerCommand('setscheme', setSchemeCommand);
		chat.registerCommand('schemes', schemesCommand);

	}

	function uninstall() {

		isInstalled = false;

		if (typeof style.parentNode == 'object') style.parentNode.removeChild(style);
		if (typeof colorSchemesLabel.parentNode == 'object') colorSchemesLabel.parentNode.removeChild(colorSchemesLabel);
		if (typeof colorSchemesDropdown.parentNode == 'object') colorSchemesDropdown.parentNode.removeChild(colorSchemesDropdown);

		body.removeAttribute('color-scheme');

		chat.deregisterCommand('setscheme', setSchemeCommand);
		chat.deregisterCommand('schemes', schemesCommand);

	}

	return {

		install: install,
		uninstall: uninstall,
		setColorScheme: setColorScheme,
		changeStyleCode: changeStyleCode,
		addColorSchemeOption: addColorSchemeOption,
		removeColorSchemeOption: removeColorSchemeOption,

		get: {

			isInstalled: () => isInstalled,
			styleCode: () => cssCode,
			colorSchemeNames: () => colorSchemeNames,
			colorSchemeNamesArray: () => colorSchemeNamesArray

		},

		elements: {

			colorSchemesLabel: colorSchemesLabel,
			colorSchemesDropdown: colorSchemesDropdown

		}

	};

})();
