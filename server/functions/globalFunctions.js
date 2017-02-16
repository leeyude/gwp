export function getDatesArray(startDate, endDate){ // format as "101.01.01"
    var startInput = convertToAD(startDate);
    var endInput = convertToAD(endDate);

    var duration = endInput.diff(startInput, 'days');
    var outputArray = [];

    for(i=0; i< duration; i++){
      var outputDate =  moment(startInput).add(i, 'days');
      var outputFormat = convertADtoTWCalYear(outputDate);
      outputArray.push(outputFormat);
    };

    return outputArray;
};

export function convertADtoTWCalYear(thisDate){ // a moment Date with year, month, and date.
  var year = moment(thisDate).year()-1911;
  var month = moment(thisDate).month()+1;
  var day = moment(thisDate).date();

  if(month<10){
    var outputMonth = '0'+month;
  }else{
    var outputMonth = +month;
  };
  if(day<10){
    var outputDay= '0'+day;
  }else{
    var outputDay= day;
  };

  var converted = year+'.'+outputMonth+'.'+outputDay;

  return converted;
};

export function convertToAD(thisDate){ // format as "101.01.01"

  var year = thisDate.substring(0, 3);
  var month = thisDate.substring(4, 6);
  var day = thisDate.substring(7, 9);

  var converted = moment().year(Number(year)+1911).month(Number(month-1)).date(Number(day));

  return converted;
};
