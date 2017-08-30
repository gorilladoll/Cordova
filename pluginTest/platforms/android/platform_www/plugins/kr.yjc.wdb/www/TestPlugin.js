cordova.define("kr.yjc.wdb.test", function(require, exports, module) {
window.echo = function(str, callback) {
    cordova.exec(callback,
                 function(err) {
                    alert("Nothing to echo.");
                 },
                 "TTPlug",
                 "echo",
                 [str]);
};

window.beep = function(duration, callback) {
    cordova.exec(callback,
                 function(err) {
                     alert("Nothing");
                 },
                 "TTPlug",
                 "beep",
                 [duration]);
};

window.getMessage = function(){
    var callbackSuccess = function(result){
        alert(result.name);
    };

    var callbackFail = function(err){
        alert(error);
    };
    cordova.exec(callbackSuccess,callbackFail,"TTPlug","getMessage",[]);
};

window.runJavaScriptFunction = function(functionName){
    var callbackFail = function(error){
        alert(error);
    };

    cordova.exec(null,callbackFail,"TTPlug","runJavaScriptFunction",[functionName]);
}

/*  function SFPluginEcho(){}
    SFPluginEcho.prototype.echo = function(message) {
        cordova.exec(null,null,"TTPlug","echo",[message]);
    };

    SFPluginEcho.prototype.getMessage = function(){
        var callbackSuccess = function(result){
            alert(result.name);
        };

        var callbackFail = function(error){
            alert(error);
        };

        cordova.exec(callbackSuccess,callbackFail,"TTPlug","getMessage",[]);
    }

    SFPluginEcho.prototype.runJavascriptFunction = function(functionName){
        var callbackFail = function(error){
            alert(error);
        };

        cordova.exec(null,callbackFail,"TTPlug","runJavaScriptFunction",[functionName]);
    }

    //function print_message(result){
    //    alert(result.nane);
    //}

    module.exports = new SFPluginEcho();
*/
});
