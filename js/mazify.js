
AFRAME.registerComponent("mazify", {

    init: function () {
        let mazeData = {
            data: [
                'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr',
                'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr',
                'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr',
                'gr', 'gr', 'st', 'gr', 'gr', 'gr', 'gr',
                'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr',
                'gr', 'ft', 'gr', 'gr', 'gr', 'pi', 'gr',
                'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr'],
            height: 7,
            width: 7,
        }

        //if (sessionStorage.getItem("maze-data") != undefined) {
        //    mazeData = JSON.parse(sessionStorage.getItem("maze-data"));
        //}
        //get url 
        const queryString = window.location.search;
        //decode url
        const decoded = decodeURI(queryString);
        //replace characters in url
        const newdata = "{" + decoded.replace(/[?]/gi, "").replace(/&/gi, ",").replace(/=/gi, ":") + "}";
        console.log(newdata);
        console.log(JSON.parse(newdata));
        if (JSON.parse(newdata) !== undefined
        ) {
            mazeData = JSON.parse(newdata)
        }

        let maze = this.el;

        const maze_size = 3;
        const maze_height = 12;
        const el = maze;

        for (var x = 0; x < mazeData.height; x++) {
            for (var y = 0; y < mazeData.width; y++) {

                const i = (y * mazeData.width) + x;

                const position = {
                    x: ((x - (mazeData.width / 2)) * maze_size),
                    y: 1.5,
                    z: (y - (mazeData.height / 2)) * maze_size
                };

                //if (mazeData.data[i] >= 1 && mazeData.data[i] <= 2) {
                //wall    
                if (mazeData.data[i] == 'wa') {
                    let wall = document.createElement('a-box');
                    el.appendChild(wall);
                    wall.setAttribute('width', maze_size);
                    wall.setAttribute('height', maze_height);
                    wall.setAttribute('depth', maze_size);
                    wall.setAttribute('position', position);
                    wall.setAttribute('color', '#fff');
                    wall.setAttribute('material', 'src: #brick-01; repeat: 1.5 6');
                    wall.setAttribute('static-body', '');
                    wall.setAttribute('roughness', '1');
                }
                //start
                else if (mazeData.data[i] == 'st') {
                    let tile = document.createElement('a-box');
                    el.appendChild(tile);
                    tile.setAttribute('width', maze_size);
                    tile.setAttribute('height', 2);
                    tile.setAttribute('depth', maze_size);
                    tile.setAttribute('position', { x: position.x, y: -1, z: position.z });
                    tile.setAttribute('material', 'src: #start');
                    tile.setAttribute('static-body', '');
                    tile.setAttribute('id', 'start-tile');
                    let player = document.querySelector("#player");
                    let playerPos = player.getAttribute("position");
                    player.setAttribute('position', { x: position.x, y: playerPos.y, z: position.z })
                }
                //finish
                else if (mazeData.data[i] == 'ff') {
                    let tile = document.createElement('a-box');
                    el.appendChild(tile);
                    tile.setAttribute('width', maze_size);
                    tile.setAttribute('height', 0.1);
                    tile.setAttribute('depth', maze_size);
                    tile.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    tile.setAttribute('material', 'src: #finish');
                    tile.setAttribute('id', 'finish');
                    tile.setAttribute('static-body', '');
                }
                //finish banana
                else if (mazeData.data[i] == 'ft') {
                    let tile = document.createElement('a-gltf-model');
                    let floor = document.createElement('a-box');
                    el.appendChild(tile);
                    tile.setAttribute('id', 'finish-tile');
                    tile.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    tile.setAttribute('src', '#bananas');
                    tile.setAttribute('animation-mixer', '');
                    tile.setAttribute('static-body', '');
                    el.appendChild(floor);
                    floor.setAttribute('width', maze_size);
                    floor.setAttribute('height', 2);
                    floor.setAttribute('depth', maze_size);
                    floor.setAttribute('position', { x: position.x, y: -1, z: position.z });
                    floor.setAttribute('material', 'src: #grd');
                    floor.setAttribute('roughness', '1');
                }
                //pit
                else if (mazeData.data[i] == 'pi') {
                    let pit = document.createElement('a-box');
                    el.appendChild(pit);
                    pit.setAttribute('width', maze_size);
                    pit.setAttribute('height', 2);
                    pit.setAttribute('depth', maze_size);
                    pit.setAttribute('position', { x: position.x, y: -1, z: position.z });
                    pit.setAttribute('material', 'src: #grd');
                    pit.setAttribute('roughness', '1');
                }
                //ground
                else if (mazeData.data[i] == 'gr') {
                    let ground = document.createElement('a-box');
                    el.appendChild(ground);
                    ground.setAttribute('width', maze_size);
                    ground.setAttribute('height', 2);
                    ground.setAttribute('depth', maze_size);
                    ground.setAttribute('position', { x: position.x, y: -1, z: position.z });
                    ground.setAttribute('material', 'src: #grd');
                    ground.setAttribute('static-body', '');
                    ground.setAttribute('roughness', '1');
                }
                //block
                else if (mazeData.data[i] == 'bl') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #brick-01; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //lawson
                else if (mazeData.data[i] == 'la') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #lawson; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //postoffice
                else if (mazeData.data[i] == 'po') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #postoffice; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //firestation
                else if (mazeData.data[i] == 'fs') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #firestation; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //townhall
                else if (mazeData.data[i] == 'to') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #townhall; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //school
                else if (mazeData.data[i] == 'sc') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #e-jschool; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //factory
                else if (mazeData.data[i] == 'fa') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #factory; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //gasstation
                else if (mazeData.data[i] == 'gs') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #gas; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //hospital
                else if (mazeData.data[i] == 'ho') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #hospital; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //library
                else if (mazeData.data[i] == 'li') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #library; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //onsen
                else if (mazeData.data[i] == 'on') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #onsen; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //shrine
                else if (mazeData.data[i] == 'sh') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #shrine; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //sushi
                else if (mazeData.data[i] == 'su') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #sushi; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //policestation
                else if (mazeData.data[i] == 'ps') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #policestation; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //restaurant
                else if (mazeData.data[i] == 'fo') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #fork; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //7eleven
                else if (mazeData.data[i] == '7e') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #7eleven; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //aeon
                else if (mazeData.data[i] == 'ae') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #aeon; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //cityhall
                else if (mazeData.data[i] == 'ch') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #cityhall; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //familymart
                else if (mazeData.data[i] == 'fm') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #familymart; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //museum
                else if (mazeData.data[i] == 'mu') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #museum; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //koban
                else if (mazeData.data[i] == 'ko') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #koban; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //supermarket
                else if (mazeData.data[i] == 'sm') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #supermarket; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //ATM
                else if (mazeData.data[i] == 'at') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #atm; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //highschool
                else if (mazeData.data[i] == 'hs') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #highschool; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
                //hotel
                else if (mazeData.data[i] == 'hl') {
                    let block = document.createElement('a-box');
                    el.appendChild(block);
                    block.setAttribute('width', maze_size);
                    block.setAttribute('height', 6);
                    block.setAttribute('depth', maze_size);
                    block.setAttribute('position', { x: position.x, y: 0, z: position.z });
                    block.setAttribute('material', 'src: #hotel; repeat: 1 2');
                    block.setAttribute('static-body', '');
                    block.setAttribute('roughness', '1');
                }
            }
        }

        setTimeout(() => {
            let loader = document.querySelector("#loader");
            loader.remove();
            let scene = document.querySelector("a-scene");
            scene.setAttribute("style", "display:block");
        }, 1000)
    }
})

function reset() {
    // let finishDlgElm = document.querySelector("#finishDialog")
    // finishDlgElm.setAttribute("style", "display: none");
    location.href = "index.html"
}

function cont() {
    let finishDlgElm = document.querySelector("#finishDialog")
    finishDlgElm.setAttribute("style", "display: none");
}


