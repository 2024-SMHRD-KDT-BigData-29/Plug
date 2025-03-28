package kr.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//기본 생성자, 사용자정의생성자, Getter&Setter, toString 생성하기 위한 설정
// -> lombok 활용
@Data
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
	private String user_addr;
	private String user_account;
	private String user_phone;
	
	
	
}
