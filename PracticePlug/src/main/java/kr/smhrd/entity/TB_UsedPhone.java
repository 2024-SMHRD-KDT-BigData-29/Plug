

package kr.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TB_UsedPhone {
    private int phone_idx; // 상품 고유 번호 (자동 증가)
    private String seller_id; // 상품을 등록한 사용자의 ID
    private String phone_img1; // 상품 이미지 경로
    private String brand; // 브랜드 (예: Samsung)
    private String model; // 모델 (예: Galaxy S21)
    private String capacity; // 용량 (예: 128GB)
    private String color; // 색상 (예: Black)
    private String quality; // 품질 (예: S급)
    private int price; // 가격
    private String deal_status; // 상태 (trading: 거래중, completed: 거래완료)
    private String created_at; // 등록일
    private String memo;         // 추가
      // status → deal_status로 변경
   
}