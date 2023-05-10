// ==UserScript==
// @name        opm but better
// @namespace   Violentmonkey Scripts
// @match       https://ourworldofpixels.com/
// @grant       none
// @version     1.0
// @author      Lapis
// @description 2/3/2022, 12:07:00 AM
// @run-at      document-start
// ==/UserScript==

let moduleList = []

let originalFunction = Object.defineProperty
Object.defineProperty = function() {
  let returnValue = originalFunction.call(originalFunction, ...arguments)
  let object = arguments[0]
  if (!object?.__esModule) return returnValue
  moduleList.push(object)
  if (moduleList.length === 1) {
    setTimeout(() => {
      finishedLoading()
    }, 0)
  }
  return returnValue
}

let modules = {}

function finishedLoading() {
  modules.bucket = moduleList.find(module => module.Bucket)
  modules.canvas_renderer = moduleList.find(module => module.unloadFarClusters)
  modules.captcha = moduleList.find(module => module.loadAndRequestCaptcha)
  modules.conf = moduleList.find(module => module.EVENTS)
  modules.context = moduleList.find(module => module.createContextMenu)
  modules.Fx = moduleList.find(module => module.PLAYERFX)
  modules.global = moduleList.find(module => module.PublicAPI)
  modules.local_player = moduleList.find(module => module.networkRankVerification)
  modules.main = moduleList.find(module => module.revealSecrets)
  modules.misc = moduleList.find(module => module.setCookie)
  modules.net = moduleList.find(module => module.net)
  modules.Player = moduleList.find(module => module.Player)
  modules.tools = moduleList.find(module => module.showToolsWindow)
  modules.windowsys = moduleList.find(module => module.windowSys)
  modules.World = moduleList.find(module => module.World)

  modules.events = modules.global.eventSys.constructor
  modules.all = moduleList //it's unsafe to access these by index as those values may change

  //set OWOP.net and prevent revealSecrets from removing it
  OWOP.net = modules.net.net
  modules.main.revealSecrets = () => {}

  //add OWOP.eventSys
  OWOP.eventSys = modules.global.eventSys

  //add OWOP.misc
  OWOP.misc = modules.main.misc

  //add OWOP.require
  OWOP.require = function getModule(name) {
    if (modules[name]) {
      return modules[name]
    } else {
      throw new Error(`No module by the name ${name}`)
    }
  }
}

