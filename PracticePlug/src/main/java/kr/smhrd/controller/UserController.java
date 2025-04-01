package kr.smhrd.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartRequest;

import kr.smhrd.entity.TB_User;
import kr.smhrd.mapper.TB_UserMapper;


@Controller
public class UserController {

	@Autowired
	TB_UserMapper mapper;

	@RequestMapping("/")
	public String goLogin2() {
		return "login";
	}

	@RequestMapping("/board")
	public String goboard() {
		return "board";
	}


	@RequestMapping("/login2")
	public String Login(TB_User user, HttpServletRequest request) {

		TB_User loginUser = mapper.goLogin(user);
		
		request.getSession().setAttribute("loginUser", loginUser);
		System.out.println(loginUser);
		loginUser = (TB_User)(request.getSession().getAttribute("loginUser"));
		if (loginUser==null) {
			return "redirect:/login";
		}
		return "plug";
	}

	@RequestMapping("/join2")
	public String goJoin2(TB_User user, HttpServletRequest request) {

		
//		String user_id = request.getParameter("user_id");
//	    String user_pw = request.getParameter("user_pw");
//	    String user_nick = request.getParameter("user_nick");
//	    String user_birthdate = request.getParameter("user_birthdate");
//	    String user_account = request.getParameter("user_account");
//	    String user_addr = request.getParameter("user_addr");
//	    String user_phone = request.getParameter("user_phone");
//	    
//	    user = new TB_User(user_id,user_pw,user_nick,user_birthdate,user_account,user_addr,user_phone);
//	    
	    
	    mapper.goJoin2(user);
	    
		
		// mapper.goJoin(user);
		//	model.addAttribute("id",user.getUser_id());
		//System.out.println(user.getUser_id());
		return "login";
	}

//	@RequestMapping("/join2.do")
//	public String user_join(TB_user user, Model model, HttpServletRequest request) {
//		MultipartRequest multi = null;
//		
//		try {
//		
//			String user_id = multi.getParameter("user_id");
//		    String user_pw = multi.getParameter("user_pw");
//		    String user_nick = multi.getParameter("user_nick");
//
//		}
//		catch(Exception e) {
//			e.printStackTrace();
//		}
//	}

//	@RequestMapping("/messageShow.do")
//	public String messageShow(HttpServletRequest request, Model model) {
//		System.out.println("메시지 조회 요청...");
//		
//		TB_User user = (TB_User)(request.getSession().getAttribute("loginUser"));
//		
//		if(user != null) {
//			List<Message> list = mapper.messageShow(user.getProfile());
//			model.addAttribute("msgList",list);
//		}
//		
//		return "redirect:/mypage";
//	
//	@RequestMapping("/mypage/getUserInfo.do")
//	@ResponseBody
//	public ResponseEntity<TB_User> getUserInfo(HttpServletRequest request) {
//	    TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
//	    System.out.println("getUserInfo 호출, 세션 사용자: " + loginUser);
//	    if (loginUser == null) {
//	        return ResponseEntity.status(401).body(null);
//	    }
//	    return ResponseEntity.ok(loginUser);
//	}
	
	
	
	
	
	
	@RequestMapping("/join")
	public String Join2() {

		return "join";
	}

	@RequestMapping("/plug")
	public String PLUG2() {

		return "plug";
	}

	@RequestMapping("/login")
	public String Login() {

		return "login";
	}

	
	
}
