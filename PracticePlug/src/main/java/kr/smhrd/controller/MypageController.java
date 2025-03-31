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
	
	@RequestMapping("/mypage")
	public String goMypage2() {
		return "mypage";
	}
	@RequestMapping("updateUser")
	public String updateUserInfo(TB_User user, HttpServletRequest request) {
		TB_User loginUser = mapper.updateUserInfo(user);
				
		request.getSession().setAttribute("loginUser", loginUser);
		System.out.println(loginUser);
		loginUser = (TB_User)(request.getSession().getAttribute("loginUser"));
		
		return "redirect:/mypage";
	}

//	@RequestMapping("/updateUser")
//  @ResponseBody // JSON 응답을 위해 필요
//    public ResponseEntity<String> updateUser(@RequestBody TB_User user, HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        TB_User loginUser = (TB_User) session.getAttribute("loginUser");
//
//        if (loginUser == null) {
//            return ResponseEntity.status(401).body(null); // 세션이 없으면 401 반환
//        }
//        System.out.println("연결 성공"+loginUser);
//
//        return ResponseEntity.ok("사용자 정보 업데이트 성공"); // 로그인된 사용자 정보 반환
//    }

//	@RequestMapping("/login2")
//	public String Login(TB_User user, HttpServletRequest request) {
//
//		TB_User loginUser = mapper.goLogin(user);
//		
//		request.getSession().setAttribute("loginUser", loginUser);
//		System.out.println(loginUser);
//		loginUser = (TB_User)(request.getSession().getAttribute("loginUser"));
//		if (loginUser==null) {
//			return "redirect:/login";
//		}
//		return "plug";
//	}
}
