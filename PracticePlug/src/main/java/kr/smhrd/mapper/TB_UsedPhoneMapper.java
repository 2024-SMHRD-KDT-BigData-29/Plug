package kr.smhrd.mapper;

import java.util.List;
import java.util.Map;

import kr.smhrd.entity.TB_UsedPhone;

public interface TB_UsedPhoneMapper {
    void insertPhone(TB_UsedPhone phone);
    List<TB_UsedPhone> getTradingItems(String seller_id);
    List<TB_UsedPhone> getCompletedItems(String seller_id);
    TB_UsedPhone getPhoneById(long phone_idx);
    void updatePhone(TB_UsedPhone phone);
    void deletePhone(long phone_idx);
    List<TB_UsedPhone> getFilteredPhones(Map<String, Object> params);
    int getFilteredPhonesCount(Map<String, Object> params);
}