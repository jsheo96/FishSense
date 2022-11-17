function smoothing(data_list, max_length) {
        var result_list = [];
        var list = [];
        for (i=0; i<data_list.length; i++) {
            if (list.length >= max_length) {
                list.shift();
            }
            list.push(data_list[i]);
            console.log(list)
            avg = list.reduce((a, b) => a+b, 0) / list.length;
            result_list.push(avg);

        }
        return result_list
    }
Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }
function getRandomArray(length, init, step) {
        var values = []
        var value = init
        for (let i = 0 ; i < length ; i++) {
            value = value + Math.random()*(step * 2) - step
            values.push(value)
        }
        return values
    }
gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
//          display: 0,
//          gridLines: 0,
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
            padding: 20,
//            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: true,
            drawBorder: false
          }
        }],
        xAxes: [{
//          display: 0,
//          gridLines: 0,
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6,
            fontColor: 'white',
            padding: 20,
//            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: true,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };
type = ['primary', 'info', 'success', 'warning', 'danger'];
demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";
    ctx = document.getElementById('lineChartExample').getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Active Users",
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }]
      },
      options: gradientChartOptionsConfiguration
    });
  },

  initDashboardPageCharts: function() {
    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    Chart.pluginService.register({
      afterDraw: function(chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.chart.ctx;

          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = "60px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 20;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    });
    function get_option_for_bar(label, color, value) {
    var data = {
      labels: [label],
      datasets: [{
        data: [value],
        backgroundColor: [
          color,
        ],
        borderColor: [
          color,
        ],
        borderWidth: 1,
      }]
    };
    var options = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            ticks: {color: 'green', beginAtZero: true},
          },
          xAxes: [{
            barPercentage: 2.0,
            ticks: {fontColor: "white"},
            gridLines: {
                display:false
            },
          }],
          yAxes: [{
              ticks: {fontColor: "white"},
              gridLines: {
                  display:false
              }
          }]
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        elements: {
          center: {
              text: value.toFixed(2),
              color: '#FFFFFF',//'#FF6384', // Default is #000000
              fontStyle: 'Arial', // Default is Arial
              sidePadding: 20, // Default is 20 (as a percentage)
              minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
              lineHeight: 25 // Default is 25 (in px), used for when text wraps
          }
        }
      }
    };
    return options;
    }
    console.log(document.getElementById('pH'))
    var ctx = document.getElementById('pH').getContext("2d");
    var myChart = new Chart(ctx, get_option_for_bar('    pH    ', 'purple',6.5));
    var ctx = document.getElementById('Temperature').getContext("2d");
    var myChart = new Chart(ctx, get_option_for_bar('Temp  (°C)', 'darkorange',27.1));
    var ctx = document.getElementById('DO').getContext("2d");
    var myChart = new Chart(ctx, get_option_for_bar('DO   (mg/L)', 'navy',7.8));
    var ctx = document.getElementById('Salinity').getContext("2d");
    var myChart = new Chart(ctx, get_option_for_bar('Salinity (‰)', 'grey',5.23));
  },
  initGrowthCharts: function() {
    gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 30,
            padding: 20,
            fontColor: "#9a9a9a",
            beginAtZero: true
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };



    dateArray = getDates(new Date().addDays(-100), new Date());
    simpleArray = dateArray.map(function (date) { return `${date.getMonth()}/${date.getDate()}`});
    var chart_labels = simpleArray
