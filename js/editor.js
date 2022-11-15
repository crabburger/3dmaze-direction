var app = new Vue({
    el: '#app',
    data: {
        mazeData: [],
        n: 21,
        m: 21,
        blockSize: 30,
        selectedType: 'gr',
        tools1: [
            {
                label: "Town Hall",
                type: 'to'
            },
            {
                label: "City Hall",
                type: 'ch'
            },
            {
                label: "Koban",
                type: 'ko'
            },
            {
                label: "Police Station",
                type: 'ps'
            },
            {
                label: "Fire station",
                type: 'fs'
            },
            {
                label: "ES/JH School",
                type: 'sc'
            },
            {
                label: "Highschool",
                type: 'hs'
            },
            {
                label: "Library",
                type: 'li'
            },
        ],
        tools2: [
            {
                label: "Post Office",
                type: 'po'
            },
            {
                label: "Hospital",
                type: 'ho'
            },
            {
                label: "Museum",
                type: 'mu'
            },
            {
                label: "Onsen",
                type: 'on'
            },
            {
                label: "Shrine",
                type: 'sh'
            },
            {
                label: "ATM",
                type: 'at'
            },
            {
                label: "Hotel",
                type: 'hl'
            },
            {
                label: "Factory",
                type: 'fa'
            },
        ],
        tools3: [
            //{
            //    label: "Eraser",
            //    type: "gr"
            //},
            {
                label: "CoffeeStation",
                type: 'la'
            },
            {
                label: "11 Eleven",
                type: '7e'
            },
            {
                label: "FamilyStore",
                type: 'fm'
            },
            {
                label: "Supermarket",
                type: 'sm'
            },
            {
                label: "Shopping",
                type: 'ae'
            },
            {
                label: "Gas Station",
                type: 'gs'
            },
            {
                label: "Restaurant 1",
                type: 'su'
            },
            {
                label: "Restaurant 2",
                type: 'fo'
            },
        ],
        tools4: [
            {
                label: "Wall",
                type: 'wa'
            },
            {
                label: "Start Position",
                type: 'st'
            },
            {
                label: "Finish",
                type: 'ft'
            },
            {
                label: "Pit",
                type: 'pi'
            },
            {
                label: "Ground",
                type: 'gr'
            },
            {
                label: "Block",
                type: 'bl'
            },
        ]
    },
    mounted() {
        //localstorage
        if (localStorage.getItem("maze-data") != undefined) {
            let data = JSON.parse(localStorage.getItem("maze-data"));
            this.load(data.data, data.height, data.width)
        } else {
            let count = 0;
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    this.mazeData.push({
                        top: 0 + (i * this.blockSize),
                        left: 0 + (j * this.blockSize),
                        type: 0,
                        id: count++
                    })
                }
            }
        }

    },
    methods: {
        load(data, n, m) {
            let mazeData = data.map((v, idx) => {
                let i = Math.floor(idx / 21);
                let j = idx % 21;
                return {
                    top: 0 + (i * this.blockSize),
                    left: 0 + (j * this.blockSize),
                    type: v,
                    id: idx
                }
            });
            this.mazeData = mazeData;
            this.n = n;
            this.m = m;
        },
        changeTile(e) {
            if (e.buttons == 1 || e.type == "click") {
                let idx = parseInt(e.target.id);

                if (this.selectedType == 'st') {//only one tile can be marked as start position
                    this.mazeData.map(m => {
                        if (m.type == 'st') {
                            m.type = 'gr'
                        }
                    })
                    this.mazeData[idx].type = this.selectedType;
                } else {
                    this.mazeData[idx].type = this.selectedType;
                }
            }
        },
        save() {
            let arr = [];
            this.mazeData.forEach(item => {
                arr.push(item.type);
            });

            let data = {
                "data": arr,
                "height": this.n,
                "width": this.m
            }
            localStorage.setItem("maze-data", JSON.stringify(data));
            console.log((localStorage.getItem("maze-data")))

            //console.log(JSON.parse(sessionStorage.getItem("maze-data")))
            // let testurl = document.getElementById("testurl")
            const myJSON = JSON.stringify(data);
            const newdata = myJSON.replace(/[{}]/gi, "");//.replace(/&/gi, ",").replace(/=/gi, ":") + "}";

            document.getElementById("maze").innerHTML = "<a href='maze.html?" + newdata + "' target='_blank'>Maze link</a>";
            document.getElementById("guide").innerHTML = "<a href='guidev2.html?" + newdata + "' target='_blank'>Guide link</a>";

        },
        gotoMaze() {
            location.href = "maze.html"
        },
        clear() {
            let data = [
                'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'st', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa'];
            this.load(data, 21, 21);
        },
        level1() {
            let data = [
                'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'ft', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'fo', 'bl', 'su', 'gr', 'la', 'bl', 'bl', 'gr', 'ps', 'bl', 'bl', 'gr', 'sh', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'bl', 'gr', 'on', 'bl', 'bl', 'gr', 'bl', 'bl', 'to', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'la', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'sc', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'gs', 'gr', 'bl', 'bl', 'fs', 'gr', 'fo', 'bl', 'bl', 'gr', 'po', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'li', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'la', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'ho', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'bl', 'gr', 'fa', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'bl', 'bl', 'gr', 'bl', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'st', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'gr', 'wa',
                'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa', 'wa'];
            this.load(data, 21, 21);
        }
    }
})
