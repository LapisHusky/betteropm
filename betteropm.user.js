// ==UserScript==
// @name        betteropm
// @namespace   Violentmonkey Scripts
// @match       https://ourworldofpixels.com/*
// @grant       none
// @version     1.2
// @author      Lapis
// @description 5/9/2023, 12:07:00 AM
// @run-at      document-start
// ==/UserScript==

//this uses https://github.com/LapisHusky/betteropm to download scripts, json, and images. you may make pull requests there to change/add packages.
const filesURLBase = localStorage.OPMFilesURL || "https://raw.githubusercontent.com/LapisHusky/betteropm/main/"

let worldJoinPromiseResolve
let worldJoinPromise = new Promise(r => {
    worldJoinPromiseResolve = r
})

let modules = {}

let opmModule = {
    get Opm() {
        console.warn(`something tried to get OWOP.require("opm").Opm, this is unsupported`)
        return () => { }
    }
}

function finishedLoading() {
    //attempt to find which modules are which
    modules.canvas_renderer = {
        // ...OWOP.renderer,
        camera: OWOP.camera,
        centerCameraTo: OWOP.camera.centerCameraTo,
        moveCameraBy: OWOP.camera.moveCameraBy,
        moveCameraTo: OWOP.camera.moveCameraTo,
        isVisible: OWOP.camera.isVisible,
        renderer: OWOP.renderer
    }
    // modules.captcha = moduleList.find(module => module.loadAndRequestCaptcha)
    modules.conf = {
        protocol: OWOP.protocol,
        RANK: OWOP.RANK,
        EVENTS: OWOP.events,
        options: OWOP.options
    }
    modules.context = OWOP.context
    modules.Fx = {
        WORLDFX: OWOP.fx.world,
        PLAYERFX: OWOP.fx.player,
        Fx: OWOP.fx.class,
        activeFx: OWOP.activeFx
    }
    modules.global = {
        ...OWOP.global,
        PublicAPI: OWOP
    }
    // modules.local_player = moduleList.find(module => module.networkRankVerification)
    modules.main = {
        showDevChat: OWOP.showDevChat,
        showPlayerList: OWOP.showPlayerList,
        statusMsg: OWOP.statusMsg,
        sounds: OWOP.sounds,
        misc: OWOP.misc,
        elements: OWOP.elements,
        mouse: OWOP.mouse
    }
    // modules.Player = moduleList.find(module => module.Player)
    modules.windowsys = {
        ...OWOP.windowSys,
        windowSys: OWOP.windowSys,
        UtilInput: OWOP.windowSys.class.input,
        UtilDialog: OWOP.windowSys.class.dialog,
        OWOPDropDown: OWOP.windowSys.class.dropDown,
        GUIWindow: OWOP.windowSys.class.window,
    }
    // modules.World = moduleList.find(module => module.World)
    modules.events = OWOP.global.eventSys.constructor
    //modules not in https://opm.dimden.dev/docs/ but still work in OPM's OWOP.require()
    //some of these are just useless nonsense like polyfill/canvas-toBlob and protocol/v0x00 and they've been omitted
    modules.networking = {
        net: OWOP.net
    }
    modules.tools = OWOP.tools
    // modules.tool_renderer = moduleList.find(module => module.cursors)
    modules["protocol/Protocol"] = OWOP.Protocol;
    // modules["protocol/all"] = moduleList.find(module => module.definedProtos)
    // modules["protocol/old"] = moduleList.find(module => module.OldProtocol)
    modules["util/Bucket"] = OWOP.Bucket
    modules["util/Lerp"] = OWOP.Lerp
    modules["util/anchorme"] = undefined;
    // modules["util/misc"] = moduleList.find(module => module.setCookie)
    // modules["util/color"] = moduleList.find(module => module.colorUtils)
    // modules["util/normalizeWheel"] = moduleList.find(module => module.normalizeWheel)
    modules.opm = opmModule;

    //add OWOP.eventSys
    OWOP.eventSys = modules.global.eventSys

    //set OWOP.tool because apparently OPM puts it there instead of OPM.tools
    OWOP.tool = OWOP.tools

    //add OWOP.require
    OWOP.require = function getModule(name) {
        if (name.endsWith(".js")) name = name.substring(0, name.length - 3)
        if (modules[name]) return modules[name]
        throw new Error(`No module by the name ${name}`)
    }

    //world join promise - triggers loading OPM further
    OWOP.once(OWOP.events.net.world.join, worldJoinPromiseResolve)
}

