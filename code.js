
$.support.cors = true;
$(document).ready(function () {

  // var selectedScrip = 'BANKNIFTY';
  var selectedScrip = localStorage.getItem("selectedScrip");
  pullData(selectedScrip);
  pullFearAndGreed();
  $('#selectedScrip').text(selectedScrip);
  $('#scripChanger option[value="' + selectedScrip + '"]').attr("selected", "selected");
  let timerVal = new Date().toLocaleString();
  $('#timer').text(timerVal);
  setInterval(() => {
    window.location.reload(1);
  }, 300000);



});



function onChangeScrip(value) {
  //selectedScrip
  localStorage.setItem("selectedScrip", value);
  window.location.reload(1);
}

function pullData(selectedScrip) {


  var settings = {
    //MIDCPNIFTY - 10000, NIFTY - 20000, FINNIFTY - 40000
    url: "https://www.nseindia.com/api/option-chain-indices?symbol=" + selectedScrip,
    type: "GET",

  };

  $.ajax(settings).done(function (response) {
    callNseApi(response);
  });

}

function pullFearAndGreed() {


  var settings = {
    //MIDCPNIFTY, NIFTY, FINNIFTY
    url: "https://api.tickertape.in/mmi/now",
    type: "GET",

  };

  $.ajax(settings).done(function (response) {
    updateFearGreed(response);
  });

}

function initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuy, makeFinalDataSell, marketMovers, marketLoosers, totalCeVol, totalPeVol) {
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

    plotOptions: {
      column: {
        borderRadius: '25%'
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

  Highcharts.chart('container4', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Total PE & CE Sell Buy',

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
        borderRadius: '25%',
        // stacking: 'normal'
      }
    },
    colors: [
      '#089981',
      '#f23645',
      '#2caffe',
      '#6b8abc'

    ],
    series: [
      {
        name: 'CE Buyer & PE Sellers',
        data: [marketMovers],
        stack: "AA"

      },
      {
        name: 'CE Sellers & PE Buyers',
        data: [marketLoosers],
        stack: "AA"
      }//totalCeVol,totalPeVol
      ,
      {
        name: 'CE Volume',
        data: [totalCeVol],
        stack: "BB"

      },
      {
        name: 'PE Volume',
        data: [totalPeVol],
        stack: "BB"
      }//totalCeVol,totalPeVol
    ]
  });

  // combinedPeCe.sort((a, b) => (a.y < b.y ? 1 : -1));
  // let newArrayPeCe = combinedPeCe.slice(0, 5);
  // let newStrikeVals = [];
  // let newValues = [];
  // for (let index = 0; index < newArrayPeCe.length; index++) {
  //   newStrikeVals.push(newArrayPeCe[index].name);
  //   newValues.push(newArrayPeCe[index].y);

  // }

  // Highcharts.chart('container4', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Trending Strikes',
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis: {
  //     categories: newStrikeVals,
  //     accessibility: {
  //       description: 'OI'
  //     }
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: 'Values'
  //     }
  //   },
  //   tooltip: {
  //     valueSuffix: ' '
  //   },
  //   plotOptions: {
  //     column: {
  //       pointPadding: 0.2,
  //       borderWidth: 0
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'OI',
  //       colorByPoint: true,
  //       data: newValues
  //     },

  //   ]
  // });


  Highcharts.chart('container5', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'CE Buy Sell Orders With Volume'
    },
    xAxis: {
      categories: makeFinalDataBuy.strikes
    },
    colors: [

      '#f23645',
      '#089981',
      '#0b5394'
    ],
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%',
        // stacking: 'normal'
      }
    },
    series: makeFinalDataBuy.series
  });

  Highcharts.chart('container6', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'PE Buy Sell Orders  With Volume'
    },
    xAxis: {
      categories: makeFinalDataSell.strikes
    },
    colors: [
      '#089981',
      '#f23645',
      '#0b5394'
    ],
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%',
        // stacking: 'normal'
      }
    },
    series: makeFinalDataSell.series
  });


}

