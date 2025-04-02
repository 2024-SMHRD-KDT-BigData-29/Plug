package kr.smhrd.mapper;

import java.util.List;
import java.util.Map;

import kr.smhrd.entity.TB_UsedPhone;
import kr.smhrd.entity.TB_User;

public interface TB_MypageMapper {
    TB_UsedPhone getPhoneById(int phoneId);
    List<TB_UsedPhone> getTradingItems(String user_id);
    List<TB_UsedPhone> getCompletedItems(String user_id);
    void updatePhone(TB_UsedPhone phone);
    void deletePhone(int phoneId);
    void insertPhone(TB_UsedPhone phone);
    List<TB_UsedPhone> getFilteredPhones(Map<String, Object> params);
    int getFilteredPhonesCount(Map<String, Object> params);
}