// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const serialport = require('serialport')
const SerialPort = serialport.SerialPort
const teensy_id = "4304420"

window.$ = window.jQuery = require('./photogate/global/vendor/jquery/jquery.min.js');

let photogate 
let arrayData

setTimeout(() => {
    ipcRenderer.send('app-init')
}, 5000)

$('#run-gate').click(() => {
    let objectLength = $('#objectLength-gate').val();
    let display = ($("#graph-gate").prop("checked", true)) ? true : false

    let table = $('#table').DataTable()
    
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
                        let data = photogate.read().toString('utf8').slice()
                        console.log(data)
                        arrayData = data.split(" ");
                        table.row.add(arrayData).draw()
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
    $('#error').text(err)
}

function sendCommand(cmd) {
    console.log('Command ' + cmd)
    
}