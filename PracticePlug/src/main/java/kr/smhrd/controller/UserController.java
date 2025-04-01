package kr.smhrd.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import kr.smhrd.entity.TB_UsedPhone;
import kr.smhrd.entity.TB_User;
import kr.smhrd.mapper.TB_UsedPhoneMapper;
import kr.smhrd.mapper.TB_UserMapper;
import kr.smhrd.mapper.TB_FavoriteMapper;


@Controller
public class UserController {

	@Autowired
	TB_UserMapper usermapper;
	
	 @Autowired
	    TB_UsedPhoneMapper usedphoneMapper;

	    @Autowired
	    TB_FavoriteMapper favoriteMapper;
	

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

		TB_User loginUser = usermapper.goLogin(user);
		
		request.getSession().setAttribute("loginUser", loginUser);
		System.out.println(loginUser);
		loginUser = (TB_User)(request.getSession().getAttribute("loginUser"));
		if (loginUser==null) {
			return "redirect:/login2";
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
	    
	    usermapper.goJoin2(user);
	    
		
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
	  @RequestMapping("/mypage")
	    public String goMypage(HttpServletRequest request, Model model) {
	        // 세션에서 로그인한 사용자 정보 가져오기
	        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        System.out.println("마이페이지 접근, 세션 사용자: " + loginUser);
	        if (loginUser == null) {
	            return "redirect:/login";
	        }

	        // 거래중인 상품 목록 가져오기
	        List<TB_UsedPhone> tradingItems = usedphoneMapper.getTradingItems(loginUser.getUser_id());
	        model.addAttribute("tradingItems", tradingItems);

	        // 찜 목록 가져오기
	        List<TB_UsedPhone> favorite = favoriteMapper.getFavorite(loginUser.getUser_id());
	        model.addAttribute("favorite", favorite);

	        // 거래완료 상품 목록 가져오기
	        List<TB_UsedPhone> completedItems = usedphoneMapper.getCompletedItems(loginUser.getUser_id());
	        model.addAttribute("completedItems", completedItems);

	        // 사용자 정보 모델에 추가
	        model.addAttribute("loginUser", loginUser);
	        return "mypage";
	    }

	    // 개인정보 수정
	    @RequestMapping(value = "/updateUserInfo.do", method = RequestMethod.POST)
	    public String updateUserInfo(TB_User updatedUser, HttpServletRequest request) {
	        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        if (loginUser == null) {
	            return "redirect:/login";
	        }
	        // 수정된 정보로 세션 업데이트
	        loginUser.setUser_pw(updatedUser.getUser_pw() != null && !updatedUser.getUser_pw().isEmpty() ? updatedUser.getUser_pw() : loginUser.getUser_pw());
	        loginUser.setUser_nick(updatedUser.getUser_nick());
	        loginUser.setUser_birthdate(updatedUser.getUser_birthdate());
	        loginUser.setUser_phone(updatedUser.getUser_phone());
	        loginUser.setUser_addr(updatedUser.getUser_addr());
	        loginUser.setUser_account(updatedUser.getUser_account());

	        // DB에 저장
	        usermapper.updateUser(loginUser); 
	        request.getSession().setAttribute("loginUser", loginUser);
	        return "redirect:/mypage";
	    }

	    // 상품 등록
	    @RequestMapping(value = "/registerProduct", method = RequestMethod.POST)
	    public String registerProduct(@RequestParam("phone_img1") MultipartFile file, TB_UsedPhone phone, HttpServletRequest request) {
	    	 System.out.println("registerProduct.do 요청 수신: " + phone);
	    	TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        if (loginUser == null) {
	        	System.out.println("로그인 사용자 없음, 로그인 페이지로 리다이렉트");
	            return "redirect:/login";
	        }

	        try {
	            // 이미지 파일 저장
	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	            String uploadDir = request.getServletContext().getRealPath("/images/");
	            File uploadFile = new File(uploadDir + fileName);
	            file.transferTo(uploadFile);

	            // 상품 정보 설정
	            phone.setPhone_img1("/images/" + fileName);
	            phone.setSeller_id(loginUser.getUser_id());
	            phone.setDeal_status("trading");
	            phone.setCreated_at(new java.sql.Timestamp(System.currentTimeMillis()).toString());
	            usedphoneMapper.insertPhone(phone);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return "redirect:/mypage?tab=trading";
	    }

	    // 상품 상태 업데이트 (거래중 → 거래완료)
	    @RequestMapping(value = "/updateProductStatus.do", method = RequestMethod.POST)
	    public String updateProductStatus(@RequestParam("productId") int productId, @RequestParam("status") String status, HttpServletRequest request) {
	        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        if (loginUser == null) {
	            return "redirect:/login";
	        }

	        TB_UsedPhone phone = usedphoneMapper.getPhoneById(productId);
	        if (phone != null && phone.getSeller_id().equals(loginUser.getUser_id())) {
	            phone.setDeal_status(status);
	            usedphoneMapper.updatePhone(phone);
	        }
	        return "redirect:/mypage?tab=completed";
	    }

	    // 상품 삭제
	    @RequestMapping(value = "/deleteProduct.do", method = RequestMethod.POST)
	    public String deleteProduct(@RequestParam("productId") int productId, HttpServletRequest request) {
	        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        if (loginUser == null) {
	            return "redirect:/login";
	        }

	        TB_UsedPhone phone = usedphoneMapper.getPhoneById(productId);
	        if (phone != null && phone.getSeller_id().equals(loginUser.getUser_id())) {
	            usedphoneMapper.deletePhone(productId);
	        }
	        return "redirect:/mypage";
	    }

	    // 찜 목록에서 제거
	    @RequestMapping(value = "/removeFromWishlist.do", method = RequestMethod.POST)
	    public String removeFromWishlist(@RequestParam("productId") int productId, HttpServletRequest request) {
	        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
	        if (loginUser == null) {
	            return "redirect:/login";
	        }

	        Map<String, Object> params = new HashMap<>();
	        params.put("user_id", loginUser.getUser_id());
	        params.put("phone_idx", productId);
	        favoriteMapper.deletefavoriteItem(params);
	        return "redirect:/mypage?tab=favorites";
	    }
	}
	
	
	



