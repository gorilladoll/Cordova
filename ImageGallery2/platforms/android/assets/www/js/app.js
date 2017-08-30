$(function(){
    $(".Main").show();
    $(".Upload").hide();
    $(".Gallery").hide();

    //메인화면
    //이미지 업로드 버튼
    $(".mainBtnUpload").click(function(){
        $(".Main").hide();
        $(".Upload").show();
    });

    //갤러리 보기 버튼
    $(".mainBtnGallery").click(function(){
        $(".Main").hide();
        $(".Gallery").show();
        loadImages();
    });

    //업로드 화면
    //업로드 버튼
    $(".uploadBtnUpload").click(function(){
        navigator.camera.getPicture(function(imageURI){
            var options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";

            var param = {};

            options.params = param;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI,"localhost:80/imageGallery/bin/uploadImage.php",
            function(r){
                //Success
                var response = r.response;
                var result = JSON && JSON.parse(response) || $.parseJSON(resoponse);

                if(result.result == "success"){
                    var message = result.imageName;
                    
                    window.alert("업로드 되었습니다");
                    $(".Upload").hide();
                    $(".Gallery").show();
                    loadImages();
                } else {
                    window.alert("오류가 발생하였습니다.");
                }
            },
            function(error){
                //Failed
                window.alert("An error has occurred: Code ="+error.code);
                window.alert("서버 접속 오류가 발생하였습니다");
            },options);
        },function(message){
            window.alert("오류가 발생하였습니다.");
        },
        {
            quality:50,
            destinationType:Camera.DestinationType.FILE_URI,
            sourceType:Camera.PictureSourceType.PHOTOLIBRARY
        });
    });

    //취소버튼
    $(".uploadBtnCancel").click(function(){
        if(window.confirm("업로드를 취소하시겠습니까?")){
            $(".uploadFile").val("");

            $(".Upload").hide();
            $(".Main").show();
        }
    });

    //갤러리 화면
    //이미지 불러오기
    var loadImages = function(){
        var target = $(".Images").empty();

        $.ajax({
            url:"localhost:80/imageGallery/bin/load.php",
            data:{},
            dataType:"jsonp",
            success:function(data){
                //성공
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt ; i++){
                        var imageName = data.data[i].imageName;
                        $("<img />").attr("src","localhost:80/image/"+imageName).appendTo(target);
                    }

                    if(cnt == 0)
                        $("<p></p>").text("업로드 된 이미지가 없습니다.").appendTo(target);
                    
                    $(".Gallery > p").text("총" + i +"점의 이미지가 업로드 되었습니다.");
                }
                //오류
                else {
                    window.alert("오류가 발생하였습니다.");
                }
            }, error: function(){
                window.alert("서버 접속 오류가 발생하였습니다.");
            }
        });
    };

    //메인으로 버튼
    $(".galleryBtnMain").click(function(){
        $(".Gallery").hide();
        $(".Main").show();
    });

    //이미지 업로드 버튼
    $(".galleryBtnUpload").click(function(){
        $(".Gallery").hide();
        $(".Upload").show();
    });
});