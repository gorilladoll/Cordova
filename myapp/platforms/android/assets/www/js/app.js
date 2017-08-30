$(function(){
    var WD3 = function(){
        this.alert = function(txt){
            var Alert = $(".MyAlert");
            var Txt = $(".MyAlertBox p");
            var ButtonOk = $(".AlertBtnOk");

            Alert.show();
            Txt.text(txt);
            ButtonOk.unbind("click");
            ButtonOk.click(function(){
                Alert.hide();
            }); 
        };
    };

    var wd3 = new WD3();
    $(".btn1").click(function(){
        window.alert("안녕하세요!");
    });

    $(".btn2").click(function(){
        wd3.alert("안녕하세요?");
    });
});
