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
	
	@RequestMapping("/login.do")
	public String goLogin() {
// 매개변수 TB_User user, HttpServletRequest request	
//		TB_User loginUser = mapper.goLogin(user);
//		
//		request.getSession().setAttribute("loginUser", loginUser);
//		
		return "login";
	}
	
	
	@RequestMapping("/join.do")
	public String goJoin() {
		
//		mapper.goJoin(user);
//		model.addAttribute("id",user.getUser_id());
		
		return "join";
	}
	
	

}
