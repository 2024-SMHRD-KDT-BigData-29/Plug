package kr.smhrd.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import kr.smhrd.entity.TB_UsedPhone;

@Mapper
public interface TB_FavoriteMapper {
    List<TB_UsedPhone> getFavorite(String user_id);
    void deletefavoriteItem(Map<String, Object> params);
	
}
