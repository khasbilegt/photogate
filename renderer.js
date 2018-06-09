// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const serialport = require('serialport')
const SerialPort = serialport.SerialPort
const teensy_id = "4304420"

let photogate 
let table

setTimeout(() => {
    ipcRenderer.send('app-init')
}, 5000)

document.getElementById('run-gate').addEventListener('click', () => {
    let objectLength = document.getElementById('objectLength-gate').value;

    serialport.list((err, ports) => {
        errorHandler(err)

        ports.forEach(port => {
            if (port.manufacturer === "Teensyduino") {
                photogate = new serialport(port.comName, {
                    baudRate: 115200,
                    parser: new serialport.parsers.Readline('\r\n'),
                })

                if (!photogate.isOpen) {
                    photogate.write('g1')
                
                    photogate.on('readable', () => {
                        let data = photogate.read().toString('utf8')
                        table = document.getElementById('table')

                        arrayData = data.split(/[\s+]+/);

                        table.DataTable({
                            data: arrayData,
                        })

                        console.log(arrayData)
                    })
                }

            } else {
                errorHandler(err="Not found")
            }
        });
    })
})


function errorHandler(err) {
    document.getElementById('error').innerHTML = err
}

function sendCommand(cmd) {
    console.log('Command ' + cmd)
    
}