let style = document.createElement('style')
style.innerHTML = `
/* CSS fixes for OPM differences */
@font-face {
    font-family: mc;
    src: url(https://cdn.glitch.com/4ff37d62-fd30-4a0b-ab75-481ff6be5f5f%2Fru.ttf?v=1578477186149) format('truetype')
}
.whitetext, #chat, #dev-chat, .top-bar {
    color: #FFF;
	font: 16px pixel-op, sans-serif;
	text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
}
#top-bar, #palette {
	position: absolute;
	pointer-events: none;
	transform: translateY(-100%);
	transition: transform 0.75s;
}
#top-bar {
	width: 100%;
}
.top-bar {
	position: relative;
	top: -4px;
    margin-right: 15px;
}
#palette-create, #palette, .framed, .top-bar {
	border: 5px #aba389 solid;
	-o-border-image: url(${filesURLBase}client/img/small_border.png) 5 repeat;
	   border-image: url(${filesURLBase}client/img/small_border.png) 5 repeat;
	border-image-outset: 1px;
	background-color: #7e635c;
	box-shadow: 0px 0px 5px #000;
}
#xy-display {
	padding-left: 2px;
	left: -4px;
	float: left;
    position: relative;
}
#playercount-display {
	right: -4px;
	float: right;
    position: relative;
}

/* General */

#opm p {
	margin-top: 0;
}
#opm a {
	color: #52d6ff;
}
#opm button {
	box-sizing: border-box;
	border: 1px solid rgba(0, 0, 0, 0.5);
	border-radius: 3px;
	padding: 6px 8px;
	font: 16px pixel-op, sans-serif;
	color: #fff;
	text-shadow: 0 1px 0px #000;
}
#opm input,
#opm textarea,
#opm select {
	margin-bottom: 8px;
	padding: 4px;
	background-color: #867050;
	border: 1px solid rgba(0, 0, 0, 0.5);
	border-radius: 3px;
	color: #fff;
	font: 16px pixel-op, sans-serif;
	transition: border-color 200ms;
}
#opm input::-webkit-input-placeholder,
#opm textarea::-webkit-input-placeholder {
	color: rgba(255, 255, 255, 0.5);
}
#opm input::-moz-placeholder,
#opm textarea::-moz-placeholder {
	color: rgba(255, 255, 255, 0.5);
}
#opm input:-ms-input-placeholder,
#opm textarea:-ms-input-placeholder {
	color: rgba(255, 255, 255, 0.5);
}
#opm input::-ms-input-placeholder,
#opm textarea::-ms-input-placeholder {
	color: rgba(255, 255, 255, 0.5);
}
#opm input::placeholder,
#opm textarea::placeholder {
	color: rgba(255, 255, 255, 0.5);
}
#opm input:focus,
#opm textarea:focus,
#opm select:focus {
	outline: none;
	border-color: #d8d8d8;
}

/* OPM container */

#opm {
	display: flex;
	flex-direction: column;

	position: absolute;
	bottom: 0;
	left: 450px;
	width: 48px;
	height: 48px;
	margin: 8px;

	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 4px;
	background-color: #b99664;
	color: #fff;
	text-shadow: 0 1px 0px #000;

	overflow: hidden;
	transition: width 300ms, height 300ms, transform 0.75s;
	transition-timing-function: ease-in-out;

	/* transform: translateY(200%); */
}
#opm.open {
	width: 600px;
	height: 600px;
}
#opm > header {
	position: relative;
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	z-index: 3;
	cursor: pointer;
}

#opm > header > .title {
	position: absolute;
	width: 100%;
	left: 0;
	line-height: 32px;
	text-align: center;
	z-index: -1;
}
#opm-bal {
	float: right;
	font-size: 0;
	display: none;
}
#opm.open #opm-bal {
	display: block;
}
#opm-user-balance {
	padding: 4px 8px;
	background-color: #826771;
	border: 1px solid rgba(0, 0, 0, 0.4);
	border-right: none;
	border-radius: 4px 0 0 4px;
	font-size: 16px;
}
button#opm-deposit-btn {
	background-color: #e0c35a;
	padding: 7px 11px;
}
#opm > main {
	display: none;
	flex: 1;
	background-color: rgba(0, 0, 0, 0.1);
}

#opm.login > #opm-login-tab { display: block; }
#opm.packages > #opm-packages-tab { display: block; }
#opm.details > #opm-details-tab { display: block; }
#opm.upload > #opm-upload-tab { display: flex; }
#opm.deposit > #opm-deposit-tab { display: flex; }

/***********
* Packages *
***********/

#opm-packages-tab {
	overflow-y: scroll;
}
#opm-packages {
	padding: 8px;
	margin: 0;
	list-style: none;
}
#opm-packages > li {
	display: flex;
	position: relative;
	margin-bottom: 8px;
	background-color: #caa87a;
	border: 1px solid rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 200ms;
}
#opm-packages > li:hover {
	background-color: #d4b181;
}
#opm-packages > li > img {
	width: 128px;
	height: 128px;
	background-size: 128px 128px;
	background-repeat: no-repeat;
}
#opm-packages > li > .body {
	flex: 1;
	display: flex;
	flex-direction: column;
}
#opm-packages > li > .body > header > .title {
	display: inline-block;
	margin: 4px 8px;
	font-size: 32px;
}
#opm-packages > li > .body > header > .version {
	color: #948270;
}
#opm-packages > li > .body > header > .author {
	float: right;
	margin-top: 8px;
	margin-right: 8px;
	background-color: rgba(0, 0, 0, 0.2);
	padding: 6px 8px;
	border-radius: 3px;
}
#opm-packages > li > .body > .description {
	flex: 1;
	margin: 0 8px;
}
#opm-packages > li > .body > footer {
	padding: 8px;
}
#opm-packages > li > .body > footer > .categories {
	display: inline-block;
	padding: 0;
	margin: 0;
	list-style: none;
}
#opm-packages > li > .body > footer > .categories > li {
	display: inline-block;
	margin-right: 8px;
	padding: 6px;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 3px;
}
#opm-packages > li > .body > footer > .install {
	float: right;
	background-color: #73b551;
}

#opm-packages > li > .body > footer > .buy {
    float: right;
    background-color: #a768b5;
}

#opm-packages > li > .body > footer > .uninstall {
	float: right;
	background-color: #7c81a9;
}

#opm-packages > li > .body > footer > .unavailable {
	float: right;
	background-color: #ad4242;
}
#opm-packages > li > .body > footer > .downloads {
	float: right;
	margin: 6px;
}
#opm-packages > li > .body > footer > .downloads::before {
	content: "";
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: sub;
	margin-right: 4px;
	background-image: url(${filesURLBase}client/img/downloads-icon.png);
	opacity: 0.4;
}

#opm-packages > button {
	display: block;
	width: 100%;
	padding: 8px;
	background-color: #73b551;
}
`

