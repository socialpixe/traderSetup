
$.support.cors = true;
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

    url: "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY",
    type: "GET",

  };

  $.ajax(settings).done(function (response) {
    callNseApi(response);
  });

}

function initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuySell) {
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
        borderRadius: '25%',

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


  Highcharts.chart('container5', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'PE CE Buy & Sell'
    },
    xAxis: {
      categories: makeFinalDataBuySell.strikes
    },
    // colors: [
    //   '#089981',
    //   '#f23645'
    // ],
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%',
        stacking: 'normal'
      }
    },
    series: makeFinalDataBuySell.series
  });


}

function callNseApi(result) {

  let completeData = result.filtered.data;
  let currentUnderlyingValue = result.records.underlyingValue + " ";
  let breakULV = currentUnderlyingValue.substr(0, 3);
  let updateUnderLyingValue = breakULV + "00";
  let getIndexOfULV = result.records.strikePrices.indexOf(parseInt(updateUnderLyingValue));
  let lastEightStrike = getIndexOfULV - 6;
  let getNextEightStrike = getIndexOfULV + 3;


  let sumTest = '';
  let peOIValues = [];
  let ceOIValues = [];
  let peOIChangeValues = [];
  let ceOIChangeValues = [];
  let strikeValues = [];
  let totalCE = 0;
  let totalPE = 0;
  let combinedPeCe = [];
  let peBuy = [];
  let peSell = [];
  let ceBuy = [];
  let ceSell = [];

  for (let index = lastEightStrike; index <= getNextEightStrike; index++) {

    strikeValues.push(completeData[index].PE.strikePrice + " ");
    peOIValues.push(completeData[index].PE.openInterest);
    peOIChangeValues.push(completeData[index].PE.changeinOpenInterest);
    ceOIValues.push(completeData[index].CE.openInterest);
    ceOIChangeValues.push(completeData[index].CE.openInterest);
    combinedPeCe.push({ name: completeData[index].PE.strikePrice + "PE", y: completeData[index].PE.openInterest }, { name: completeData[index].CE.strikePrice + "CE", y: completeData[index].CE.openInterest });
    peBuy.push(completeData[index].PE.totalBuyQuantity);
    peSell.push(completeData[index].PE.totalSellQuantity);
    ceBuy.push(completeData[index].CE.totalBuyQuantity);
    ceSell.push(completeData[index].CE.totalSellQuantity);

    totalPE += completeData[index].PE.openInterest;
    totalCE += completeData[index].CE.openInterest;



  }

  let makeFinalDataOIChange = {
    'strikes': strikeValues,
    'series': [{
      name: 'PE OI',
      data: peOIChangeValues
    }, {
      name: 'CE OI',
      data: ceOIChangeValues
    }

    ]

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
  let makeFinalDataBuySell = {
    'strikes': strikeValues,
    'series': [{
      name: 'PE Buy',
      data: peBuy,
      stack: 'AA'
    },
    {
      name: 'PE Sell',
      data: peSell,
      stack: 'AA'
    },
    {
      name: 'CE Buy',
      data: ceBuy,
      stack: 'BB'
    },
    {
      name: 'CE Sell',
      data: ceSell,
      stack: 'BB'
    }]
  };

  initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuySell);
  $('#underLye').text(currentUnderlyingValue);


}