

$(document).ready(function () {

  pullData();
  let timerVal = new Date().toLocaleString();
  $('#timer').text(timerVal);
  setInterval(() => {
    window.location.reload(1);
  }, 300000);

});

function pullData() {
  var settings = {

    "url": "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY",
    "method": "GET",
  };

  axios({
    url: "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY",
    method: "GET",
  })
    .then(function (response) {
      callNseApi(response.data);
    });


  // $.ajax(settings).done(function (response) {
  //   callNseApi(response);
  // });

}

function initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe) {
  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'OI Change'
    },
    xAxis: {
      categories: makeFinalDataOIChange.strikes
    },
    colors: [
      '#089981',
      '#f23645'
    ],
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%'
      }
    },
    series: makeFinalDataOIChange.series
  });

  Highcharts.chart('container1', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'OI Overall'
    },
    colors: [
      '#089981',
      '#f23645'
    ],
    xAxis: {
      categories: makeFinalDataOI.strikes
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%'
      }
    },
    series: makeFinalDataOI.series
  });

  //PE CE

  Highcharts.chart('container3', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Calls vs Puts',

    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Ratio'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Value'
      }
    },
    tooltip: {
      valueSuffix: ' '
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    colors: [
      '#089981',
      '#f23645'
    ],
    series: [
      {
        name: 'PE',
        data: [totalPE]
      },
      {
        name: 'CE',
        data: [totalCE]
      }
    ]
  });

  // Trending lines

  combinedPeCe.sort((a, b) => (a.y < b.y ? 1 : -1));
  let newArrayPeCe = combinedPeCe.slice(0, 5);
  let newStrikeVals = [];
  let newValues = [];
  for (let index = 0; index < newArrayPeCe.length; index++) {
    newStrikeVals.push(newArrayPeCe[index].name);
    newValues.push(newArrayPeCe[index].y);

  }

  Highcharts.chart('container4', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Trending Strikes',
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: newStrikeVals,
      accessibility: {
        description: 'OI'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Values'
      }
    },
    tooltip: {
      valueSuffix: ' '
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'OI',
        colorByPoint: true,
        data: newValues
      },

    ]
  });


}

function callNseApi(result) {

  let completeData = result.filtered.data;
  let currentUnderlyingValue = result.records.underlyingValue + " ";
  let breakULV = currentUnderlyingValue.substr(0, 3);
  let updateUnderLyingValue = breakULV + "00";
  let getIndexOfULV = result.records.strikePrices.indexOf(parseInt(updateUnderLyingValue));
  let lastEightStrike = getIndexOfULV - 6;
  let getNextEightStrike = getIndexOfULV + 6;


  let sumTest = '';
  let peOIValues = [];
  let ceOIValues = [];
  let peOIChangeValues = [];
  let ceOIChangeValues = [];
  let strikeValues = [];
  let totalCE = 0;
  let totalPE = 0;
  let combinedPeCe = [];

  for (let index = lastEightStrike; index <= getNextEightStrike; index++) {

    strikeValues.push(completeData[index].PE.strikePrice + " ");
    peOIValues.push(completeData[index].PE.openInterest);
    peOIChangeValues.push(completeData[index].PE.changeinOpenInterest);
    ceOIValues.push(completeData[index].CE.openInterest);
    ceOIChangeValues.push(completeData[index].CE.openInterest);
    combinedPeCe.push({ name: completeData[index].PE.strikePrice + "PE", y: completeData[index].PE.openInterest }, { name: completeData[index].CE.strikePrice + "CE", y: completeData[index].CE.openInterest });

    totalPE += completeData[index].PE.openInterest;
    totalCE += completeData[index].CE.openInterest;



  }

  let makeFinalDataOIChange = {
    'strikes': strikeValues,
    'series': [{
      name: 'PE',
      data: peOIChangeValues
    }, {
      name: 'CE',
      data: ceOIChangeValues
    }]

  };

  let makeFinalDataOI = {
    'strikes': strikeValues,
    'series': [{
      name: 'PE',
      data: peOIValues
    }, {
      name: 'CE',
      data: ceOIValues
    }]
  };

  initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe);
  $('#underLye').text(currentUnderlyingValue);


}