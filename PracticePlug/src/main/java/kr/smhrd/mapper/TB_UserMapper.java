

package kr.smhrd.mapper;

import org.apache.ibatis.annotations.Mapper;
import kr.smhrd.entity.TB_User;

@Mapper
public interface TB_UserMapper {
    TB_User goLogin(TB_User user);
    void goJoin2(TB_User user);
    void updateUser(TB_User user);
    TB_User getUserById(String userId);
}


