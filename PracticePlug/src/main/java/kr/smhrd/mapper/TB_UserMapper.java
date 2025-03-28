package kr.smhrd.mapper;


import kr.smhrd.entity.TB_User;

public interface TB_UserMapper {

	TB_User goLogin(TB_User user);

	void goJoin(TB_User user);

	void goJoin2(TB_User user);

}