let htmlText = `
<div id="opm" class="packages">
<header id="opm-header">
<img src="${filesURLBase}client/img/opm-2.png" />
<span class="title">OWOP Package Manager 2</span>
</header>
<main id="opm-packages-tab">

<ul id="opm-packages"></ul>
</main>
<main id="opm-details-tab"></main>
</div>
`

let user = {
    name: "you",
    balance: 0,
    installed: [],
    boughtScripts: ["polybius", "pixel-paste", "image-uploader", "crimson-client", "minibot-client"],
    locale: "en-US"
}
if (localStorage.OPMInstalled) user.installed = JSON.parse(localStorage.OPMInstalled)
function saveInstalled() {
    localStorage.OPMInstalled = JSON.stringify(user.installed)
}

function unstrictEval(text) {
    return eval(text)
}

class PackageItem {
    constructor(data) {
        this.name = data.name
        this.version = data.version
        this.author = data.author
        this.description = data.description
        this.categories = data.categories
        this.dependencies = data.dependencies
        this.downloads = data.installs
        this.cost = data.cost
        this.sale = data.sale
        this.installed = false
        this.installPromise = null
        this.bought = true
        this.unavailable = data.unavailable
        this.element = document.createElement("li")

        let thumbnail = document.createElement("img")
        if (data.noThumb) {
            thumbnail.src = filesURLBase + "client/img/placeholder.png"
        } else {
            thumbnail.src = filesURLBase + `packages/${this.name}/thumb.png`
        }
        this.element.appendChild(thumbnail)

        let mainDiv = document.createElement("div")
        mainDiv.className = "body"
        mainDiv.id = `opm-package-${this.name}`
        if (this.name === "polybius") mainDiv.style.background = "rgb(0 15 17 / 90%)"
        if (this.name === "crimson-client") mainDiv.style.background = "#2e0f0f"

        let header = document.createElement("header")
        let title = document.createElement("span")
        title.className = "title"
        title.textContent = this.name
        header.appendChild(title)
        let version = document.createElement("span")
        version.className = "version"
        version.textContent = this.version
        header.appendChild(version)
        let author = document.createElement("span")
        author.className = "author"
        author.textContent = this.author
        header.appendChild(author)
        mainDiv.appendChild(header)

        let description = document.createElement("p")
        description.className = "description"
        description.textContent = this.description
        mainDiv.appendChild(description)

        let footer = document.createElement("footer")
        let categories = document.createElement("ul")
        categories.className = "categories"
        for (let i = 0; i < this.categories.length; i++) {
            let category = document.createElement("li")
            category.textContent = this.categories[i]
            categories.appendChild(category)
        }
        footer.appendChild(categories)

        this.installBtn = document.createElement("button")
        this.installBtn.addEventListener("click", () => {
            if (this.unavailable) return
            if (this.installed) {
                this.uninstall()
            } else {
                this.install()
            }
        })
        this.setInstalled(this.unavailable ? "unavailable" : false)
        footer.appendChild(this.installBtn)

        this.downloadIndicator = document.createElement("span")
        this.downloadIndicator.className = "downloads"
        this.downloadIndicator.textContent = this.downloads
        footer.appendChild(this.downloadIndicator)

        mainDiv.appendChild(footer)
        this.element.appendChild(mainDiv)
    }

