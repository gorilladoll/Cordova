# Cordova
Create SNS and Gallery Using Cordova 

코르도바
.click(function(){

});

해당 함수의 경우 무명함수이며 click이라는 이벤트가 발생시에 호출 되기 때문에 이벤트 핸들러 함수라고 부른다.
또한 이 이벤트는 클릭시 콜백을 이용하여 가져오게 되는데 가져오게 될 시 시작시점과 실행시점은 각각 다른 위치이다.

.ajax({
	url : ‘’ -> 서버의 주소
	data: {} -> 전송 할 데이터
	dataType: ‘’ -> 서버로 부터 전송받는 데이터
	success: function(data) {} ->전송 완료시 실행(여기서 data의 경우 서버에서 클라이언트 쪽으로 보내는 데이터) 
	error: function(){} ->전송 실패시 실행
});

Data{id:id,pw:pw}<<에서 
앞의 ID의 경우 서버에서 $_GET[‘id’]<<로 설정한 값
뒤의 ID의 경우 이용자가 입력한 ID값

success에서 data.result의 경우
data.result인 이유는 서버에서 result = array('result' => 'success')형태로 전송했기 때문
 
 
 =============================
 코르도바

Navigator : 브라우저 객체

카메라를 불러오는 경우
navigator.camera

카메라 객체의 사진을 가져오는 메소드
navigator.camera.getPicture(성공콜백함수,실패콜백함수,[,선택사항]);
-속성
	quality : 사진 이미지의 저장 품질
	
	destinationType : 반환할 사진 이미지의 타입 지정
	예) Camera.DestinationType.Data_URL(기본값)
		Camera.DestinationType.FILE_URI
	
	sourceType : 사진 이미지 소스 대상을 지정(안드로이드에서는 무의미)
	예)	Camera.PictureSourceType.PHOTOLIBRARY
		Camera.PictureSourceType.SAVEPHOTOALBUM
		Camera.PictureSourceType.CAMERA

	mediaType : 미디어 유형 지정(이미지,동영상 등)
	예)	Camera.MediaType.PICTURE
		Camera.MediaType.VIDEO
		Camera.MediaType.ALLMEDIA

	encodingType : 사진 이미지 압축 형식 지정
	예)	Camera.EncodingType.JPEG
		Camera.EncodingType.PNG

	targetWidth : 대상 이미지의 넓이 지정

	targetHeight : 대상 이미지의 높이 지정

lastIndexOf
-가장 마지막부터 괄호안의 조건문자까지 문자를 탐색
-+1 등 조건을 이용하여 / 다음인지 아닌지를 표시

JSON&&JSON.parse(response) || $.parseJSON(response);
-브라우저에서 JSON을 지원하는 경우 JSON.parse(response)를 사용하며
-브라우저에서 JSON을 지원하지 않는경우 $.parseJSON(response)를 사용
-결론적으로 이야기 하면 지원하거나 지원하지 않거나 상관없이 JSON 객체로 변환


 
 =============================
 
 코르도바 14장

var WD3 = function(){
	this.alert = function(txt){
		//여기서 this.alert는 생성자와 같음
	}
}

이 것을 확장하여 메뉴를 만들 수 있음

인터페이스 : 해당 기술을 사용하기위해 만든 것(ex-UserInterface)

 
 =============================
