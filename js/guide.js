var app = new Vue({
    el: '#app',
    data: {
        mazeData: [],
        n: 21,
        m: 21,
        blockSize: 30,
        selectedType: 1,
        tools: [
            //{
            //    label: "Eraser",
            //    type: "gr"
            //},
            {
                label: "Wall",
                type: 'wa'
            },
            {
                label: "Start",
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
            {
                label: "Fire station",
                type: 'fs'
            },
            {
                label: "CoffeeStation",
                type: 'la'
            },
            {
                label: "Post Office",
                type: 'po'
            },
            {
                label: "Town Hall",
                type: 'to'
            },
            {
                label: "School",
                type: 'sc'
            },
            {
                label: "Factory",
                type: 'fa'
            },
            {
                label: "Gas Station",
                type: 'gs'
            },
            {
                label: "Hospital",
                type: 'ho'
            },
            {
                label: "Library",
                type: 'li'
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
                label: "Sushi Restaurant",
                type: 'su'
            },
            {
                label: "Police Station",
                type: 'ps'
            },
            {
                label: "11 Eleven",
                type: '7e'
            },
            {
                label: "Shopping",
                type: 'ae'
            },
            {
                label: "City Hall",
                type: 'ch'
            },
            {
                label: "FamilyStore",
                type: 'fm'
            },
            {
                label: "Museum",
                type: 'mu'
            },
            {
                label: "Koban",
                type: 'ko'
            },
            {
                label: "Supermarket",
                type: 'sm'
            },
            {
                label: "ATM",
                type: 'at'
            },
            {
                label: "Highschool",
                type: 'hs'
            },
        ]
    },
    mounted() {
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
            let data = JSON.parse(newdata)
            this.load(data.data, data.height, data.width)
        }
        else {
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
    }
})
