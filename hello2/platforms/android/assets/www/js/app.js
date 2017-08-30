$(document).ready(function(){
  if(!localStorage['app_task_init']){
    localStorage['app_task_init'] = true;
    localStorage['app_task_cnt'] = 0;
  }

  function Redraw(){
    var cnt = parseInt(localStorage['app_task_cnt']);
    $('.TaskWrap').empty();
    for(var i = 0; i < cnt ;i++){
      var savedData = localStorage['app_task_'+i];
      if(!savedData) continue;
      var item = $('<div></div>').addClass('Task').attr('data-id',i);
      var p = $('<p></p>').tex(savedData).appendTo(item);
    }
  }
});
