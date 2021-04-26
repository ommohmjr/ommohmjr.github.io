const codeReader = new ZXing.BrowserMultiFormatReader();

window.addEventListener('load', () => {

    showScanningDialog();

});

function showScanningDialog() {
    let selectedDeviceId;
    console.log('ZXing code reader initialized')
    codeReader.listVideoInputDevices().then( // codereader work in promise exec function in .then and exec .catch on error
        function(videoInputDevices) {
            clearCameraList();
            var sourceSelect = document.getElementById('sourceSelect');
            selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId // assume select back camera device first
            if (videoInputDevices.length >= 1) {
                videoInputDevices.forEach((element) => {
                    const sourceOption = document.createElement('option')
                    sourceOption.text = element.label
                    sourceOption.value = element.deviceId
                    sourceSelect.appendChild(sourceOption)
                })
                sourceSelect.selectedIndex = (videoInputDevices.length - 1);

                sourceSelect.onchange = () => {
                    selectedDeviceId = sourceSelect.value;
                    codeReader.reset();
                    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => scan(result, err)).catch(function(err) {
                        console.error(err)
                    })
                };

                document.getElementById('sourceSelectPanel').style.display = 'block';
                document.getElementById("video").style.display = 'block';
                codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => scan(result, err)).catch(function(err) {
                    console.error(err)
                })
                const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                sourceSelectPanel.style.display = 'block'
            }

            console.log(`Started continous decode from camera with id ${selectedDeviceId}`);

            document.getElementById('resetButton').addEventListener('click', () => {
                codeReader.reset();
                document.getElementById('result').textContent = '';
                sourceSelectPanel.style.display = 'none';
                console.log('Reset.')
            })
        }).catch(
        function(err) {
            console.error(err)
        });
}

function scan(result, err) {
    if (result) { // on scan complete
        console.log(result);
        opener.doScanQr(result.text);
        codeReader.reset();
        sourceSelectPanel.style.display = 'none';
        var audio = new Audio('resource/barcode-read.mp3');
        audio.play();
        window.close();

    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
        //console.error(err)
        //document.getElementById('result').textContent = err
    }
}

function clearCameraList() {
    var select = document.getElementById("sourceSelect");
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
}