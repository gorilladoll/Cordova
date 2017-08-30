$(document).ready(function(){
  //reset LocalStorage
  if(!localStorage['app_task_init']){
    localStorage['app_task_init'] = "true";
    localStorage['app_task_cnt'] = 0;
  }

  function Redraw(){
    //로컬 스토리지에 저장된 데이터를 불러와 일정을 다시 선택하는 함수
    var cnt = parseInt(localStorage['app_task_cnt']);
    //현재 저장된 개수 불러오기

    $('.TaskWrap').empty();
    //태그 초기화(자식 태그를 모두 제거 -> 일정을 모두 제거)

    for(var i = 0; i < cnt; i++){
      var savedData = localStorage['app_task_'+i];

      if(!savedData) {
        continue;
      }
      var item = $('<div></div>').addClass('Task').attr('data-id',i);
      var p = $('<p></p>').text(savedData).appendTo(item);

      $('<input />').attr('type','button').addClass('BtnEdit').val('수정하기').appendTo(item);
      $('<input />').attr('type','button').addClass('BtnDel').val('삭제하기').appendTo(item);

      item.appendTo($('.TaskWrap'));
    }
  }

  Redraw();

  $('.BtnAdd').click(function(){
    var input = window.prompt('일정을 입력하세요');

    if(!input) return false;
    
    var cnt = parseInt(localStorage['app_task_cnt']);
    //개수 불러오기

    var item = $('<div></div>').addClass('Task').attr('data-id',cnt);
    $('<p></p>').text(input).appendTo(item);
    $('<input />').attr('type','button').addClass('BtnEdit').val('수정하기').appendTo(item);
    $('<input />').attr('type','button').addClass('BtnDel').val('삭제하기').appendTo(item);

    item.appendTo($('.TaskWrap'));
    //로컬 스토리지에 저장
    localStorage['app_task_'+cnt] = input;
    //로컬 스토리지에 저장
    cnt++;
    //개수 증가
    localStorage['app_task_cnt'] = cnt;
  });

  $('.BtnInit').click(function(){
    if(window.confirm('일정을 초기화 하시겠습니까')){
      $('.TaskWrap').empty();

      var cnt = parseInt(localStorage['app_task_cnt']);
      for(var i = 0 ; i < cnt ; i++){
        localStorage.removeItem('app_task_'+i);
        localStorage['app_task_cnt'] = 0;
      }
    }
  });
  //초기화 버튼

  $(document.body).on('click','.BtnEdit',function(){
    var newInput = window.prompt('수정할 일정을 입력');

    if(!newInput){
      return false;
      //값을 입력하지 않으면 아무것도 하지 않음
    }

    var id = $(this).parent().attr('data-id');
    //부모 태그에 data-id속성에 기록된 위치를 가져옴
    $('div[data-id='+id+']>p').text(newInput);
    //로컬 스토리지에 새로 저장
  });

  $(document.body).on('click','BtnDel',function(){
    if(window.confirm('해당 일정을 삭제 하시겠습니까?')){
      var id = $(this).parent().attr('data-id');
      //부모 태그에서 data-id속성에 기록된 위치를 가져옴

      $(this).parent().remove();
      localStorage.removeItem('app_task_'+id);
    }
  });
});
