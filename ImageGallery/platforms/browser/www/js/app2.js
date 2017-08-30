$(document).ready(function(){
  // $('.Main').show();
  // $('.Upload').show();
  // $('.Gallery').show();

  $('.Main').show();

        // **메인 화면**
    // [이미지 업로드] 버튼
  $('.mainBtnUpload').click(function(){
    $('.Main').hide();
    $('.Upload').show();
  });


    // [갤러리 보기] 버튼
  $('.mainBtnGallery').click(function(){
    $('.Main').hide();
    $('.Gallery').show();
    loadImages();
  });


        // 업로드 화면
    // [업로드] 버튼
    /////////////////////////////////////////////////////
  $('.uploadBtnUpload').click(function(){
    navigator.camera.getPicture(
      function (imageURI){    //성공 콜백함수
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var param = {};
        options.params = param;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI,
         "http://localhost/ImageGallery/bin/uploadImage.php",
        function(r){
            // Success
            var response = r.response;
            var result = JSON && JSON.parse(response) || $.parseJSON(response);

              if(result.result == "success"){
                window.alert('업로드 되었습니다.');
                $('.Upload').hide();
                $('.Gallery').show();
                loadImages();
              }

              else{
                window.alert('오류가 발생하였습니다. (업로드 성공콜백함수 Success FileTransfer[ft.upload함수])');
              }
        }, // function (r)의 끝나는 부분


        function(error){
          //  Failed
          window.alert('오류 (업로드 성공콜백함수 error Failed)' + "\n" +
                        "An Error has occurred: Code " + error.code);
        },
        options); // ft.upload()의 끝나는 부분
      },   // function(imageURI) 성공콜백함수의  끝나는 부분


      function (message){   // 실패 콜백함수
        window.alert('오류가 발생하였습니다. (업로드 실패 콜백함수)');
      },
      {         // 카메라 옵션
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }
    );
  });   // [업로드 버튼] 끝나는 부분
///////////////////////////////////////////////////////


    // [취소] 버튼
  $('.uploadBtnCancel').click(function(){
    if(window.confirm('업로드를 취소하시겠습니까?')){
        $('.Upload').hide();
        $('.Main').show();
    }
  });

        // **갤러리 화면**
    // 이미지 불러오기
  var loadImages = function(){
    var target = $('.Images').empty();

    $.ajax({
      url: 'http://localhost/ImageGallery/bin/load.php',
      data: {},
      dataType: 'jsonp',
      success: function(data){
        // 성공
          if(data.result == "success"){
            var cnt = data.data.length;

            for(var i = 0; i < cnt; i++){
              var imageName = data.data[i].imageName;
              $('<img />').attr('src', 'http://localhost/ImageGallery/image/'
              + imageName).appendTo(target);
            }
            if(cnt == 0)$('<p></p>').text('업로드 된 이미지가 없습니다.').appendTo(target);

            $('.Gallery > p').text('총 ' + i + '점의 이미지가 업로드 되었습니다.');
          }
        // 오류
        else{
          window.alert('오류가 발생했습니다. (ajax 내부 success중 else(오류))');
        }
      },
      error: function(){
        window.alert('오류가 발생했습니다. (error 오류)');
      }
    });
  };
  ////////////////////////////////////////////////////////////////////

    // [메인으로] 버튼
  $('.galleryBtnMain').click(function(){
    $('.Gallery').hide();
    $('.Main').show();
  });

    // [이미지 업로드] 버튼
  $('.galleryBtnUpload').click(function(){
    $('.Gallery').hide();
    $('.Upload').show();
  });



});