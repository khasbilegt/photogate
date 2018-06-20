// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const serialport = require('serialport')

window.$ = window.jQuery = require('./photogate/global/vendor/jquery/jquery.min.js');

let photogate 
let arrayData

setTimeout(() => {
    ipcRenderer.send('app-init')
}, 5000)

$('#run-gate').click(() => {
    let objectLength = $('#objectLength-gate').val();
    let isGraph = ($("#graph-gate").prop("checked")) 
    let isTable = ($('#table-gate').prop("checked"))
    let table = $('#table').DataTable()
    table.clear().draw()

    serialport.list((err, ports) => {
        if (err)
            errorHandler(err.message, 'error', 'Алдаа')
        
        ports.forEach(port => {
            if (port.manufacturer === "Teensyduino") {
                if (isGraph) {
                    $('#graphContainer').show()
                } 
                else {
                    $('#tableContainer').show()
                    $('#tableHeader-gate').show()
                }

                $('#display-section').show()
                $('#presentation-section').hide()

                photogate = new serialport(port.comName, {
                    baudRate: 115200,
                    parser: new serialport.parsers.Readline('\r\n'),
                })
                
                if (!photogate.isOpen) {
                    photogate.write('l' + objectLength, (err) => {
                        if (err) {
                            errorHandler(err.message, 'warning','Анхаар')
                        }
                        console.log('Set object length')

                        photogate.drain(() => {
                            photogate.flush()
                        })
                    })
                    
                    photogate.write('g1', (err) => {
                        if (err) {
                            errorHandler(err.message, 'error','Алдаа')
                        }
                        console.log('Started gate mode')
                    })
                
                    photogate.on('readable', () => {
                        let data = photogate.read().toString('utf8').slice()
                        console.log(data)
                        arrayData = data.split(" ");
                        if (arrayData.length == 5) {
                            table.row.add(arrayData).draw()
                        }
                        console.log(arrayData)
                    })

                    photogate.on('close', () => {
                        console.log("Port closed")
                        errorHandler("Хэмжилтийг зогсоолоо", "warning", "Анхаар")
                    })
                }
            }
        });
    })
})

$('#run-interval').click(() => {
    let objectLength = $('#objectLength-interval').val();
    let distanceLength = $('#distanceLength').val();
    
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
                    photogate.write('l' + objectLength)
                    photogate.write('d' + distanceLength)

                    photogate.write('g1')
                
                    photogate.on('readable', () => {
                        let data = photogate.read().toString('utf8').slice()
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

$('#stop-gate').click(() => {
    photogate.write('q')
    photogate.drain(() => {
        photogate.flush(() => {
            photogate.close()
        })
    })

    // photogate.write('r')
    // photogate.drain(() => {
    //     photogate.on('data', (data) => {
    //         console.log(data)
    //     })
    // })
    
    // photogate.close()
})
$('#stop-interval').click(() => {
    photogate.write('q')
    photogate.close()
})

$('#showTable').click(() => {
    if ($('#tableContainer:hidden')) {
        $('#tableContainer').show()    
        $('#graphContainer').hide()
    }
})

$('#showGraph').click(() => {
    if ($('#graphContainer:hidden')) {
        $('#graphContainer').show()
        $('#tableContainer').hide()
    }
})

function errorHandler(err, type, title) {
    if (err && type && title) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        
        toastr[type](err, title)
    }
}
