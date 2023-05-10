(() => { //Made with Help of Lapis for cheesing out the audio
  var audio = new Audio();
  function install() {
  var dragonImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACpCAMAAACxrjd4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQYGBgcHBwsAAAoKCgsLCy4DAyEhISUlJTIyMjMzMzQzMzg4ODs7Oz09PT8/P0BAQEFBQUNDQ0VFRUdGRkdHR0hISEpKSkxMTFJSUlNTU1dXV19fX2BfX2BgYGpqamtra3Vvb3FxcXJycnNzc3Rzc3R0dHV1dXh4eHl5eXp6epAKCpELC5QLC5oLC5kxMaEMDKsMDK4MDK8NDa8ODqIaGrMTE7ocHKU9LsgwFc85OdA6OtE7O+U7RKSkpK2treeYmO64sNjY2PvGxv39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEaBmdwAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAANs0lEQVR4Xs2bCZscNxVF2+wk7MHdkDHYAYwJxmwZlizDhMRM//9fFN6970qlUkkqqXqZnO+bLunp6elYra7uWbz76hHZvvjjae8MNcd5NG1Ydy1ezHskbUp3aNfyHkW7JjNHWYYCCY+gLZe2tlKAIjOuri0XQ4ECSnAUm3NtbbkYCizQcEThOdfVdpF38aBIDhPAu+8yrZJ3VW16OIpkaBDOTetralMjoNgMDbm0a2tkwfW0aUQlXBVM4LBBZQNtDS25ljaNpif/icITHOexZ1Lb+lrakGgJcZgJ/sikR9emBGwkpHCE48m/6h32NVjiGtp0AFFLA4Jju90POayNbkpfRVsaTt06PBsGuxotc3ltOhhxGzMjDx3sS9Id1pfXpsPNzS8TJY0QDu8Ohz1GppQ1rQtrU8Gsa9ocNmvTxtA7yli1uqw2FXY39/c3v/h5SZvDh/t7WPtYn/VltamAvb65OUzaGgzD94Zru7Kh8QaX1KbC++/zsv9ZFNOorG2vg7XBkMZbXFCbCimupdEwfLj3k+0govEml9OmFLAj8v4BNzg/uekworn110Gb59pO9uHwE0lpQTYtzMfhzb6cNgxu7B5idxFYH96bW6F5sAOyt+s+aCfjK1xKGwbBmtp7fOSIWhjmi5GHx6UHrC+lDQPzpTStD4cfJ15oSDsRR4PD61xGGwIQduC239spCVoYpjW1cU50l+m2uYg2BKjt92wRtdmL1vYv8o/XgNM7uIQ2BW5ueMkJw/ZynLS11f3Wl9N2eMt2OQ9o2ALBOtz+LLr8DrPGBbShBXiuJ+39jyxmYj4I7TAQrAdczq9NK/NN7yLGfv9TimFUb46OayOsAj1cRnt2xxb792CG0b3eHJ2vhzbWL1mHw22g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";
  var stations = {};
  var customs = {};
  var placeholderthing
  try {
    placeholderthing = localStorage.getItem("radioconfig")
  } catch (error) {
    console.error(error)
    placeholderthing = null
  }
  async function fetchData() {
    stations = await fetch('https://raw.githubusercontent.com/Flawed-8230/RadioCDN/main/station2.json').then(body => body.json());
    if(placeholderthing !== null) customs = await fetch(localStorage.getItem("radioconfig")).then(body => body.json())
  }
  fetchData();
  var rad = 0
  var j
  var prev = 0
  var cname = 'Radio OFF';
  var loop = 0;
  var clink = null;
  var prevname = null
  var prevlink = null
  audio.volume = 1.0
  audio.style.display = "none";
  audio.autoplay = true;
  
  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function playnew(rv) { //play song
  rad = rv
  switch (rad) { //check station and generate song
    case 1:
      j = random(0, stations.rnv.length - 1);
      clink = stations.rnv[j]['url'];
      cname = stations.rnv[j]['name'];
      break;
    case 2:
      j = random(0, stations.odr.length - 1);
      clink = stations.odr[j]['url'];
      cname = stations.odr[j]['name'];
      break;
    case 3:
      j = random(0, stations.csr.length - 1);
      clink = stations.csr[j]['url'];
      cname = stations.csr[j]['name'];
      break;
    case 4:
      if(placeholderthing == null) return console.error("No station loaded")
      j = random(0, customs.crs.length - 1)
      clink = customs.crs[j]['url'];
      cname = customs.crs[j]['name'];
    default:
      break;
  }
    if (prev == 1 || loop == 1) {clink = prevlink; cname = prevname; prev = 0}
    var url = clink
    audio.src = url;
    k.innerHTML = `Now Playing: ${cname}`;
    audio.onended = function () {
      prevlink = clink
      prevname = cname
      playnew(rad)
    }
  }
  
  function stopPlaying(stp) {
    if(stp == true) audio.url = ""; closed = 1
    audio.pause()
  }
  
  OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Sajvnczeid Radio!", {
    closeable: false,
    moveable: true
  }, h => {
    WINDOW = h;
    
    h.titlespan.innerHTML = `<img src="${dragonImg}" width='30px' height='30px'></img>Sajvnczeid Radio!`
    h.container.style.color = "white";
    h.container.innerHTML = `
          <span>Stations:</span>
          <select id='statio'>
          <option value="" selected disabled hidden>Choose Station</option>
          <option value="1">Radio New Vegas</option>
          <option value="2">Daydun Radio</option>
        <option value="3">Radio Sajvnczeid</option>
        <option value="4">Custom Station</option>
        </select> <span>Custom Input:</span> <input id="CON" style="width: 150px;border: solid 1px;background-color: #67524d"; placeholder:"JSON File URL"></input>
          <div>
              <div>
              <span>Controls:</span>
              <button id="PP">▶</button>
              <button id="OFF">⏹</button>
              <button id="PV">⏮</button>
              <button id="NX">⏭</button>
              <button id="LP">🔁</button>
              <button id="C">Credits</button>
              <button id="CLS"; title="Close">❌</button><br>
              <span id="volid">Volume: ${audio.volume}</span><br><input type="range" id="VL" name="Volume"
              min="0" max="1" step="0.1" value="1.0">
              <br>
              <h2 id="h1">Now Playing: ${cname}</h2></div>
          `; //add extra buttons and eventlisteners to make more stations!
  }).move(900, 500));
  let cont = document.getElementById("VL")
  let con = document.getElementById('CON')
  let statio = document.getElementById('statio')
  let k = document.getElementById('h1')
  k.style.maxWidth="460px"
  k.style.overflow="hidden"
  k.style.animation="scroll-left"
  con.onchange = function() {
    var lsthing1 = localStorage.getItem("radioconfig")
    if(lsthing1 == null) {localStorage.setItem("radioconfig", con.value)}
    if(!con.value.endsWith('.json')) return alert('This isnt a JSON Link')
    placeholderthing = "not null"
    localStorage.setItem("radioconfig", con.value)
    fetchData()
  }
  
  document.getElementById("NX").addEventListener("click", () => {
    prevlink = clink
    prevname = cname
    stopPlaying()
    playnew(rad)
  });
  
  cont.oninput = function() {
    audio.volume = cont.value
    document.getElementById("volid").innerHTML = `Volume: ${audio.volume.toFixed(1)}`
  };
  
  statio.oninput = function() {
      prevlink = clink
    prevname = cname
    stopPlaying()
    if(statio.value !== 0) playnew(Number(statio.value))
     else {audio.url = ""; h.innerHTML=`Now Playing: Radio OFF`}
  }
  
  document.getElementById("PV").addEventListener("click", () => {
    prev = 1
    stopPlaying()
    playnew(rad)
  });
  
  document.getElementById("LP").addEventListener("click", () => {
    var s = 0;
    if (loop == 0) { loop = 1; s = 1 }
    if (loop == 1 && s == 0) { loop = 0; clink = null; clink = null }
  });
  
  document.getElementById("PP").addEventListener("click", () => {
    audio.play(); document.getElementById("volid").innerHTML = `Volume: ${audio.volume.toFixed(1)}`; document.getElementById("h1").innerHTML = `Now Playing: ${cname}`
  });
  
  document.getElementById("OFF").addEventListener("click", () => {
    stopPlaying(true)
    k.innerHTML = `Now Playing: Radio Stopped`
  });
  
  document.getElementById("CLS").addEventListener("click", () => {
    stopPlaying()
    OWOP.windowSys.windows['Sajvnczeid Radio!'].container.outerHTML = "";
    OWOP.windowSys.windows['Sajvnczeid Radio!'].frame.outerHTML = "";
  });
  
  
  document.getElementById("C").addEventListener("click", () => {
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Credits!", {
      closeable: true,
      moveable: true
    }, r => {
      WINDOW = r;
      r.container.style.color = "white";
      r.container.innerHTML = `
            <p>Radio Developed by Drakevskiy C. Sajvnczeid with help from Lapis</p>`
    }).move(850, 500));
  });
  }
function uninstall() {
try {
  audio.pause()
} catch (error) {
  console.error
}
OWOP.windowSys.windows['Sajvnczeid Radio!'].container.outerHTML = "";
OWOP.windowSys.windows['Sajvnczeid Radio!'].frame.outerHTML = "";
}
return {
  install,
  uninstall
};
})()
