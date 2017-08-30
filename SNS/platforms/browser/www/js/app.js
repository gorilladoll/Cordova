$(function(){
    //변수
    var currentUser= null;

    //로그인 화면 출력
    $(".Login").show();
    
    /*로그인화면*/
    //로그인 버튼
    var isLogin = false;
    $(".loginBtnLogin").click(function(){
        if(isLogin)
            return false;                           //이미 로그인 중이라면 수행하지 않고 함수를 나감
        var id = $(".loginTxtId").val();
        var pw = $(".loginTxtPw").val();
        
        if(!id){
            window.alert("아이디를 입력하세요");
            return false;
        } else if(!pw){
            window.alert("비밀번호를 입력하세요");
            return false;
        }
        isLogin = true;                             //로그인 시도

        $.ajax({
            // url: "http://localhost:80/sns/lib/login.php",
            url:"http://172.19.1.70:80/sns/lib/login.php",
            data:{
                id:id,pw:pw
            },
            dataType:"jsonp",
            success: function(data){
                if(data.result == "success"){
                    window.alert("로그인 성공");
                    $(".Login").hide();
                    $(".Main").show();

                    $(".NaviPadding > p").html("안녕하세여,<b>"+id+"<b>님");
                    currentUser = id;
                    loadPosts();    
                } else if(data.result == "wrong"){  //로그인 실패 잘못된 값
                    window.alert("잘못된 아이디나 비밀번호를 입력하셨습니다.");
                } else {                            //로그인 오류
                    window.alert("오류가 발생하였습니다.");
                }

                isLogin = false;
            },
            error: function(){
                window.alert("서버 접속 오류가 발생하였습니다.");
                isLogin = false;
            }
        });
    });

    var isJoin = false;
    //회원가입 버튼
    $(".loginBtnJoin").click(function(){
        $(".Login").hide();
        $(".Join").show();        
    });

    //회원가입 화면
    //회원가입 버튼
    $(".joinBtnJoin").click(function(){
        if(isJoin)
            return false;

        var id = $(".joinTxtId").val();
        var pw = $(".joinTxtPw").val();
        var pwc = $(".joinTxtPwc").val();

        if(!id){
            window.alert("아이디를 입력하세요");
            return false;
        } else if(!pw){
            window.alert("비밀번호를 입력하세요");
            return false;
        } else if(pw != pwc){
            window.alert("비밀번호가 일치하지 않습니다");
            return false;
        }
        isJoin = true;

        $.ajax({
            // url: "http://localhost:80/sns/lib/join.php",
            url:"http://172.19.1.70:80/sns/lib/join.php",
            data:{
                id:id,pw:pw
            },
            dataType:"jsonp",
            success: function(data){
                if(data.result == "success"){
                    window.alert("회원가입 완료! 메인화면으로 돌아갑니다");
                    $(".Join").hide();
                    $(".Login").show();
                } else {
                    window.alert("오류가 발생하였습니다");
                }
                isJoin = false;
            },
            error: function(){
                window.alert("서버 접속 오류가 발생하였습니다");
                isJoin = false;
            }
        });
    });

    //회원가입 취소 버튼
    $(".joinBtnCancel").click(function(){
        if(window.confirm("가입을 취소하시겠습니까")){
            $(".Join").hide();
            $(".Login").show();
        }
    });

    //메인화면
    //게시글과 댓글을 불러와 화면에 출력하는 함수
    var loadPosts = function(){
        $(".Items").empty();

        $.ajax({
            // url: "http://localhost:80/sns/lib/load.php",
            url: "http://172.19.1.70:80/sns/lib/load.php",
            data:{},
            dataType:"jsonp",
            success: function(data){
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0 ; i < cnt ; i++){
                        var id = data.data[i].id;
                        var subject = data.data[i].subject;
                        var content = data.data[i].content;
                        var writer = data.data[i].writer;
                        var writedate = data.data[i].writedate;

                        var item = $("<div></div>").attr("data-id",id).addClass("Item");
                        var itemText = $("<div></div>").addClass("ItemText").appendTo(item);

                        $("<h4></h4>").text(subject).appendTo(itemText);
                        $("<h6></h6>").text("작성시간 : "+ writedate).appendTo(itemText);
                        $("<p></p>").text(content).appendTo(itemText);

                        if(writer == currentUser){
                            var itemButtons = $("<div></div>").addClass("ItemButtons").appendTo(itemText);
                            $("<button></button>").addClass("mainBtnDel AppBtnRed").text("삭제하기").appendTo(itemButtons);
                        }

                        //댓글
                        var comment = $("<div></div>").addClass("Comment").appendTo(item);
                        $("<input />").attr({
                            type : "text",
                            placeholder : "댓글입력..", 
                        }).addClass("itemTxtComment").appendTo(comment);
                        $("<button></button>").addClass("commentBtnWrite AppBtnBlue").text("댓글달기").appendTo(comment);

                        //댓글 목록이 출력 되는 곳
                        $("<div></div>").addClass("Comments").appendTo(comment);
                        item.appendTo($(".Items"));
                        loadComment(id);
                    }
                } else {
                    window.alert("오류가 발생하였습니다");
                    $(".Main").hide();
                    $(".Login").show();
                }
            },
            error: function(){
                window.alert("서버 접속 오류가 발생하였습니다");
                $(".Main").hide();
                $(".Login").show();
            }
        })
    };

   var loadComment = function(postId){
        if(!postId)
            return false;
        
        var target = $("div.Item[data-id="+postId+"] .Comments");

        //데이터를 ajax로 호출
        $.ajax({
            url:"http://172.19.1.70:80/sns/lib/commentLoad.php",
            // url: "http://localhost:80/sns/lib/commentLoad.php",
            data:{
                postId:postId,
            },
            dataType:'jsonp',
            success: function(data){
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt ; i++){
                        var id = data.data[i].id;
                        var content = data.data[i].content;
                        var writer = data.data[i].writer;

                        var commentItem = $('<div></div>').addClass('CommentItem').attr('data-id',id);
                        $('<h4></h4>').text(writer).appendTo(commentItem);
                        $('<p></p>').text(content).appendTo(commentItem);
                        $('<button></button>').addClass('AppBtnRed commentBtnDel').text('삭제').appendTo(commentItem);
                        commentItem.appendTo(target);
                    }
                } else {
                    window.alert("오류가 발생하였습니다.");
                }
            },
            error: function(){
                window.alert("서버 접속 오류가 발생하였습니다.");
            }
        });
    };


    //작성한 글 삭제
    $(document.body).on("click",".mainBtnDel",function(){
        if(window.confirm("삭제하시겠습니까?")){
            var id = $(this).parent().parent().parent().attr("data-id");
            var removeTarget = $(this).parent().parent().parent();

            $.ajax({
                url: "http://172.19.1.70:80/sns/lib/del.php",
                // url: "http://localhost:80/sns/lib/del.php",
                data:{
                    postId:id
                },
                dataType:"jsonp",
                success: function(data){
                    if(data.result == "success"){
                        removeTarget.remove();
                    } else {
                        window.alert("오류가 발생하였습니다.");
                    }
                },
                error: function(){
                    window.alert("서버 접속 오류가 발생하였습니다.");
                }
            });
        }
    });

    //댓글 달기
    var isComment = false;                                                  //댓글 달고있는지를 확인하는 변수
    $(document.body).on("click",".commentBtnWrite",function(){
        if(isComment)
            return false;
        
        var parentId = $(this).parent().parent().attr("data-id");
        var content = $(this).prev().val();
        var comments = $(this).next();                                      //나중에 댓글 추가할 Comments DOM을 불러옵니다

        if(!content){
            window.alert("댓글을 입력하세요!");
            return false;
        }
        isComment = true;

        $.ajax({
            url: "http://172.19.1.70:80/sns/lib/commentPost.php",
            // url: "http://localhost:80/sns/lib/commentPost.php",
            data:{
                parentId:parentId,
                content:content,
                writer:currentUser
            },
            dataType:"jsonp",
            success:function(data){
                if(data.result == "success"){
                    var lid = data.lastId;
                    var commentItem = $("<div></div>").addClass("CommentItem").attr("data-id",lid); //나중에 삭제할 떄 필요한 댓글번호
                    $("<h4></h4>").text(currentUser).appendTo(commentItem); //댓글 작성자(현재 작성자)
                    $("<p></p>").appendTo(commentItem);                      //댓글 내용
                    $("<button></button>").addClass("AppBtnRed commentBtnDel").text("삭제").appendTo(comments);

                    commentItem.appendTo(comments);
                } else {
                    window.alert("오류가 발생하였습니다");
                }
                
                isComment = false;
            },
            error: function(){
                window.alert("서버 접속 오류가 발생하였습니다");
                isComment = false;
            }
        });
    });

    $(document.body).on("click",".commentBtnDel",function(){
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            var id = $(this).parent().attr("data-id");
            var removeTarget = $(this).parent();

            $.ajax({
                // url: "http://localhost:80/sns/lib/lib/commentDel.php",
                url:"http://172.19.1.70:80/sns/lib/commentDel.php",
                data:{
                    postId:id
                },
                dataType:"jsonp",
                success: function(data){
                    if(data.result == "success"){
                        removeTarget.remove();
                    } 
                    else {
                        window.alert("오류가 발생하였습니다");
                    }
                },
                error: function(){
                    window.alert("서버 접속 오류가 발생하였습니다");
                }
            });
        }
    });

    $(".mainBtnWrite").click(function(){
        $(".Main").hide();
        $(".Write").show();

        $(".writeTxtSubject").val("");
        $(".writeTxtContent").val("");
    });

    $(".mainBtnLogout").click(function(){
        if(window.confirm("로그아웃 하시겠습니까?")){
            window.location.reload(true);
        }
    });
    
    /* 글쓰기 화면 */
    var isPost = false;         //작성중인 게시글인지 체크
    $(".writeBtnWrite").click(function(){
        if(isPost)
            return false;
        
        var subject = $(".writeTxtSubject").val();
        var content = $(".writeTxtContent").val();

        if(!subject){
            window.alert("글 제목을 입력해 주세요");
            return false;
        } else if(!content){
            window.alert("글 내용을 입력해 주세요");
            return false;
        }

        if(window.confirm("글을 작성하시겠습니까?")){
            isPost = true;

            $.ajax({
                // url: "http://localhost:80/sns/lib/post.php",
                url: "http://172.19.1.70:80/sns/lib/post.php",
                data:{
                    subject:subject,
                    content:content,
                    writer:currentUser
                },
                dataType:"jsonp",
                success:function(data){
                    if(data.result == "success"){
                        $(".Write").hide();
                        $(".Main").show();
                        loadPosts();
                    } else {
                        window.alert("오류가 발생하였습니다.");
                    }
                    
                    isPost = false;
                },
                error:function(){
                    window.alert("서버 전송 오류가 발생하였습니다.");
                    isPost = false;
                }
            });
        }
    });

    $(".writeBtnCancel").click(function(){
        if(window.confirm("작성을 취소하시겠습니까?")){
            $(".Write").hide();
            $(".Main").show();
            loadPosts();
        }
    });
});