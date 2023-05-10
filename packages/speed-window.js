(function() {
	function install() {
        var valueFromStor = localStorage.getItem('player_speed')
        if (!valueFromStor) localStorage.setItem('player_speed', 1)

        var div = document.createElement('div')
        div.innerHTML = '<div id="backgroundd" style="transition: 1s; position: absolute; top: 24px; right: 50%; height: 32px; width: 256px; transform: translate(50%, -50%); border-radius: 6px; border: 3px #aba389 solid; background-color: #7e635c;">'+
        '<input id="checkboxx" type="checkbox" style="position: absolute; top: 6px; left: 6px;"></input> <input id="rangee" type="range" style="position: absolute; top: 6px; left: 25px; width: 190px; " value="1" min="1" max="64"></input> <p id="speedd" style="position: absolute; top: -8px; right: 12px; font-family: Arial; font-weight: bold; user-select: none; color: white;">1</p>'+
        '</div> <button id="showOrHideGui" style="transition: 1s; position: absolute; top: 45px; right: 50%; border: 0px; border-radius: 5px; font-family: Arial; font-size: 16px; background-color: black; color: white; transform: translate(50%, -50%); cursor: pointer;">Hide</button>'
        document.body.appendChild(div)

        var speedEnabled = false,
            myRangee = document.getElementById("rangee"),
            mySpeedd = document.getElementById("speedd"),
            gui = document.getElementById("backgroundd"),
            button = document.getElementById("showOrHideGui"),
            guiOpen = true;

            myRangee.value = valueFromStor
            mySpeedd.textContent = myRangee.value

        button.onclick = function() {
            if (guiOpen == true) {
            gui.style.top = '-24px';
            button.textContent = 'Show'
            button.style.top = '12px'
            guiOpen = false;
            } else {
            gui.style.top = '24px';
            button.textContent = 'Hide'
            button.style.top = '45px'
            guiOpen = true;
            }
        }

        document.getElementById("checkboxx").onchange = function() {
            if (speedEnabled == false) {
                speedEnabled = true;
                OWOP.options.movementSpeed = myRangee.value;
            } else {
                speedEnabled = false;
                OWOP.options.movementSpeed = 1;
            }
        }

        myRangee.oninput = function() {
        if (speedEnabled == true) OWOP.options.movementSpeed = myRangee.value;
        mySpeedd.textContent = myRangee.value
        localStorage.setItem('player_speed', myRangee.value)
        }

        document.getElementById("opm-header").onclick = function() {
          if (document.getElementById("opm").className == 'packages open') {
            if (gui && button) {
            gui.style.zIndex = '-32';
            button.style.zIndex = '-32';
            }
          } else if (document.getElementById("opm").className == 'packages') {
            if (gui && button) {
            gui.style.zIndex = '1';
            button.style.zIndex = '1';
            }
          }
        }
      }
	
      function uninstall() {
        document.getElementById("backgroundd").outerHTML = '';
        document.getElementById("showOrHideGui").outerHTML = '';
        localStorage.removeItem('player_speed')
        OWOP.options.movementSpeed = 1;
      }
      
      return {
        install: install,
        uninstall: uninstall
      };
    })()
