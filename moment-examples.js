var moment = require('moment');

var now = moment();

//console.log(now.format());
//
//console.log(now.format('X'));
//
//console.log(now.valueOf());

var timestamp = 1449602164683;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a'));


//now.subtract(1, 'year');
//console.log(now.format());
//
//console.log(now.format('Do-MMM-YYYY, h:mm:ss a'));

console.log(123)
console.log(321)