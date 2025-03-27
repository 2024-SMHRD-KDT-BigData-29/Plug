package kr.smhrd.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint.Basic;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

import kr.smhrd.entity.Chat;


@Controller
@ServerEndpoint("/echo.do") // --> web socket 전용의 url mapping
public class WebSocketHandler extends TextWebSocketHandler{ 
    
	// 채팅방에 입장한 사람들의 session 정보를 저장하는 객체 --> 계속 공유해야 함(메모리에서 사라지면 안됨)
	private static final List<Session> sessionList=new ArrayList<Session>();
    // 세션 생성 관련하여 log 찍어주는 객체
	private static final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);
    
	// 채팅방 만들기 위한 정보
    // private static final Map<String, List<Session>> room = new HashMap<String, List<Session>>();
    
    // 객체 생성 여부 확인을 위해 생성자에서 출력해보기
    public WebSocketHandler() {
        System.out.println("웹소켓 객체 생성");
    }
    
    // HttpSession과는 아예 별개로 소켓의 Session이다!
    @OnOpen // (1) 
    public void onOpen(Session session) {     
    	// Session -> 입장한 사용자 정보 수집
    	// 현재 --> 1 | 운비 --> 2
        logger.info("Open session id:"+session.getId());
        logger.info("test : 들어오니?");
       
        try {
        	// socket을 사용하는 사용자의 message를 보내줄 주소 정보
        	// 현재가 가지고있는 주소값 --> 1  
            final Basic basic=session.getBasicRemote();
            // 1로 텍스트 데이터 전송해보기(java --> js 웹소켓으로 데이터 전송)
            basic.sendText("join this socket : 채팅방 연결 성공~.");
        }catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
        }
        // sessionList --> 들어온 사용자들을 저장하는 공간 --> 현재를 저장 
        sessionList.add(session);
    }
    
    
    @OnClose // (2) 통로를 닫아주는 용도
    public void onClose(Session session) {
        logger.info("Session "+session.getId()+" has ended");
        // sessionList --> 들어온 사용자 정보를 삭제 
        sessionList.remove(session);
    }
    
    @OnMessage // (3) 메세지 수신 하는 방법 
    public void onMessage(String message, Session session) {
    	// String message --> js에서 받아오는 데이터 
    	
    	
    	// 문자열 데이터만 받아올 수 있음 -> Gson을 이용하여 받아온 채팅을 JAVA객체로 변환
    	Gson gson = new Gson();
    	Chat chatting = gson.fromJson(message, Chat.class);
    	
        logger.info(chatting.getEmail() + " : " + chatting.getContent());
        sendAllSessionToMessage(session, message);
    }
    
    
    
    private void sendAllSessionToMessage(Session self, String message) {
        try {
        	// 만약에 보낸이가 아닌 다른 사람이 보낸경우 전송~
            for(Session session : WebSocketHandler.sessionList) {
                if(!self.getId().equals(session.getId())) {
                    session.getBasicRemote().sendText(message);
                }
            }
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    
}
