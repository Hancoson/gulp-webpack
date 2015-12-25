/**
 * Created by Guoxing.han on 2015-11-16.
 */
var main1 = require('./layout/main1.js')();
var main2 = require('./layout/main2.js')();
var ajax = require('./layout/ajax.js');
//console.log(1);
//console.log(2);
//console.log(3);
var url='../_json/start.json',
    type="get",
    dataType="json",
    data=2,
    err=1;
ajax(url,type,dataType,data,err).done(function(data){
    console.log(data[0].msg);
});

