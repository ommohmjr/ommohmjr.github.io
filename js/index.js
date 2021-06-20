var statusShow = false,
    progressHandle = {
        yeet: 0,
        status: 'Preparing...'
    }

async function startProcess() {
    await sleep(1000);
    let propLength = document.getElementById('scene').getElementsByClassName('item').length
    for (var i = 0; i < propLength; i++) {
        let item = document.getElementById('scene').getElementsByClassName('item')[i],
            type = item.getAttribute("data-type");
        item.style.display = 'block';
        if (type == "vid") {
            item.getElementsByTagName("video")[0].load();
            item.getElementsByTagName("video")[0].play();
            item.getElementsByTagName("video")[0].volume = 0.1;
        }
        await sleep(100);

        await sleep(parseInt(item.getAttribute("time")) - 3000);
        if (i != propLength - 1) {
            await sleep(3000);
            if (type == "vid") item.getElementsByTagName("video")[0].pause();
            item.style.animation = "fadeOut 1s forwards";
            await sleep(1000);
            item.style.display = "";
        }
    }
    await sleep(250);
    statusShow = true;
    document.getElementById('videos').style.display = "block";
    document.getElementById('pgB-PC').style.width = progressHandle.yeet + '%';
    document.getElementById('pgB-NPC').innerHTML = progressHandle.status;
    document.getElementById('pgB-NPCNum').innerHTML = progressHandle.statusNum;
    await sleep(1000);
    document.getElementById('videos').style.opacity = "0.1";
}

async function fetchNPC(elm, start, stop) {
    for (var ii = start; ii <= stop; ii++) {
        await sleep(10);
        elm.innerHTML = ii + '%';
    }
}

var count = 0;
var thisCount = 0;
var isPlayerStop = true;

const handlers = {
    startInitFunctionOrder(data) {
        count = data.count
    },

    initFunctionInvoking(data) {
        progressHandle.yeet = Math.round((data.idx / count) * 100);
        progressHandle.status = data.eventName + '(' + data.name + ')'
        progressHandle.statusNum = data.idx + '/' + count
        if (statusShow == true) {
            //document.getElementById('pgB-PC').style.width = Math.round((data.idx / count) * 100) + '%';
            //document.getElementById('pgB-NPC').innerHTML = data.eventName + '(' + data.name + '): ' + data.idx + '/' + count// + '<br>' + JSON.stringify(data, null, 1) // + ' ('  + Math.round((data.idx / count) * 100) + '%)';
            document.getElementById('pgB-PC').style.width = progressHandle.yeet + '%';
            document.getElementById('pgB-NPC').innerHTML = progressHandle.status;
            document.getElementById('pgB-NPCNum').innerHTML = progressHandle.statusNum;
        }
    },

    performMapLoadFunction(data) {
        thisCount++;
        progressHandle.yeet = Math.round((thisCount / count) * 100);
        progressHandle.status = data.eventName
        progressHandle.statusNum = data.idx + '/' + count
        if (statusShow == true) {
            document.getElementById('pgB-NPC').innerHTML = progressHandle.status;
            document.getElementById('pgB-NPCNum').innerHTML = progressHandle.statusNum;
            document.getElementById('pgB-PC').style.width = progressHandle.yeet + '%';
            //document.getElementById('pgB-PC').style.width = Math.round((thisCount / count) * 100) + '%';
            //document.getElementById('pgB-NPC').innerHTML = data.eventName + ': ' + thisCount + '/' + count// + '<br>' + JSON.stringify(data, null, 1) // + ' (' + Math.round((thisCount / count) * 100) + '%)';
        }
    },

    onLogLine(data) {
        progressHandle.yeet = 100;
        progressHandle.status = data.message;
        progressHandle.statusNum = "Done!";
        document.getElementById('pgB-PC').style.width = progressHandle.yeet + '%';
        //document.getElementById('pgB-PC').style.width = '100%';
        //document.getElementById('pgB-NPC').innerHTML = data.message + '...';
        document.getElementById('pgB-NPC').innerHTML = progressHandle.status;
        document.getElementById('pgB-NPCNum').innerHTML = progressHandle.statusNum;
        if (data.message = "Awaiting scripts" && isPlayerStop) {
            finalLoad()
        }
    }
}

window.addEventListener('message', function(e) {
    (handlers[e.data.eventName] || function() {})(e.data);
})

async function finalLoad() {
    let player = document.getElementById('videos');
    var loumnRub = 200
    var myVarRub = setInterval(function() {
        if (loumnRub > 0) {
            loumnRub--
            player.volume = loumnRub / 1000
                //player.setVolume(loumnRub);
        } else {
            player.pause();
            clearInterval(myVarRub);
        }
    }, 8)
    document.getElementById('scene').style.animation = "fadeOut .8s forwards"
    await sleep(1500)
    document.getElementById('scene').style.display = "none";
    document.getElementById('settingTxt').style.display = "";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}