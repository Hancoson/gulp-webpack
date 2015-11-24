/**
 * Created by Guoxing.han on 2015-11-16.
 */
var common = require('./layout/common.js')();
var main = require('./layout/main.js')();
console.log(1);
console.log(2);
console.log(3);

(function(){
    var Message=function() {
        //document.write(' 1111');
        
        console.log(111111);
    };
    //console.log(typeof module != 'undefined' && module.exports );
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Message;
    } else if (typeof define === "function" && (define.cmd || define.amd)) {
        define(function (require, exports, module) {
            return Message;
        });
    } else {
        window.Message = Message;
    }
})();