function callNseApi(result) {

  let completeData = result.filtered.data;
  let currentUnderlyingValue = result.records.underlyingValue + " ";
  let breakULV;

  if (currentUnderlyingValue.length >= 5) {
    breakULV = currentUnderlyingValue.substr(0, 3);
  }
  else {
    breakULV = currentUnderlyingValue.substr(0, 2);
  }

  // let breakULV = currentUnderlyingValue.substr(0, 3);
  let updateUnderLyingValue = breakULV + "00";
  let allStrikes = result.records.strikePrices;
  let getIndexOfULV = completeData.map(function (o) { return o.strikePrice; }).indexOf(parseInt(updateUnderLyingValue));
  let lastEightStrike = getIndexOfULV - 4;
  let getNextEightStrike = getIndexOfULV + 4;


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
  let peVol = [];
  let ceVol = [];
  let totalCeVol = 0;
  let totalPeVol = 0;
  let marketMovers = 0;
  let marketLoosers = 0;

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
    ceSell.push(completeData[index].CE.totalSellQuantity); //totalTradedVolume
    peVol.push(completeData[index].PE.totalTradedVolume);
    ceVol.push(completeData[index].CE.totalTradedVolume);

    totalCeVol += completeData[index].CE.totalTradedVolume;
    totalPeVol += completeData[index].PE.totalTradedVolume;


    marketMovers += (parseInt(completeData[index].PE.totalSellQuantity) + parseInt(completeData[index].CE.totalBuyQuantity))

    marketLoosers += (parseInt(completeData[index].PE.totalBuyQuantity) + parseInt(completeData[index].CE.totalSellQuantity))

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
  //peVol
  let makeFinalDataSell = {
    'strikes': strikeValues,
    'series': [
      {
        name: 'PE Sell',
        data: peSell,
        // stack: 'AA'
      },

      {
        name: 'PE Buy',
        data: peBuy,
        // stack: 'AA'
      },
      // {
      //   name: 'PE Volume',
      //   data: peVol,
      //   stack: 'BB'
      // },
      {
        type: 'spline',
        step: 'center',
        name: 'Volume',
        data: peVol,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: 'white'
        }
      }

    ]
  };

  let makeFinalDataBuy = {
    'strikes': strikeValues,
    'series': [{
      name: 'CE Sell',
      data: ceSell,
    },

    {
      name: 'CE Buy',
      data: ceBuy,
    },


    {
      type: 'spline',
      step: 'center',
      name: 'Volume',
      data: ceVol,
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      }
    }

    ]
  };

  initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuy, makeFinalDataSell, marketMovers, marketLoosers, totalCeVol, totalPeVol);
  findSupportAndResistance(peOIValues, ceOIValues, strikeValues, currentUnderlyingValue);
  $('#underLye').text(currentUnderlyingValue);


}


function findSupportAndResistance(peOIChangeValues, ceOIChangeValues, strikeValues, currentUnderlyingValue) {


  let getPeMax = Math.max(...peOIChangeValues);
  let getCeMax = Math.max(...ceOIChangeValues);

  let getPeIndex = peOIChangeValues.indexOf(getPeMax);
  let getCeIndex = ceOIChangeValues.indexOf(getCeMax);

  // let checkActionForSupport = parseInt(currentUnderlyingValue) - parseInt(strikeValues[getPeIndex]);
  // let checkActionForResistance = parseInt(strikeValues[getCeIndex]) - parseInt(currentUnderlyingValue);

  // if (checkActionForSupport > checkActionForResistance) {
  //   $('#_actionValue').text('SELL');
  //   $('#_actionValue').addClass('_sell');
  // }

  // if (checkActionForSupport < checkActionForResistance) {
  //   $('#_actionValue').text('BUY');
  //   $('#_actionValue').addClass('_buy');
  // }


  $('#_supportValue').text(strikeValues[getPeIndex]);
  $('#_resistanceValue').text(strikeValues[getCeIndex]);

  saveDataToLocalStorage(strikeValues[getPeIndex], strikeValues[getCeIndex]);



}

function saveDataToLocalStorage(support, resistance) {

  let timerVal = new Date().toLocaleString();

  if (localStorage.getItem("testObject") !== null) {

    var retrievedObject = localStorage.getItem('testObject');
    let parseObj = JSON.parse(retrievedObject);

    parseObj.push({ 'Scrip': localStorage.getItem("selectedScrip"), 'DataOf': timerVal, 'Support': support, 'Resistance': resistance });

    localStorage.setItem('testObject', JSON.stringify(parseObj));

    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

  }
  else {

    let newObj = [];

    let createData = { 'Scrip': localStorage.getItem("selectedScrip"), 'DataOf': timerVal, 'Support': support, 'Resistance': resistance };

    newObj.push(createData);

    localStorage.setItem('testObject', JSON.stringify(newObj));

    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));


  }




}

//_feerAndGreedValue   

function updateFearGreed(response) {
  $('#_feerAndGreedValue').text(parseInt(response.data.currentValue));

  if (response.data.currentValue >= 0 && response.data.currentValue < 30) {
    $('#_actionValue').text('BUY');
    $('#_actionValue').addClass('_buy');
  }

  if (response.data.currentValue >= 30 && response.data.currentValue < 50) {
    $('#_actionValue').text('BUY');
    $('#_actionValue').addClass('_buy');
  }

  if (response.data.currentValue >= 50 && response.data.currentValue < 70) {
    $('#_actionValue').text('Wait To Sell');
    $('#_actionValue').addClass('_sell');
  }

  if (response.data.currentValue >= 70) {
    $('#_actionValue').text('SELL');
    $('#_actionValue').addClass('_sell');
  }

}

function showTodaysSupportResistance() {

  var retrievedObject = localStorage.getItem('testObject');
  let parseObj = JSON.parse(retrievedObject);
  let tablebody = '';
  for (let index = 0; index < parseObj.length; index++) {

    ////modalBody
    tablebody += '<tr>' + '<td>' + parseObj[index]['Scrip'] + '</td><td>' + parseObj[index]['DataOf'] + '</td><td>' + parseObj[index]['Support'] + '</td><td>' + parseObj[index]['Resistance'] + '</td>' + '</tr>';


  }

  $('#modalBody').html(tablebody);

}