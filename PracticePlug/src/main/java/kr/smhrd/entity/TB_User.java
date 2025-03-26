package kr.smhrd.entity;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//기본 생성자, 사용자정의생성자, Getter&Setter, toString 생성하기 위한 설정
// -> lombok 활용
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TB_User {
	private String user_id;
	private String user_pw;
	private String user_nick;
	private String user_birthdate;
	private String user_phone;
	private String user_address;
	private Timestamp joined_at = new Timestamp(System.currentTimeMillis());
	
}
