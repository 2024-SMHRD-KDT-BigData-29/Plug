-- 1. 데이터베이스 생성 및 권한 부여
CREATE DATABASE IF NOT EXISTS used_phone_db;
USE used_phone_db;

-- adidath 계정에 권한 부여 (root 계정으로 실행)
GRANT ALL PRIVILEGES ON used_phone_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;


-- 2. TB_USER 테이블 생성
CREATE TABLE tb_user (
    user_id VARCHAR(50) NOT NULL,
    user_pw VARCHAR(50) NOT NULL,
    user_nick VARCHAR(30) NOT NULL,
    user_birthdate VARCHAR(8) NOT NULL,
    user_phone VARCHAR(20) NOT NULL,
    user_account VARCHAR(20) NOT NULL,
    user_addr VARCHAR(500) NOT NULL,
    user_role CHAR(1) NOT NULL,
    joined_at TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id)
) ENGINE=InnoDB COMMENT = '사용자 정보';

ALTER TABLE tb_user
    MODIFY COLUMN user_id VARCHAR(50) NOT NULL COMMENT '사용자 아이디',
    MODIFY COLUMN user_pw VARCHAR(50) NOT NULL COMMENT '사용자 비밀번호',
    MODIFY COLUMN user_nick VARCHAR(30) NOT NULL COMMENT '사용자 닉네임',
    MODIFY COLUMN user_birthdate VARCHAR(8) NOT NULL COMMENT '사용자 생년월일',
    MODIFY COLUMN user_phone VARCHAR(20) NOT NULL COMMENT '사용자 연락처',
    MODIFY COLUMN user_account VARCHAR(20) NOT NULL COMMENT '사용자 계좌번호',
    MODIFY COLUMN user_addr VARCHAR(500) NOT NULL COMMENT '사용자 주소',
    MODIFY COLUMN user_role CHAR(1) NOT NULL COMMENT '사용자 구분',
    MODIFY COLUMN joined_at TIMESTAMP NOT NULL COMMENT '가입 일자';

-- 3. TB_USED_PHONE 테이블 생성
CREATE TABLE tb_used_phone (
    phone_idx BIGINT NOT NULL AUTO_INCREMENT,
    seller_id VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    quality VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    memo VARCHAR(300) NULL,
    created_at TIMESTAMP NOT NULL,
    phone_img1 VARCHAR(1000) NULL,
    phone_img2 VARCHAR(1000) NULL,
    phone_img3 VARCHAR(1000) NULL,
    deal_status VARCHAR(10) NOT NULL,
    PRIMARY KEY (phone_idx)
) ENGINE=InnoDB COMMENT = '중고폰 정보';

ALTER TABLE tb_used_phone
    MODIFY COLUMN phone_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '폰 식별자',
    MODIFY COLUMN seller_id VARCHAR(50) NOT NULL COMMENT '판매자 아이디',
    MODIFY COLUMN brand VARCHAR(50) NOT NULL COMMENT '브랜드',
    MODIFY COLUMN model VARCHAR(50) NOT NULL COMMENT '기종',
    MODIFY COLUMN capacity VARCHAR(50) NOT NULL COMMENT '용량',
    MODIFY COLUMN color VARCHAR(50) NOT NULL COMMENT '색상',
    MODIFY COLUMN quality VARCHAR(50) NOT NULL COMMENT '품질 상태',
    MODIFY COLUMN price INT NOT NULL COMMENT '가격',
    MODIFY COLUMN memo VARCHAR(300) NULL COMMENT '비고',
    MODIFY COLUMN created_at TIMESTAMP NOT NULL COMMENT '등록 일자',
    MODIFY COLUMN phone_img1 VARCHAR(1000) NULL COMMENT '폰 사진1',
    MODIFY COLUMN phone_img2 VARCHAR(1000) NULL COMMENT '폰 사진2',
    MODIFY COLUMN phone_img3 VARCHAR(1000) NULL COMMENT '폰 사진3',
    MODIFY COLUMN deal_status VARCHAR(10) NOT NULL COMMENT '판매 상태';

ALTER TABLE tb_used_phone
    ADD CONSTRAINT fk_tb_used_phone_seller_id_tb_user 
    FOREIGN KEY (seller_id) REFERENCES tb_user (user_id);

-- 4. TB_CROOM 테이블 생성
CREATE TABLE tb_croom (
    croom_idx BIGINT NOT NULL AUTO_INCREMENT,
    croom_title VARCHAR(300) NOT NULL,
    croom_info VARCHAR(1500) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    croom_limit INT NOT NULL,
    croom_status VARCHAR(10) NOT NULL,
    phone_idx BIGINT NOT NULL,
    PRIMARY KEY (croom_idx)
) ENGINE=InnoDB COMMENT = '채팅방';

