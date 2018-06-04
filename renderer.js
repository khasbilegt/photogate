// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const serialport = require('serialport')
const SerialPort = serialport.SerialPort
const teensy_id = "4304420"
const $ = require('./photogate/global/vendor/jquery/jquery')

let photogate 

setTimeout(() => {
    ipcRenderer.send('app-init')
}, 500)


function portOpen(err) {
    if (err) {
        document.getElementById('error').textContent = err.message            
    } else {
        document.getElementById('status').textContent = 'Connected'
    }

    photogate.write('x')
}

document.getElementById('run-gate').addEventListener('click', () => {
    serialport.list((err, ports) => {
        errorHandler(err)

        ports.forEach(port => {
            if (port.serialNumber === "4304420") {
                photogate = new serialport(port.comName, {
                    baudRate: 115200,
                    parser: new serialport.parsers.Readline('\r\n'),
                    autoOpen: false
                })

                photogate.write('l' + document.getElementById('objectLength-gate').value)
                photogate.write('g1')

                photogate.on('data', (data) => {
                    console.log("Data: ", data.toString('utf8'))
                })
            } else {
                errorHandler(err="Not found")
            }
        });

    })


})

function errorHandler(err) {
    $('error').textContent = err
    $('#errorNotif').toggle()
}