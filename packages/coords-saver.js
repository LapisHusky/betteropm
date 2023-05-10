(function() {
    function install() {
    let options = {
         closeable: true,
         moveable: true,
       }
   
       OWOP.chat.local("(C-S) Right click a coordinate name to delete it.")
   
       let coorJson = {}
     
       function windowFunc(wdw) {
        var divwindow = document.createElement("div")
        divwindow.style = "width: 395px; overflow-y: scroll; overflow-x: hidden; max-height: 150px;"
        divwindow.innerHTML = `<input id="cName" type="text" style="max-width: 100px; border: 0px;"  placeholder="Name"></input> <input id="cX" style="border: 0px; max-width: 60px;" type="number" placeholder="X"></input> <input id="cY" style="max-width: 60px; border: 0px;" type="number" placeholder="Y"></input>
        <button id="addCoord" >Add</button> <table id="coordTable" style="overflow-x: hidden; overflow-y: scroll;"> <tr> 
        <th style="padding: 5px; font-weight: 100; font-family: Arial; text-align: left; color: white;">Name</th> <th style="padding: 5px; font-weight: 100; font-family: Arial; text-align: left; color: white;">X</th> <th style="padding: 5px; font-weight: 100; font-family: Arial; text-align: left; color: white;">Y</th>
       </tr> </table>`
        wdw.addObj(divwindow)
       }
   
       var windowClass = new OWOP.windowSys.class.window("Coordinates Saver", options, windowFunc);
       OWOP.windowSys.addWindow(windowClass).move(window.innerHeight / 3, window.innerWidth / 3)
   
       class Coordinate {
           constructor(id) {
             this.id = id;
             coorJson = JSON.parse(localStorage.getItem("coorJson"))
             document.getElementById('coord-'+this.id).onmousedown = (mouse) => {
                 if (mouse.buttons == 2) {
                 document.getElementById('coord-'+this.id).outerHTML = '';
                 document.getElementById('x-'+this.id).outerHTML = '';
                 document.getElementById('y-'+this.id).outerHTML = '';
                 document.getElementById('im-busy'+this.id).outerHTML = '';
                 delete coorJson[this.id]
                 localStorage.setItem('coorJson', JSON.stringify(coorJson))
                 }
             }
             document.getElementById('coord-'+this.id).onclick = () => {
   
                 OWOP.camera.x = parseInt(document.getElementById('x-'+this.id).textContent) - (window.innerWidth  / OWOP.camera.zoom / 2.5);
                 OWOP.camera.y = parseInt(document.getElementById('y-'+this.id).textContent) - (window.innerHeight / OWOP.camera.zoom / 2.5);
                 OWOP.renderer.updateCamera();
             }
           }
       }
   
       var cName = document.getElementById("cName"),
               cX = document.getElementById("cX"),
               cY = document.getElementById("cY")
   
               cName.oninput = () => {
                   if (cName.value.length > 26) {
                    cName.style.backgroundColor = "rgb(255 148 129)"
                   } else if (cName.value.length < 25) {
                    cName.style.backgroundColor = "rgb(255, 255, 255)"
                   }
               }
   
       document.getElementById("addCoord").onclick = function() {
   
           if (cName.value.length > 25) return alert("Your max name length it's 25 characters.");
           if (cX.value.length == 0 || cY.value.length == 0 || cName.value.length == 0) return alert("Invalid Coordinates/Name");
   
           if (!localStorage.getItem("coorJson")) {
           coorJson[cName.value] = {
            "x": cX.value,
            "y": cY.value
           }
           localStorage.setItem("coorJson", JSON.stringify(coorJson))
           } else {
           coorJson = JSON.parse(localStorage.getItem("coorJson"))
           if (coorJson[cName.value]) {
               cName.value = "";
               cX.value = "";
               cY.value = "";
               return alert("You already have a coordinate with this name.")
           }
           coorJson[cName.value] = {
               "x": cX.value,
               "y": cY.value
           }
           localStorage.setItem("coorJson", JSON.stringify(coorJson))
           }
   
           var divCoord = document.createElement("tr")
           divCoord.id = `im-busy${cName.value}`
           divCoord.innerHTML = `<td id="coord-${cName.value}" style="cursor: pointer; padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${cName.value}</td> <td id="x-${cName.value}" style="padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${cX.value}</td> <td id="y-${cName.value}" style="padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${cY.value}</td>`
           document.getElementById("coordTable").appendChild(divCoord)
   
           new Coordinate(cName.value)

           cName.style.backgroundColor = "rgb(255 255 255)"
           cX.style.backgroundColor = "rgb(255 255 255)"
           cY.style.backgroundColor = "rgb(255 255 255)"
   
           cName.value = "";
           cX.value = "";
           cY.value = "";
       }
   
       if (localStorage.getItem("coorJson")) {
   
           var gettedJson = JSON.parse(localStorage.getItem("coorJson"))
           var obj = Object.keys(gettedJson)
           for (var i = 0; i < obj.length; i++) {
           var divCoord = document.createElement("tr")
           divCoord.id = `im-busy${obj[i]}`
           divCoord.innerHTML = `<td id="coord-${obj[i]}" style="cursor: pointer; padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${obj[i]}</td> <td id="x-${obj[i]}" style="padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${gettedJson[obj[i]].x}</td> <td id="y-${obj[i]}" style="padding: 5px; border: 1px solid white; border-radius: 5px; color: white;">${gettedJson[obj[i]].y}</td>`
           document.getElementById("coordTable").appendChild(divCoord)
           new Coordinate(obj[i])
           }
       }
    }
   
    function uninstall() {
       if (OWOP.windowSys.windows["Coordinates Saver"]) { //yes
       OWOP.windowSys.windows["Coordinates Saver"].close();
       } else {
       console.log("coordinates saver window not found, getting the fuck out of here")
       }
    }
    return {
       install: install,
       uninstall: uninstall
   };
   })()