//    values = [...Array(chart_labels.length).keys()];


    function getSurvivalRates(length, init, step, base, gamma) {
        var values = []
        var value = init
        for (let i = 0 ; i < length ; i++) {
            value = (1 - base)*(gamma)**(-i) + base
            values.push(value)
        }
        return values
    }
    sgr_values = getRandomArray(chart_labels.length, 10, 1);
    k_factor_values = getRandomArray(chart_labels.length, 1, 0.08);
    survival_rates = getSurvivalRates(chart_labels.length, 1, 0.001, 0.4, 1.1);
    damage_indices = getRandomArray(chart_labels.length, 10, 1);

    var chart_data = sgr_values;

    var ctx = document.getElementById("growthChart").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "SGR",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: 'aqua',//'#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 0,
          data: chart_data,
        }]
      },
      options: gradientChartOptionsConfiguration//WithTooltipPurple
    };
    var myChartData = new Chart(ctx, config);
    $("#0").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].label = 'SGR';
      data.datasets[0].data = sgr_values;
      data.labels = chart_labels;
      myChartData.config.options.scales.yAxes[0].ticks.suggestedMax = 30;
      data.datasets[0].borderColor = 'aqua';
      document.getElementById('graph_name').textContent = 'Sustained Growth Rate (%)'
      myChartData.update();
    });
    $("#1").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].label = 'K-factor';
      data.datasets[0].data = k_factor_values;
      data.labels = chart_labels;
      myChartData.config.options.scales.yAxes[0].ticks.suggestedMax = 2
      data.datasets[0].borderColor = 'yellow';
      document.getElementById('graph_name').textContent = 'K-Factor (Condition Factor)'
      myChartData.update();
    });

    $("#2").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].label = 'Survival rate';
      data.datasets[0].data = survival_rates;
      data.labels = chart_labels;
      myChartData.config.options.scales.yAxes[0].ticks.suggestedMax = 1
      data.datasets[0].borderColor = 'orange';
      document.getElementById('graph_name').textContent = 'Survival Rate (%)'
      myChartData.update();
    });

    $("#3").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].label = 'Damage Index';
      data.datasets[0].data = damage_indices;
      data.labels = chart_labels;
      myChartData.config.options.scales.yAxes[0].ticks.suggestedMax = 1
      data.datasets[0].borderColor = 'red';
      document.getElementById('graph_name').textContent = 'Damage Index'
      myChartData.update();
    });
  },
  initFeedingCharts: function() {

    function getRandomArray(length, init, step) {
        var values = []
        var value = init
        for (let i = 0 ; i < length ; i++) {
            value = value + Math.random()*(step * 2) - step
            values.push(value)
        }
        return values
    }
    function getTimeArray() {
      var curTime = new Date()
      times = []
      for (i = 0 ; i < 6 * 24 ; i++){
        time = new Date(curTime.getTime() - 10 * i * 60000);
        times.push(time)
      }
      return times
    }

    var chart_labels = getTimeArray().map(function (date) { return `${date.getHours()}:${date.getMinutes()}`});
    var chart_data = getRandomArray(chart_labels.length, 10, 5); // Random list for appetite TODO: get two thresholds


    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Appetite",
          fill: true,
//          backgroundColor: 'aqua',
          borderColor: 'green',//'#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 0,
          data: chart_data,
        }]
      },
      options: gradientChartOptionsConfiguration
    };
    var ctx = document.getElementById("Appetite").getContext("2d");
    var myChart = new Chart(ctx, config);
    var ctx = document.getElementById("Feed").getContext("2d");
//    var chart_data = getRandomArray(chart_labels.length, 100, 10);
    console.log(chart_data)
    console.log(gap)
    //TODO smoothing avergae

    chart_data = smoothing(chart_data, 5);
    var gap = Math.max(...chart_data) - Math.min(...chart_data)
    var threshold_high = gap / 3 * 2 + Math.min(...chart_data)
    var threshold_low = gap / 3 * 1 + Math.min(...chart_data)
    var chart_data = chart_data.map(function (data) {return data > threshold_high ? 9 : (data > threshold_low ? 5 : 0)});

