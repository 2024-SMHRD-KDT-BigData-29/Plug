package kr.smhrd.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.smhrd.entity.TB_UsedPhone;

@Mapper
public interface TB_UsedPhoneMapper {
    void insertPhone(TB_UsedPhone phone);
    List<TB_UsedPhone> getTradingItems(String user_id);
    List<TB_UsedPhone> getCompletedItems(String user_id);
    TB_UsedPhone getPhoneById(int phone_idx);
    void updatePhone(TB_UsedPhone phone);
    void deletePhone(int phone_idx);
}