package kr.smhrd.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

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

	@RequestMapping("/login.do")
	public String Login(TB_User user, HttpServletRequest request) {

		TB_User loginUser = mapper.goLogin(user);

		request.getSession().setAttribute("loginUser", loginUser);

		return "plug";

	}


	@RequestMapping("/join.do")
	public String goJoin2(Model model , TB_User user) {
		
	mapper.goJoin(user);
//	model.addAttribute("id",user.getUser_id());
	System.out.println(user.getUser_id());
		return "login";
	}

	@RequestMapping("/join")
	public String Join2() {

		return "join";
	}
	@RequestMapping("/plug")
	public String PLUG2() {
		
		return "PLUG";
	}

	@RequestMapping("/login")
	public String Login() {
		
		return "login";
	}
	
	
	
}
