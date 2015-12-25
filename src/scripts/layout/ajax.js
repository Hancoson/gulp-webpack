/**
 * Created by Guoxing.han on 2015-11-24.
 */
module.exports = function(url,type,dataType,data,err) {
    return $.ajax({
        url     : url,
        type    : type,
        dataType: dataType,
        data    : data
    }).fail(function () {
        alert(err);
    })
};