    setInstalled(value) {
        if (value === "unavailable") {
            this.installBtn.className = "unavailable"
            this.installBtn.textContent = "Unavailable"
            return
        }
        this.installBtn.className = value ? "uninstall" : "install"
        this.installBtn.textContent = value ? "Uninstall" : "Install"
    }

    async install() {
        if (this.unavailable) return
        if (this.installed) return
        if (this.installPromise) return this.installPromise //if this is already being loaded, wait for the current loading function to finish
        let resolve
        this.installPromise = new Promise(r => {
            resolve = r
        })
        this.setInstalled(true)
        for (let dependency of this.dependencies) {
            let dependencyPackageItem = opmPackages.find(pack => pack.name === dependency)
            //create an array of promises for installing each dependency, this allows dependency scripts to be downloaded in parallel
            let installPromises = []
            if (!dependencyPackageItem.installed) {
                installPromises.push(dependencyPackageItem.install())
            }
            await Promise.all(installPromises)
        }
        if (!this.module) {
            let script = await fetch(filesURLBase + `packages/${this.name}/main.js`)
            script = await script.text()
            this.module = unstrictEval(script)
        }
        this.module.install()
        //if this is a dependency, it may not be in the user's installed package list, so we add it here
        if (!user.installed.includes(this.name)) {
            user.installed.push(this.name)
            saveInstalled()
        }
        this.installed = true
        resolve()
        this.installPromise = null
    }

    uninstall() {
        if (!this.installed) return
        //check if any other installed packages require this package to be installed
        let usedBy = []
        for (let packageItem of opmPackages) {
            if (!packageItem.installPromise && !packageItem.installed) continue
            if (!packageItem.dependencies.includes(this.name)) continue
            usedBy.push(packageItem.name)
        }
        if (usedBy.length > 0) {
            alert(`This library is being used by other packages. Please uninstall them first: ${usedBy.join(", ")}`)
            return
        }
        this.setInstalled(false)
        this.installed = false //do these 3 lines first in case uninstalling throws an error or in the case of core-utils, alerts and someone refreshes
        user.installed.splice(user.installed.indexOf(this.name), 1)
        saveInstalled()
        this.module.uninstall()
    }
}

