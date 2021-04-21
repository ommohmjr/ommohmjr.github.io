const codeReader = new ZXing.BrowserMultiFormatReader();

function showScanningDialog() {

    let selectedDeviceId;
    console.log('ZXing code reader initialized')
    codeReader.listVideoInputDevices().then(
            function(videoInputDevices) {
                clearCameraList();
                var sourceSelect = document.getElementById('sourceSelect');
                selectedDeviceId = videoInputDevices[0].deviceId // assume select back camera device
                if (videoInputDevices.length >= 1) {
                    videoInputDevices.forEach((element) => {
                        const sourceOption = document.createElement('option')
                        sourceOption.text = element.label
                        sourceOption.value = element.deviceId
                        sourceSelect.appendChild(sourceOption)
                    })

                    sourceSelect.onchange = () => {
                        selectedDeviceId = sourceSelect.value;
                        startScanning();
                        codeReader.reset();
                    };
                    startScanning();
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
            })
        .catch(
            function(err) {
                console.error(err)
            });

}

function startScanning() {
    let sourceSelect = document.getElementById('sourceSelect');
    document.getElementById('sourceSelectPanel').style.display = 'block';
    document.getElementById("video").style.display = 'block';
    selectedDeviceId = sourceSelect.value;
    console.log(selectedDeviceId);
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            console.log(result);
            //document.getElementById('result').textContent = result.text;
            document.getElementById('result').value = result.text;
            codeReader.reset();
            sourceSelectPanel.style.display = 'none';
            var audio = new Audio('resource/barcode-read.mp3');
            audio.play();

        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            document.getElementById('result').textContent = err
        }
    })

}

function clearCameraList() {
    var select = document.getElementById("sourceSelect");
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
}