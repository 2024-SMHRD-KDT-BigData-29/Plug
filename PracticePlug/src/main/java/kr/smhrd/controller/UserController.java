package kr.smhrd.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.smhrd.entity.TB_Chatroom;
import kr.smhrd.entity.TB_Deal;
import kr.smhrd.entity.TB_UsedPhone;
import kr.smhrd.entity.TB_User;
import kr.smhrd.mapper.TB_ChatroomMapper;
import kr.smhrd.mapper.TB_DealMapper;
import kr.smhrd.mapper.TB_FavoriteMapper;
import kr.smhrd.mapper.TB_UsedPhoneMapper;
import kr.smhrd.mapper.TB_UserMapper;

@Controller
public class UserController {

    @Autowired
    TB_UserMapper usermapper;

    @Autowired
    TB_UsedPhoneMapper usedphoneMapper;

    @Autowired
    TB_FavoriteMapper favoriteMapper;

    @Autowired
    TB_ChatroomMapper chatroomMapper;

    @Autowired
    TB_DealMapper dealMapper;

    @RequestMapping("/")
    public String goLogin2() {
        return "login";
    }

    @RequestMapping("/login2")
    public String Login(TB_User user, HttpServletRequest request) {
        TB_User loginUser = usermapper.goLogin(user);
        request.getSession().setAttribute("loginUser", loginUser);
        System.out.println(loginUser);
        loginUser = (TB_User) (request.getSession().getAttribute("loginUser"));
        if (loginUser == null) {
            return "redirect:/login2";
        }
        return "plug";
    }

    @RequestMapping("/join2")
    public String goJoin2(TB_User user, HttpServletRequest request) {
        usermapper.goJoin2(user);
        return "login";
    }

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
        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
        System.out.println("마이페이지 접근, 세션 사용자: " + loginUser);
        if (loginUser == null) {
            return "redirect:/login";
        }

        List<TB_UsedPhone> tradingItems = usedphoneMapper.getTradingItems(loginUser.getUser_id());
        model.addAttribute("tradingItems", tradingItems);

        List<TB_UsedPhone> favorite = favoriteMapper.getFavorite(loginUser.getUser_id());
        model.addAttribute("favorite", favorite);

        List<TB_UsedPhone> completedItems = usedphoneMapper.getCompletedItems(loginUser.getUser_id());
        model.addAttribute("completedItems", completedItems);

