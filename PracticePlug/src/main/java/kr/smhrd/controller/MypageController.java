package kr.smhrd.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.smhrd.entity.TB_User;
import kr.smhrd.mapper.TB_MypageMapper;

@Controller
public class MypageController {

	@Autowired
	TB_MypageMapper mapper;
	
	
	@RequestMapping("/profiles")
	public String goProfile() {
		
		return "redirect:/mypage";
	}
	

	
	

}