//    var chart_data2 = chart_data.map(function (data) {return data * (0.3 + Math.random() * 0.1)});
    var chart_data2 = chart_data.map(function (data) {return data * (0.3 + Math.random()*0.1)});
    var config2 = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Feed Quantity",
          fill: true,
          borderColor: 'orange',//'#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 0,
          data: chart_data,
        },
        {
          label: "Wasted Feed",
          fill: true,
//          backgroundColor: 'aqua',
          borderColor: 'red',//'#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 0,
          data: chart_data2,
        }]
      },
      options: gradientChartOptionsConfiguration
    };
    var myChart = new Chart(ctx, config2);
  },
  initBiomassCharts: function() {
    var chart_labels = ['1000 g','2000 g','3000 g','4000 g','5000 g','6000 g','7000 g','8000 g','9000 g','10000 g'];
    var chart_data = [13,22,29,38,45,40,32,15,10,5];
    var chart_data2 = [14,15,33,42,46,38,40,21,9,2];
    var config = {
      type: 'bar',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Current Tank",
          backgroundColor: 'magenta',
          borderColor: 'magenta',
          borderWidth: 1,
          data: chart_data,
        },
        {
          label: "Average",
          backgroundColor: 'darkgreen',
          borderColor: 'darkgreen',
          borderWidth: 1,
          data: chart_data2,
        }]
      },
      options: gradientChartOptionsConfiguration
    };
    var ctx = document.getElementById('weightHistogram').getContext('2d');
    var myChart = new Chart(ctx, config);
    var ctx = document.getElementById('weightChart').getContext('2d');
    dateArray = getDates(new Date().addDays(-100), new Date());
    chart_labels = dateArray.map(function (date) {return `${date.getMonth()}/${date.getDay()}`});
    function getIncreasingArray(length, init, step) {
        var values = [];
        var value = init;
        for (i=0;i<length;i++) {
            value = value + Math.random() * step;
            values.push(value);
        }
        return values;
    }
    chart_data = getIncreasingArray(dateArray.length, 100, 40);
    chart_data = chart_data.map(function (data) {return Math.log(data) * 300 - 800});  //  applying Log

    var bandArray = getRandomArray(chart_data.length, 100, 10);
    bandArray = smoothing(bandArray, 20);
    function addTwoArray(arr1, arr2) { // assert two arrays have same length?
        var results = [];
        for (i=0;i<arr1.length;i++) {
            results.push(arr1[i] + arr2[i]);
        }
        return results
    }
    chart_data_top = addTwoArray(chart_data,bandArray);
    negativeBandArray = bandArray.map(function(data){return -data});
    chart_data_bottom = addTwoArray(chart_data, negativeBandArray);
//    chart_data_top = chart_data.map(function (data) { return data + 20 + Math.random() * 10});
//    chart_data_bottom = chart_data.map(function (data) { return data - 20 + Math.random() * 10});

    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [
//        {
//          label: "Tank 1",
//          fill: true,
//          borderColor: 'purple',//'#d346b1',
//          borderWidth: 2,
//          borderDash: [],
//          borderDashOffset: 0.0,
//          pointBackgroundColor: '#d346b1',
//          pointBorderColor: 'rgba(255,255,255,0)',
//          pointHoverBackgroundColor: '#d346b1',
//          pointBorderWidth: 20,
//          pointHoverRadius: 4,
//          pointHoverBorderWidth: 15,
//          pointRadius: 0,
//          data: chart_data,
//        },
        {
        label: "Weights",
        type: "line",
        backgroundColor: "rgb(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        hoverBorderColor: "rgb(175, 192, 192)",
        fill: false,
        tension: 0,
        data: chart_data,
        yAxisID: 'y',
        xAxisID: 'x'
      },
        {
        label: "Upper Band",
        type: "line",
        backgroundColor: "rgb(75, 192, 255, 0.5)",
        borderColor: "transparent",
        pointRadius: 0,
        fill: 0,
        tension: 0,
        data: chart_data_top,
        yAxisID: 'y',
        xAxisID: 'x'
      },
      {
        label: "Lower Band",
        type: "line",
        backgroundColor: "rgb(75, 192, 255, 0.5)",
        borderColor: "transparent",
        pointRadius: 0,
        fill: 0,
        tension: 0,
        data: chart_data_bottom,
        yAxisID: 'y',
        xAxisID: 'x'
      }]
      },
//      options: gradientChartOptionsConfiguration
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            id: 'x',
            type: 'category',
            ticks: {
                fontColor: 'white',
            }
          }],
          yAxes: [{
            id: 'y',
            ticks: {
              stepSize: 100,
              fontColor: 'white',
            }
          }]
        }
      }
    };
    var myChart = new Chart(ctx, config);
  },
  initGoogleMaps: function() {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8ec3b9"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1a3646"
          }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#334e87"
          }]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#283d6a"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6f9ba5"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3C7680"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#304a7d"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2c6675"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#9d2a80"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#9d2a80"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#b0d5ce"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }
      ]
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function(from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};