async function startOPM() {
    //setup base opm html/css
    document.head.appendChild(style)
    document.body.insertAdjacentHTML("beforeend", htmlText);
    document.getElementById("opm-header").addEventListener("click", function () {
        document.getElementById("opm").classList.toggle("open")
    })

    //setup package list
    let res = await fetch(filesURLBase + "packages.json")
    let packages = await res.json()
    for (let package of packages) {
        opmPackages.push(new PackageItem(package))
    }
    updatePackageList()

    //change the top bar to opm's element structure
    //this has been changed a bit since topright-displays was added, dinfo-display and playercount-display will be kept within their separate topright-displays element
    {
        let xyDisplay = document.getElementById("xy-display")
        xyDisplay.className = "top-bar"
        xyDisplay.parentElement.removeChild(xyDisplay)
        let topBar = document.createElement("div")
        topBar.id = "top-bar"
        topBar.style.transform = "initial"
        topBar.appendChild(xyDisplay)
        document.body.appendChild(topBar)
    }

    //add bigChatToggle
    {
        document.querySelector('div.content').insertAdjacentHTML('beforeend', `<label><input id="big-chat" type="checkbox">Big chat</label>`)
        let bigChat = document.getElementById("big-chat")
        let options = OWOP.require("conf").options
        bigChat.addEventListener("change", function () {
            options.bigChat = bigChat.checked
            if (options.bigChat) {
                document.getElementById("chat").style.width = "850px"
                document.getElementById("chat").style.maxWidth = "850px"
                document.getElementById("opm").style.left = "150px"
                localStorage.bigChat = "1"
            } else {
                document.getElementById("chat").style.width = "450px"
                document.getElementById("chat").style.maxWidth = "450px"
                document.getElementById("opm").style.left = "450px"
                delete localStorage.bigChat
            }
        })
        if (localStorage.bigChat) {
            bigChat.checked = true
            document.getElementById("chat").style.width = "850px"
            document.getElementById("chat").style.maxWidth = "850px"
            document.getElementById("opm").style.left = "150px"
        }
    }

    //fix tools window so it grows properly
    {
        let owopTools = OWOP.require('tools')
        let original = OWOP.tools.updateToolbar
        let newFunction = function () {
            Reflect.apply(original, this, arguments)
            let container = owopTools.toolsWindow.container
            container.style.maxWidth = 40 * Math.ceil(container.children.length / 8) + "px"
        }
        OWOP.tools.updateToolbar = newFunction
        owopTools.updateToolbar = newFunction

        //OWOP.tools.addToolObject in the original script only calls the internal updateToolbar, which doesn't have window resizing. This extra layer replaces addToolObject so resizing gets done.
        //without this function getting replaced, the tool window remains 1 unit wide if plugins add tools totaling to 9.
        //with it, the tool window gets properly resized to 2 units when plugins add tools to 9.
        let originalAdd = OWOP.tools.addToolObject
        let newAddFunction = function () {
            Reflect.apply(originalAdd, this, arguments)
            let container = owopTools.toolsWindow.container
            container.style.maxWidth = 40 * Math.ceil(container.children.length / 8) + "px"
        }
        OWOP.tools.addToolObject = newAddFunction
        owopTools.addToolObject = newAddFunction
    }

    //add missing elements in publicAPI
    {
        OWOP.elements.bigChatToggle = document.getElementById("big-chat")
        OWOP.elements.opm = document.getElementById("opm")
        OWOP.elements.topBar = document.getElementById("top-bar")
    }

    //add "update" to Bucket
    {
        let bucketModule = OWOP.require("util/Bucket")
        let original = bucketModule.Bucket
        let updateFn = function () {
            this.allowance += (Date.now() - this.lastCheck) / 1e3 * (this.rate / this.time), this.lastCheck = Date.now(), this.allowance > this.rate && (this.allowance = this.rate)
        }
        bucketModule.Bucket = function () {
            let bucket = Reflect.construct(original, arguments)
            bucket.__proto__.update = updateFn
            return bucket
        }
        //add update to intial existing buckets too
        OWOP.net.protocol.placeBucket.__proto__.update = updateFn
        OWOP.net.protocol.chatBucket.__proto__.update = updateFn
    }

    //prevent showPlayerList and showDevChat from being called by the rank event handler
    {
        let mainModule = OWOP.require("main")
        let originalShowPlayerList = mainModule.showPlayerList
        let originalShowDevChat = mainModule.showDevChat
        originalShowDevChat(true) //just throwing this in here to always show it, unsure if it works
        mainModule.showPlayerList = function () {
            let stack = new Error().stack
            let line = stack.split("\n")[2]
            if (line && line.includes("app") && line.includes(".js")) return
            Reflect.apply(originalShowPlayerList, this, arguments)
        }
        mainModule.showDevChat = function () {
            let stack = new Error().stack
            let line = stack.split("\n")[2]
            if (line && line.includes("app") && line.includes(".js")) return
            Reflect.apply(originalShowDevChat, this, arguments)
        }
    }

    //switch createContextMenu over to the function OPM uses, i'm too lazy to clean this up but it mostly works
    {
        OWOP.require("context").createContextMenu = function (t, e, n) {
            var r = !1;
            r && i();
            var o = document.createElement("div");
            o.className = "context-menu";

            o.innerHTML = "";
            for (var a = 0; a < n.length; a++) {
                var s = document.createElement("button");
                s.textContent = n[a][0], s.addEventListener("click", n[a][1]), o.appendChild(s)
            }
            document.body.appendChild(o), r = !0;
            var c = o.offsetHeight; var date = Date.now();
            console.log(o), e + c > window.innerHeight - 20 ? o.style.top = e - c + "px" : o.style.top = e + "px";
            o.style.left = t + "px", document.addEventListener("click", E => { i(E, date) })


            function i(t, date) {
                var da = Date.now();
                if (da - date <= 10) return;
                o.remove(), document.removeEventListener("click", i), r = !1
            }
        }
    }

    //add OWOP.camera.x and y setters
    {
        let renderer = OWOP.require("canvas_renderer")
        OWOP.camera.__defineSetter__("x", value => {
            renderer.moveCameraTo(value, OWOP.camera.y)
        })
        OWOP.camera.__defineSetter__("y", value => {
            renderer.moveCameraTo(OWOP.camera.x, value)
        })
    }

    //TODO: override some of the canvas renderer so renderPlayerId and drawText can be exposed in OWOP.require("canvas_renderer").renderer
    //currently renderPlayerId is part of renderPlayer which seems to not be included in the public api?
    //this may require major replacing and not much uses it, so i'm not bothering with it right now

    //create global OPM
    window.OPM = {
        element: document.getElementById("opm"),
        packList: document.getElementById("opm-packages"),
        packages: opmPackages,
        PackageItem,
        tab: "packages",
        uploadButton: null,
        uploadScript: null,
        uploadThumbnail: null,
        user,
        attemptLogin: () => { },
        constructor: () => { },
        loggedIn: () => { },
        reloadPackages: () => { },
        require: name => {
            return opmPackages.find(pack => pack.name === name).module
        },
        switchTab: () => { },
        updatePackageList
    }

    //add PakcageItem = OWOP.require("opm")
    opmModule.PackageItem = PackageItem

    //wait until we're in the world before installing packages because some stuff seems to require that, then install packages
    await worldJoinPromise
    for (let packageName of user.installed) {
        let packageItem = opmPackages.find(pack => pack.name === packageName)
        if (packageItem) packageItem.install()
    }
}

let opmPackages = []

function updatePackageList() {
    let packList = document.getElementById("opm-packages")
    while (packList.firstChild) {
        packList.removeChild(packList.firstChild)
    }
    for (let package of opmPackages) {
        packList.appendChild(package.element)
    }
}

addEventListener("load", () => {
    finishedLoading()
    startOPM()
})
