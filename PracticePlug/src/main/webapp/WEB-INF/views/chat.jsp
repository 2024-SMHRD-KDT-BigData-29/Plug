<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Bootstrap Example</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<style type="text/css">
.ChatWrapper {
	width: 100%;
	height: 100%;
}

#Chatting {
	
	width: 60%;
	height: 400px;
	background-color: #A9F5F2;
}

#Chatting-send{
	width: 60%;
}
.content {
	width: 100%;
	height: 5%;
}
.my{
	text-align : right;
}
.others{
	text-align : left;
}
</style>

</head>
<body>

	<div class="container">
		<h2>WebSocket Chatting</h2>
		<div class="panel panel-default">
			<div class="panel-heading">채팅구현하기</div>
			<div class="panel-body" align="center">
			
				<div class="ChatWrapper">
					<div id="Chatting">
					</div>
					
					<br>
					
					<div id = "Chatting-send">
						<div class="form-group">
							<label class="control-label col-sm-2" for="email">Email:</label>
							<div class="col-sm-8">
								<input type="email" class="form-control" id="email"
									placeholder="Enter email" name="email">
							</div>
							<button id="eCheck" class="btn btn-success col-sm-2">닉네임확정</button>
						</div>
						<br>
						<div class="form-group">
							<label class="control-label col-sm-2" for="content">Content:</label>
							<div class="col-sm-8">
								<textarea  rows="5" class="form-control" id="content" name="content"></textarea>
							</div>
						</div>
						<div class="form-group">
							<button class="btn btn-info col-sm-2" id="sendMsg" disabled>전송</button>						
						</div>
					</div>

				</div>

			</div>
			<div class="panel-footer">빅데이터과정 - 임영주</div>
		</div>
	</div>
	
	
	<script type="text/javascript">
		// 웹소켓
	    let websocket;
		let chat = $('#Chatting');
		let email;
		
		// 페이지가 로드 되면 websocket과 연결
		$(document).ready(connect)
		
		
		$('#sendMsg').on('click', function(){
			
			sendMessage();
			console.log("메세지 전송");
			
			
		});
		
		// 이메일을 확정해야 사용할 수 있게 설정
		$('#eCheck').on("click", emailCheck)
		
		function emailCheck(){
			email = $('#email').val();
			console.log(email)
			
			if(email.length != ''){
				$('#email').attr('readonly', 'readonly');
				$('#sendMsg').removeAttr('disabled');
			}
			
			
		}
	
	    // 웹 소켓 연결하는 방법
	    function connect() {
	        // 웹소켓 주소
	        // ws: websocket 프로토콜
	        var wsUri = "ws://localhost:8085/myapptest/echo.do";
	        // 소켓 객체 생성
	        websocket = new WebSocket(wsUri);
	        //웹 소켓에 이벤트가 발생했을 때 호출될 함수 등록
	        websocket.onopen = onOpen;
	        websocket.onclose = function(evt){
	        	console.log(evt);
	        	console.log("세션종료")
	        }
	        
	        // ****
	        websocket.onmessage = onMessage;
	      
	        console.log('연결완료');
	        console.log(websocket)
	    }
	    
	    //웹 소켓에 연결되었을 때 호출될 함수
	    function onOpen() {
	    	console.log("웹소켓이 열렸습니다~");
	    }
	    
	   // * 1 메시지 전송
	   function sendMessage(){
		   
		   // email과 content를 가져오기!
	  		const data = {
                "email" : email,
                "content" : $('#content').val()
            };
              
             
            let jsonData = JSON.stringify(data);
		    
            // java로 데이터를 보내는 방법
		    websocket.send(jsonData);
		    console.log("메세지 보내기");
		    
		    let textDiv = document.createElement('div');
    		let newText = document.createTextNode($('#content').val());
    		textDiv.appendChild(newText);
    		textDiv.className += 'content';
    		console.log(textDiv)
    		// 사용자 구분해서 좌우 정렬
    		textDiv.className += ' my';
    		chat.append(
    				textDiv
    		);
		   
		   
	   }
	   
	    // * 2 메세지 수신
	    function onMessage(evt) {
	    	console.log(evt);
	    	
	    	if(evt.data.includes("join this socket")){
	    		// 단순히 채팅방에 연결된 경우
	    		chat.append("====환영합니다.====")
	    	}else{
	    		let finaldata = JSON.parse(evt.data);
		    	console.log(finaldata);
	    		// Div 생성하고, 글자 집어넣기~
	    		let textDiv = document.createElement('div');
	    		let newText = document.createTextNode(finaldata.content);
	    		textDiv.appendChild(newText);
	    		textDiv.className += 'content';
	    		textDiv.className += ' others';
	    		
	    		// div화면에 추가하기
	    		chat.append(
	    				textDiv
	    		);
	    		
	    	}
	   }
	
	</script>

</body>
</html>
