
AFRAME.registerComponent("player", {
    init: function () {
        document.addEventListener('keydown', event => {
            let player = document.querySelector("#player");
            if (event.code === 'Space') {
                if (player.getAttribute("position").y <= 2) {
                    player.setAttribute('velocity', '0 12 0');
                }
            }
        })

        this.el.addEventListener('collide', (evt) => {
            if (evt.detail.body.el.id != undefined && evt.detail.body.el.id == "wplane") {
                this.el.sceneEl.exitVR()
                let finishDlgElm = document.querySelector("#restart")
                finishDlgElm.setAttribute("style", "display: block");
                let player = document.querySelector("#player")
                //removemaze.remove();
                //let mplane = document.querySelector("#wplane")
                //mplane.remove(); 
                player.setAttribute('keyboard-controls','enabled: false');
                this.finished = true;
            }
        });
        this.el.addEventListener('collide', (evt) => {
            if (evt.detail.body.el.id != undefined && evt.detail.body.el.id == "finish-tile") {
                this.el.sceneEl.exitVR()
                let finishDlgElm = document.querySelector("#finishDialog")
                finishDlgElm.setAttribute("style", "display: block");
                let player = document.querySelector("#player")
                let removemaze = document.querySelector("#mazewall")
                removemaze.remove();
                let mplane = document.querySelector("#wplane")
                mplane.remove(); 
                player.setAttribute('keyboard-controls','enabled: false');
                this.finished = true;
            }
        });
    }
})


