
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
  }, 200000);
  bseDataPuller();



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

function initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuy, makeFinalDataSell, marketMovers, marketLoosers, totalCeVol, totalPeVol, makeVolumesGraph, makeFinalDataOIAndvolsum) {
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

  Highcharts.chart('container2', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Volumes'
    },
    colors: [
      '#089981',
      '#f23645'
    ],
    xAxis: {
      categories: makeVolumesGraph.strikes
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: '25%'
      }
      // line: {
      //   dataLabels: {
      //     enabled: true
      //   },
      //   enableMouseTracking: true
      // }
    },
    series: makeVolumesGraph.series
  });

  //PE CE

  // Highcharts.chart('container3', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Calls vs Puts',

  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis: {
  //     categories: ['Ratio'],
  //     crosshair: true,
  //   },

  //   plotOptions: {
  //     column: {
  //       borderRadius: '25%'
  //     }
  //   },
  //   colors: [
  //     '#089981',
  //     '#f23645',
  //     '#2caffe',
  //     '#6b8abc'
  //   ],
  //   series: [
  //     {
  //       name: 'PE OI',
  //       data: [totalPE]
  //     },
  //     {
  //       name: 'CE OI',
  //       data: [totalCE]
  //     },
  //     {
  //       name: 'CE Volume',
  //       data: [totalCeVol],
  //       stack: "BB"

  //     },
  //     {
  //       name: 'PE Volume',
  //       data: [totalPeVol],
  //       stack: "BB"
  //     }
  //   ]
  // });

  // Highcharts.chart('container4', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Total PE & CE Sell Buy',

  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis: {
  //     categories: ['Ratio'],
  //     crosshair: true,
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: 'Value'
  //     }
  //   },
  //   tooltip: {
  //     valueSuffix: ' '
  //   },
  //   plotOptions: {
  //     column: {
  //       borderRadius: '25%',
  //       // stacking: 'normal'
  //     }
  //   },
  //   // colors: [
  //   //   '#089981',
  //   //   '#f23645',
  //   //   '#2caffe',
  //   //   '#6b8abc'

  //   // ],
  //   series: [
  //     {
  //       name: 'CE Buyer & PE Sellers',
  //       data: [marketMovers],
  //       stack: "AA"

  //     },
  //     {
  //       name: 'CE Sellers & PE Buyers',
  //       data: [marketLoosers],
  //       stack: "AA"
  //     },
  //     {
  //       name: 'PE OI',
  //       data: [totalPE]
  //     },
  //     {
  //       name: 'CE OI',
  //       data: [totalCE]
  //     },
  //     {
  //       name: 'CE Volume',
  //       data: [totalCeVol],
  //       stack: "BB"

  //     },
  //     {
  //       name: 'PE Volume',
  //       data: [totalPeVol],
  //       stack: "BB"
  //     }
  //     //totalCeVol,totalPeVol
  //     ,
  //     // {
  //     //   name: 'CE Volume',
  //     //   data: [totalCeVol],
  //     //   stack: "BB"

  //     // },
  //     // {
  //     //   name: 'PE Volume',
  //     //   data: [totalPeVol],
  //     //   stack: "BB"
  //     // }

  //     //totalCeVol,totalPeVol
  //   ]
  // });

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

  Highcharts.chart('container8', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'OI + Volume Strikes',
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: makeFinalDataOIAndvolsum.strikes,
      accessibility: {
        description: 'OI + Volume'
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
    colors: [
      '#089981',
      '#f23645'
    ],
    plotOptions: {
      column: {
        borderRadius: '25%'
      }
    },
    series: makeFinalDataOIAndvolsum.series
  });


  // Highcharts.chart('container5', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'CE Buy Sell Orders'
  //   },
  //   xAxis: {
  //     categories: makeFinalDataBuy.strikes
  //   },
  //   colors: [

  //     '#f23645',
  //     '#089981',
  //     '#0b5394'
  //   ],
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     column: {
  //       borderRadius: '25%',
  //       // stacking: 'normal'
  //     }
  //   },
  //   series: makeFinalDataBuy.series
  // });

  // Highcharts.chart('container6', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'PE Buy Sell Orders'
  //   },
  //   xAxis: {
  //     categories: makeFinalDataSell.strikes
  //   },
  //   colors: [
  //     '#089981',
  //     '#f23645',
  //     '#0b5394'
  //   ],
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     column: {
  //       borderRadius: '25%',
  //       // stacking: 'normal'
  //     }
  //   },
  //   series: makeFinalDataSell.series
  // });


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
  let lastEightStrike = 0;
  let getNextEightStrike = 0;

  if (localStorage.getItem("selectedScrip") != 'BANKNIFTY') {
    lastEightStrike = getIndexOfULV - 10;
    getNextEightStrike = getIndexOfULV + 10;

  }
  else {
    lastEightStrike = getIndexOfULV - 8;
    getNextEightStrike = getIndexOfULV + 8;

  }



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
  let totalCeVolCeOi = [];
  let totalPeVolPeOi = [];

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


    totalCeVolCeOi.push(parseInt(completeData[index].CE.totalTradedVolume) + parseInt(completeData[index].CE.openInterest));
    totalPeVolPeOi.push(parseInt(completeData[index].PE.totalTradedVolume) + parseInt(completeData[index].PE.openInterest));



  }

  let makeFinalDataOIChange = {
    'timeStamp': moment().unix(),
    'strikes': strikeValues,
    'series': [{
      name: 'PE OI',
      data: peOIChangeValues
    }, {
      name: 'CE OI',
      data: ceOIChangeValues
    },

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
      // {
      //   type: 'spline',
      //   step: 'center',
      //   name: 'Volume',
      //   data: peVol,
      //   marker: {
      //     lineWidth: 2,
      //     lineColor: Highcharts.getOptions().colors[3],
      //     fillColor: 'white'
      //   }
      // }

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


      // {
      //   type: 'spline',
      //   step: 'center',
      //   name: 'Volume',
      //   data: ceVol,
      //   marker: {
      //     lineWidth: 2,
      //     lineColor: Highcharts.getOptions().colors[3],
      //     fillColor: 'white'
      //   }
      // }

    ]
  };

  let makeVolumesGraph = {
    'timeStamp': moment().unix(),
    'strikes': strikeValues,
    'series': [{
      name: 'PE Volume',
      data: peVol
    }, {
      name: 'CE Volume',
      data: ceVol
    }

    ]
  };

  let makeFinalDataOIAndvolsum = {
    'strikes': strikeValues,
    'series': [{
      name: 'PE Volumes + OI',
      data: totalPeVolPeOi
    }, {
      name: 'CE Volumes + OI',
      data: totalCeVolCeOi
    }]
  };

  initiateGraph(makeFinalDataOIChange, makeFinalDataOI, totalPE, totalCE, combinedPeCe, makeFinalDataBuy, makeFinalDataSell, marketMovers, marketLoosers, totalCeVol, totalPeVol, makeVolumesGraph, makeFinalDataOIAndvolsum);
  findSupportAndResistance(totalPeVolPeOi, totalCeVolCeOi, strikeValues, currentUnderlyingValue, peOIValues, ceOIValues);
  $('#underLye').text(currentUnderlyingValue);

  saveVolOiData('changeOiJson', makeFinalDataOIChange);
  saveVolOiData('volumeJson', makeVolumesGraph);


}


function findSupportAndResistance(peOIChangeValues, ceOIChangeValues, strikeValues, currentUnderlyingValue, peOIValues, ceOIValues) {


  let getPeOiVolMax = Math.max(...peOIChangeValues);
  let getCeOiVolMax = Math.max(...ceOIChangeValues);

  let getPeOiVolIndex = peOIChangeValues.indexOf(getPeOiVolMax);
  let getCeOiVolIndex = ceOIChangeValues.indexOf(getCeOiVolMax);


  let getPeOiChangeMax = Math.max(...peOIValues);
  let getCeOiChangeMax = Math.max(...ceOIValues);

  let getPeOiChangeIndex = peOIValues.indexOf(getPeOiChangeMax);
  let getCeOiChangeIndex = ceOIValues.indexOf(getCeOiChangeMax);

  // let checkActionForSupport = parseInt(currentUnderlyingValue) - parseInt(strikeValues[getPeOiVolIndex]);
  // let checkActionForResistance = parseInt(strikeValues[getCeOiVolIndex]) - parseInt(currentUnderlyingValue);

  // if (checkActionForSupport > checkActionForResistance) {
  //   $('#_actionValue').text('SELL');
  //   $('#_actionValue').addClass('_sell');
  // }

  // if (checkActionForSupport < checkActionForResistance) {
  //   $('#_actionValue').text('BUY');
  //   $('#_actionValue').addClass('_buy');
  // }


  $('#_supportValue').html(strikeValues[getPeOiVolIndex] + " OI + Vol <br>" + strikeValues[getPeOiChangeIndex] + " OI Change");
  $('#_resistanceValue').html(strikeValues[getCeOiVolIndex] + " OI + Vol <br>" + strikeValues[getCeOiChangeIndex] + " OI Change");

  saveDataToLocalStorage(strikeValues[getPeOiVolIndex] + " OI + Vol | " + strikeValues[getPeOiChangeIndex] + " OI Change", strikeValues[getCeOiVolIndex] + " OI + Vol | " + strikeValues[getCeOiChangeIndex] + " OI Change");



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

function copytable(el) {
  var urlField = document.getElementById(el)
  var range = document.createRange()
  range.selectNode(urlField)
  window.getSelection().addRange(range)
  document.execCommand('copy')
}


function saveVolOiData(localStorageItemName, objData) {

  let timerVal = new Date().toLocaleString();

  if (localStorage.getItem(localStorageItemName) !== null) {

    var retrievedObject = localStorage.getItem(localStorageItemName);
    let parseObj = JSON.parse(retrievedObject);

    parseObj.push(objData);

    localStorage.setItem(localStorageItemName, JSON.stringify(parseObj));

    var retrievedObject = localStorage.getItem(localStorageItemName);

    console.log('retrievedObjectobjData: ', JSON.parse(retrievedObject));

  }
  else {

    let newObj = [];

    let createData = objData;

    newObj.push(createData);

    localStorage.setItem(localStorageItemName, JSON.stringify(newObj));

    var retrievedObject = localStorage.getItem(localStorageItemName);

    console.log('retrievedObjectobjData: ', JSON.parse(retrievedObject));


  }

}

//console.log(moment().unix());
//console.log(moment.unix(1704875926).format("YYYY MM DD"));

let nextObj_beData = [
  {
    'timeFrame': 5554646545,
    'strikes': strikeValues,
    'series': [{
      name: 'PE Volumes + OI',
      data: totalPeVolPeOi
    }, {
      name: 'CE Volumes + OI',
      data: totalCeVolCeOi
    }]
  },
  {
    'timeFrame': 5554646545,
    'strikes': strikeValues,
    'series': [{
      name: 'PE Volumes + OI',
      data: totalPeVolPeOi
    }, {
      name: 'CE Volumes + OI',
      data: totalCeVolCeOi
    }]
  }
];

function bseDataPuller() {
  var settings = {
    "url": "https://api.bseindia.com/BseIndiaAPI/api/DerivOptionChain_IV/w?Expiry=19+Jan+2024&scrip_cd=1&strprice=0",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Origin": "https://www.bseindia.com",
      "Referer": "https://www.bseindia.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "TE": "trailers"
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}