ALTER TABLE tb_croom
    MODIFY COLUMN croom_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '방 식별자',
    MODIFY COLUMN croom_title VARCHAR(300) NOT NULL COMMENT '방 제목',
    MODIFY COLUMN croom_info VARCHAR(1500) NOT NULL COMMENT '방 소개',
    MODIFY COLUMN created_at TIMESTAMP NOT NULL COMMENT '방 개설일자',
    MODIFY COLUMN user_id VARCHAR(50) NOT NULL COMMENT '방 개설자',
    MODIFY COLUMN croom_limit INT NOT NULL COMMENT '방 인원수',
    MODIFY COLUMN croom_status VARCHAR(10) NOT NULL COMMENT '방 상태',
    MODIFY COLUMN phone_idx BIGINT NOT NULL COMMENT '폰 식별자';

ALTER TABLE tb_croom
    ADD CONSTRAINT fk_tb_croom_phone_idx_tb_used_phone 
    FOREIGN KEY (phone_idx) REFERENCES tb_user (phone_idx);

-- 5. TB_DEAL 테이블 생성
CREATE TABLE tb_deal (
    deal_idx BIGINT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    phone_idx BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    deal_memo VARCHAR(300) NOT NULL,
    pay_method VARCHAR(50) NOT NULL,
    pay_amount INT NOT NULL,
    PRIMARY KEY (deal_idx)
) ENGINE=InnoDB COMMENT = '거래';

ALTER TABLE tb_deal
    MODIFY COLUMN deal_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '거래 식별자',
    MODIFY COLUMN user_id VARCHAR(50) NOT NULL COMMENT '사용자 아이디',
    MODIFY COLUMN phone_idx BIGINT NOT NULL COMMENT '폰 식별자',
    MODIFY COLUMN created_at TIMESTAMP NOT NULL COMMENT '거래 날짜',
    MODIFY COLUMN deal_memo VARCHAR(300) NOT NULL COMMENT '거래 메모',
    MODIFY COLUMN pay_method VARCHAR(50) NOT NULL COMMENT '결제 수단',
    MODIFY COLUMN pay_amount INT NOT NULL COMMENT '결제 금액';

ALTER TABLE tb_deal
    ADD CONSTRAINT fk_tb_deal_phone_idx_tb_used_phone 
    FOREIGN KEY (phone_idx) REFERENCES tb_used_phone (phone_idx),
    ADD CONSTRAINT fk_tb_deal_user_id_tb_user 
    FOREIGN KEY (user_id) REFERENCES tb_user (user_id);

-- 6. TB_CHAT 테이블 생성
CREATE TABLE tb_chat (
    chat_idx BIGINT NOT NULL AUTO_INCREMENT,
    croom_idx BIGINT NOT NULL,
    chatter VARCHAR(50) NOT NULL,
    chat_content VARCHAR(2000) NULL,
    chat_emoticon VARCHAR(1000) NULL,
    chat_file VARCHAR(1000) NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (chat_idx)
) ENGINE=InnoDB COMMENT = '대화';

ALTER TABLE tb_chat
    MODIFY COLUMN chat_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '대화 식별자',
    MODIFY COLUMN croom_idx BIGINT NOT NULL COMMENT '방 식별자',
    MODIFY COLUMN chatter VARCHAR(50) NOT NULL COMMENT '발화자',
    MODIFY COLUMN chat_content VARCHAR(2000) NULL COMMENT '발화 내용',
    MODIFY COLUMN chat_emoticon VARCHAR(1000) NULL COMMENT '발화 이모티콘',
    MODIFY COLUMN chat_file VARCHAR(1000) NULL COMMENT '발화 파일',
    MODIFY COLUMN created_at TIMESTAMP NOT NULL COMMENT '발화 시간';

ALTER TABLE tb_chat
    ADD CONSTRAINT fk_tb_chat_croom_idx_tb_croom 
    FOREIGN KEY (croom_idx) REFERENCES tb_croom (croom_idx);

-- 7. TB_FAVORITE 테이블 생성
CREATE TABLE tb_favorite (
    fav_idx BIGINT NOT NULL AUTO_INCREMENT,
    phone_idx BIGINT NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (fav_idx)
) ENGINE=InnoDB COMMENT = '관심 목록';

ALTER TABLE tb_favorite
    MODIFY COLUMN fav_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '관심 식별자',
    MODIFY COLUMN phone_idx BIGINT NOT NULL COMMENT '폰 식별자',
    MODIFY COLUMN user_id VARCHAR(50) NOT NULL COMMENT '사용자 아이디',
    MODIFY COLUMN created_at TIMESTAMP NOT NULL COMMENT '찜한 날짜';

ALTER TABLE tb_favorite
    ADD CONSTRAINT fk_tb_favorite_phone_idx_tb_used_phone 
    FOREIGN KEY (phone_idx) REFERENCES tb_used_phone (phone_idx),
    ADD CONSTRAINT fk_tb_favorite_user_id_tb_user 
    FOREIGN KEY (user_id) REFERENCES tb_user (user_id);
    
    SHOW DATABASES;
    
    CREATE DATABASE used_phone_db;
    
    SHOW GRANTS FOR CURRENT_USER;
    
    GRANT ALL PRIVILEGES ON used_phone_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

USE used_phone_db;

SHOW TABLES;

