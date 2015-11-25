/**
 * Created by Guoxing.han on 2015-11-16.
 */
var common = require('./layout/common.js')();
var main = require('./layout/main.js')();
var ajax = require('./layout/ajax.js');
//console.log(1);
//console.log(2);
//console.log(3);

var url='../_json/start.json',
    type="get",
    dataType="jsonp",
    data={
        "qq":123
    },
    err=123;
ajax(url,type,dataType,data,err).done(function(data){
    alert(data);
});