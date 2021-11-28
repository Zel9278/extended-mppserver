$(function() {
    //alt + mouse note handle
    $(MPP.piano.rootElement).mousemove(e => {
        if(!e.altKey) return;
        e.preventDefault();
        var pos = translateMouseEvent(e);
        var hit = MPP.piano.renderer.getHit(pos.x, pos.y);
        if(hit) {
            MPP.press(hit.key.note, hit.v);
            MPP.release(hit.key.note);
        }
    });

    function translateMouseEvent(evt) {
        var element = evt.target;
        var offx = 0;
        var offy = 0;
        do {
            if(!element) break; // wtf, wtf?
            offx += element.offsetLeft;
            offy += element.offsetTop;
        } while(element = element.offsetParent);
        return {
            x: (evt.pageX - offx) * window.devicePixelRatio,
            y: (evt.pageY - offy) * window.devicePixelRatio
        }
    };



















    //audio
    MPP.piano.audio.lramp = 0;
    MPP.piano.audio.sstop = 0;

















    //addon ced
    MPP.ced_addon = {};

    MPP.ced_addon.debug = {
        startTime: null,
        endTime: null,
        fps: 0,
        frame: 0,

        NPSTimer: null,
        notes: 0,
        nps: 0,
        fps: 0
    };

    MPP.ced_addon.functions = {
        initFPS() {
            MPP.ced_addon.debug.startTime = new Date().getTime();
            
            function gameLoop(){
                MPP.ced_addon.debug.frame ++;
                document.getElementById('fps').innerText = `FPS: ${MPP.ced_addon.debug.fps}`;
                MPP.ced_addon.debug.endTime = new Date().getTime();
                if(MPP.ced_addon.debug.endTime - MPP.ced_addon.debug.startTime >= 1000){
                    MPP.ced_addon.debug.fps = MPP.ced_addon.debug.frame;
                    MPP.ced_addon.debug.frame = 0;
                    MPP.ced_addon.debug.startTime = new Date().getTime();
                }
                requestAnimationFrame(gameLoop);
            }
            gameLoop();
        },
        addDebugCounters() {
            var nc = MPP.ced_addon.debug.notes += 1;
            var ret = (nc).toString().padStart(6, '0');
            document.getElementById('notes').innerText = `Notes: ${ret}`;
            MPP.ced_addon.debug.nps += 1;
        },
        initNPS() {
            MPP.ced_addon.debug.NPSTimer = setInterval(() => {
                document.getElementById('nps').innerHTML = `NPS: ${MPP.ced_addon.debug.nps}`;
                MPP.ced_addon.debug.nps = 0;
            }, 1000);
        }
    };

    MPP.ced_addon.functions.initFPS();
    MPP.ced_addon.functions.initNPS();
});