        model.addAttribute("loginUser", loginUser);
        return "mypage";
    }

    @RequestMapping(value = "/updateUserInfo.do", method = RequestMethod.POST)
    public String updateUserInfo(TB_User updatedUser, HttpServletRequest request) {
        TB_User loginUser = (TB_User) request.getSession().getAttribute("loginUser");
        if (loginUser == null) {
            return "redirect:/login";
        }
        loginUser.setUser_pw(updatedUser.getUser_pw() != null && !updatedUser.getUser_pw().isEmpty() ? updatedUser.getUser_pw() : loginUser.getUser_pw());
        loginUser.setUser_nick(updatedUser.getUser_nick());
        loginUser.setUser_birthdate(updatedUser.getUser_birthdate());
        loginUser.setUser_phone(updatedUser.getUser_phone());
        loginUser.setUser_addr(updatedUser.getUser_addr());
        loginUser.setUser_account(updatedUser.getUser_account());

        usermapper.updateUser(loginUser);
        request.getSession().setAttribute("loginUser", loginUser);
        return "redirect:/mypage";
    }

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

    @RequestMapping("/board")
    public String goBoard(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "quality", required = false) String quality,
            @RequestParam(value = "deal_status", required = false) String deal_status,
            @RequestParam(value = "model", required = false) String model,
            @RequestParam(value = "priceMin", required = false) Integer priceMin,
            @RequestParam(value = "priceMax", required = false) Integer priceMax,
            @RequestParam(value = "sortBy", defaultValue = "created_at_desc") String sortBy,
            Model model) {
        try {
            System.out.println("[/board] 요청 수신 - 페이지: " + page);
            System.out.println("필터 조건 - brand: " + brand + ", quality: " + quality + ", deal_status: " + deal_status + ", model: " + model + ", priceMin: " + priceMin + ", priceMax: " + priceMax + ", sortBy: " + sortBy);

            Map<String, Object> params = new HashMap<>();
            params.put("brand", brand);
            params.put("quality", quality);
            params.put("deal_status", deal_status);
            params.put("model", model);
            params.put("priceMin", priceMin);
            params.put("priceMax", priceMax);
            params.put("sortBy", sortBy);

            int pageSize = 12;
            params.put("offset", (page - 1) * pageSize);
            params.put("pageSize", pageSize);

            List<TB_UsedPhone> phoneList = usedphoneMapper.getFilteredPhones(params);
            System.out.println("조회된 상품 수: " + (phoneList != null ? phoneList.size() : 0));

            int totalItems = usedphoneMapper.getFilteredPhonesCount(params);
            System.out.println("총 상품 수: " + totalItems);

            int totalPages = (int) Math.ceil((double) totalItems / pageSize);
            System.out.println("총 페이지 수: " + totalPages);

            if (phoneList != null && !phoneList.isEmpty()) {
                for (TB_UsedPhone phone : phoneList) {
                    TB_User seller = usermapper.getUserById(phone.getSeller_id());
                    if (seller != null) {
                        phone.setSeller_id(seller.getUser_nick());
                    }
                }
            }

            StringBuilder filterParams = new StringBuilder();
            if (brand != null && !brand.isEmpty()) filterParams.append("brand=").append(brand).append("&");
            if (quality != null && !quality.isEmpty()) filterParams.append("quality=").append(quality).append("&");
            if (deal_status != null && !deal_status.isEmpty()) filterParams.append("deal_status=").append(deal_status).append("&");
            if (model != null && !model.isEmpty()) filterParams.append("model=").append(model).append("&");
            if (priceMin != null) filterParams.append("priceMin=").append(priceMin).append("&");
            if (priceMax != null) filterParams.append("priceMax=").append(priceMax).append("&");
            if (!sortBy.equals("created_at_desc")) filterParams.append("sortBy=").append(sortBy).append("&");

            model.addAttribute("phoneList", phoneList);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("filterParams", filterParams.toString());

            return "board";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "게시판을 불러오는 중 오류가 발생했습니다: " + e.getMessage());
            return "error";
        }
    }

    // 상품 상세 정보 조회 API
    @RequestMapping(value = "/getPhoneDetails.do", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<TB_UsedPhone> getPhoneDetails(@RequestParam("phoneId") int phoneId) {
        TB_UsedPhone phone = usedphoneMapper.getPhoneById(phoneId);
        if (phone == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(phone);
    }

    // 사용자 정보 조회 API
    @RequestMapping(value = "/getUserInfo.do", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<TB_User> getUserInfo(@RequestParam("userId") String userId) {
        TB_User user = usermapper.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    // 찜하기 추가 API
    @RequestMapping(value = "/addFavorite.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addFavorite(
            @RequestParam("phoneId") int phoneId,
            @RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("user_id", userId);
            params.put("phone_idx", phoneId);
            params.put("created_at", new Timestamp(System.currentTimeMillis()));
            favoriteMapper.addFavorite(params);
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "찜하기 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 채팅방 생성 API
    @RequestMapping(value = "/createChatroom.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> createChatroom(
            @RequestParam("phoneId") int phoneId,
            @RequestParam("sellerId") String sellerId,
            @RequestParam("buyerId") String buyerId,
            @RequestParam("title") String title) {
        Map<String, Object> response = new HashMap<>();
        try {
            TB_Chatroom existingChatroom = chatroomMapper.getChatroomByPhoneAndUsers(phoneId, sellerId, buyerId);
            if (existingChatroom != null) {
                response.put("success", true);
                response.put("croom_idx", existingChatroom.getCroom_idx());
                return ResponseEntity.ok(response);
            }

            TB_Chatroom chatroom = new TB_Chatroom();
            chatroom.setPhone_idx(phoneId);
            chatroom.setUser_id(sellerId); // 방 개설자
            chatroom.setCroom_title(title);
            chatroom.setCroom_info("중고폰 거래 채팅방: " + title);
            chatroom.setCreated_at(new Timestamp(System.currentTimeMillis()));
            chatroom.setCroom_limit(2); // 1:1 채팅
            chatroom.setCroom_status("active");
            chatroomMapper.createChatroom(chatroom);

            response.put("success", true);
            response.put("croom_idx", chatroom.getCroom_idx());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "채팅방 생성 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 상품 구매 처리 API
    @RequestMapping(value = "/buyPhone.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> buyPhone(
            @RequestParam("phoneId") int phoneId,
            @RequestParam("userId") String userId,
            @RequestParam("payMethod") String payMethod,
            @RequestParam("payAmount") int payAmount) {
        Map<String, Object> response = new HashMap<>();
        try {
            TB_UsedPhone phone = usedphoneMapper.getPhoneById(phoneId);
            if (phone == null || !phone.getDeal_status().equals("trading")) {
                response.put("success", false);
                response.put("message", "해당 상품은 구매할 수 없습니다.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // tb_used_phone의 deal_status 업데이트
            phone.setDeal_status("completed");
            usedphoneMapper.updatePhone(phone);

            // tb_deal에 거래 정보 저장
            TB_Deal deal = new TB_Deal();
            deal.setUser_id(userId);
            deal.setPhone_idx(phoneId);
            deal.setCreated_at(new Timestamp(System.currentTimeMillis()));
            deal.setDeal_memo("중고폰 구매: " + phone.getBrand() + " " + phone.getModel());
            deal.setPay_method(payMethod);
            deal.setPay_amount(payAmount);
            dealMapper.insertDeal(deal);

            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "구매 처리 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}