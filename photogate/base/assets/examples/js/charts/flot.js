(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/charts/flot', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.chartsFlot = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example Flot Realtime
  // ---------------------
  // (function () {
  //   if (!_jquery2.default.isFunction(_jquery2.default.fn.plot) || (0, _jquery2.default)("#exampleFlotRealtime").length === 0) {
  //     return;
  //   }

  //   var data = [];
  //   var totalPoints = 250;

  //   function getRandomData() {
  //     if (data.length > 0) {
  //       data = data.slice(1);
  //     }
  //     // Do a random walk
  //     while (data.length < totalPoints) {
  //       var prev = data.length > 0 ? data[data.length - 1] : 50;
  //       var y = prev + Math.random() * 10 - 5;
  //       if (y < 0) {
  //         y = 0;
  //       } else if (y > 100) {
  //         y = 100;
  //       }
  //       data.push(y);
  //     }
  //     // Zip the generated y values with the x values
  //     var res = [];
  //     for (var i = 0; i < data.length; ++i) {
  //       res.push([i, data[i]]);
  //     }
  //     return res;
  //   }
  //   var labelColor = Config.colors("grey", 600);
  //   // Set up the control widget
  //   var updateInterval = 30;

  //   var plot = _jquery2.default.plot((0, _jquery2.default)("#exampleFlotRealtime"), [{
  //     data: getRandomData()
  //   }], {

  //     colors: [Config.colors("blue-grey", 100)],
  //     series: {
  //       shadowSize: 0,
  //       lines: {
  //         show: true,
  //         lineWidth: 0,
  //         fill: true,
  //         fillColor: Config.colors("blue-grey", 100)
  //       }
  //     },
  //     legend: {
  //       show: false
  //     },
  //     xaxis: {
  //       show: false,
  //       font: {
  //         color: labelColor
  //       }
  //     },
  //     yaxis: {
  //       tickColor: "#edeff2",
  //       color: "#474e54",
  //       min: 0,
  //       max: 100,
  //       font: {
  //         size: 14,
  //         color: labelColor,
  //         weight: "300"
  //         // family: "OpenSans Light"
  //       }
  //     },
  //     grid: {
  //       color: "#474e54",
  //       tickColor: "#e3e6ea",
  //       backgroundColor: {
  //         colors: ["#fff", "#fff"]
  //       },
  //       borderWidth: {
  //         top: 0,
  //         right: 0,
  //         bottom: 1,
  //         left: 0
  //       },
  //       borderColor: "#eef0f2"
  //     }
  //   });

  //   function update() {
  //     plot.setData([getRandomData()]);
  //     // Since the axes don't change, we don't need to call plot.setupGrid()
  //     plot.draw();
  //     setTimeout(update, updateInterval);
  //   }
  //   update();
  // })();

  // Example Flot Full-Bg Line
  // -------------------------
  (function () {
    var b = [[1262304000000, 0], [1264982400000, 1000], [1267401600000, 700], [1270080000000, 1300], [1272672000000, 2600], [1275350400000, 1300], [1277942400000, 1700], [1280620800000, 1300], [1283299200000, 1500], [1285891200000, 2000], [1288569600000, 1500], [1291161600000, 1200]];
    var a = [{
      label: "Нэг хэмжигчийн төлөв",
      data: b
    }];

    _jquery2.default.plot("#exampleFlotFullBg", a, {
      xaxis: {
        min: new Date(2009, 12, 1).getTime(),
        max: new Date(2010, 11, 2).getTime(),
        mode: "time",
        tickSize: [1, "month"],
        monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        tickLength: 0,
        // tickColor: "#edeff2",
        color: "#474e54",
        font: {
          size: 14,
          weight: 300
          // family: "OpenSans Light"
        }
      },
      yaxis: {
        tickColor: "#edeff2",
        color: "#474e54",
        font: {
          size: 14,
          weight: "300"
          // family: "OpenSans Light"
        }
      },
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          // fill: true,
          // fillColor: "#ff0000",
          lineWidth: 1.5
        },
        points: {
          show: true,
          fill: true,
          fillColor: Config.colors("primary", 600),
          radius: 3,
          lineWidth: 1
        }
      },
      colors: [Config.colors("primary", 400)],
      grid: {
        // show: true,
        hoverable: true,
        clickable: true,
        color: "green",
        tickColor: "red",
        backgroundColor: {
          colors: ["#fcfdfe", "#fcfdfe"]
        },
        borderWidth: 1,
        borderColor: "#ff0000"
      },
      legend: {
        show: true
      }
    });
  })();

  // Example Flot Mix
  // ----------------
  // (function () {
  //   var b1 = [];
  //   for (var i = 0; i < 14; i += 0.5) {
  //     b1.push([i, Math.cos(i) + 1]);
  //   }

  //   var b2 = [[2, 3], [4, 8], [6, 5], [9, 13]];

  //   var b3 = [];
  //   for (i = 0; i < 14; i += 0.5) {
  //     b3.push([i, Math.cos(i) + Math.sin(i) - 1]);
  //   }

  //   var b4 = [];
  //   for (i = 0; i < 14; i += 0.1) {
  //     b4.push([i, Math.sqrt(i * 10) - 4 * Math.cos(i)]);
  //   }

  //   var b5 = [];
  //   for (i = 0; i < 14; i += 1.5) {
  //     b5.push([i, Math.cos(i) + 2 * Math.sin(i) + 6]);
  //   }

  //   var b6 = [];
  //   for (i = 0; i < 14; i += 0.5 + Math.random()) {
  //     b6.push([i, Math.sqrt(i + 2 * Math.cos(i)) - Math.sin(i) - 3]);
  //   }

  //   _jquery2.default.plot("#exampleFlotMix", [{
  //     data: b2,
  //     bars: {
  //       show: true,
  //       align: "center",
  //       fill: true,
  //       fillColor: Config.colors("blue-grey", 100)
  //     }
  //   }, {
  //     data: b1,
  //     lines: {
  //       show: true,
  //       fill: true,
  //       fillColor: "rgba(251,213,181,.1)"
  //     }
  //   }, {
  //     data: b3,
  //     points: {
  //       show: true,
  //       fill: true,
  //       fillColor: Config.colors("green", 600),
  //       radius: 2
  //     }
  //   }, {
  //     data: b4,
  //     lines: {
  //       show: true
  //     },
  //     points: {
  //       show: false
  //     }
  //   }, {
  //     data: b5,
  //     lines: {
  //       show: true
  //     },
  //     points: {
  //       show: true,
  //       fill: true,
  //       fillColor: Config.colors("primary", 600),
  //       radius: 2
  //     }
  //   }, {
  //     data: b6,
  //     lines: {
  //       show: true,
  //       steps: true
  //     }
  //   }], {
  //     xaxis: {
  //       tickLength: 0,
  //       color: "#474e54",
  //       font: {
  //         size: 14,
  //         weight: 300
  //         // family: "OpenSans Light"
  //       }
  //     },
  //     yaxis: {
  //       tickColor: "#edeff2",
  //       color: "#474e54",
  //       font: {
  //         size: 14,
  //         weight: "300"
  //         // family: "OpenSans Light"
  //       }
  //     },
  //     grid: {
  //       color: "#474e54",
  //       tickColor: "#e3e6ea",
  //       backgroundColor: {
  //         colors: ["#fff", "#fff"]
  //       },
  //       borderWidth: {
  //         top: 0,
  //         right: 0,
  //         bottom: 1,
  //         left: 0
  //       },
  //       borderColor: "#eef0f2"
  //     },
  //     series: {
  //       shadowSize: 0
  //     },
  //     colors: [Config.colors("blue-grey", 100), Config.colors("orange", 200), Config.colors("green", 600), Config.colors("yellow", 600), Config.colors("primary", 600), Config.colors("purple", 200)]
  //   });
  // })();

  // Example Flot Tooltip
  // --------------------
  (function () {
    (0, _jquery2.default)("<div class='flot-tooltip'></div>").css({
      position: "absolute",
      color: "#fff",
      display: "none",
      border: "1px solid #777",
      padding: "2px",
      "background-color": "#777",
      opacity: 0.80
    }).appendTo("body");

    (0, _jquery2.default)("#exampleFlotCurve").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
        (0, _jquery2.default)(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
          top: item.pageY + 5,
          left: item.pageX + 5
        }).fadeIn(200);
      } else {
        (0, _jquery2.default)(".flot-tooltip").hide();
      }
    });

    (0, _jquery2.default)("#exampleFlotFullBg").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
        (0, _jquery2.default)(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
          top: item.pageY + 5,
          left: item.pageX + 5
        }).fadeIn(200);
      } else {
        (0, _jquery2.default)(".flot-tooltip").hide();
      }
    });

    (0, _jquery2.default)("#exampleFlotRealtime").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
        (0, _jquery2.default)(".flot-tooltip").html("x | " + x + "," + " y | " + y).css({
          top: item.pageY + 5,
          left: item.pageX + 5
        }).fadeIn(200);
      } else {
        (0, _jquery2.default)(".flot-tooltip").hide();
      }
    });
  })();
});