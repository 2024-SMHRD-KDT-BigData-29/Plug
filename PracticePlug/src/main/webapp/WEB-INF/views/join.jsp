<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" href="resources/assets/css/PLUG.css"> <!-- 공통 스타일 -->
    <link rel="stylesheet" href="resources/assets/css/join.css"> <!-- 회원가입 페이지 전용 스타일 -->
</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="login">로그인</a>
                <a href="#">마이페이지</a>
                <a href="join">회원가입</a>
            </div>
        </header>

        <!-- 회원가입 폼 -->
        <div class="signup-form">
            
            <form action="join2" method="post" id="signup-form">
               
                <div class="form-group">
                    <label for="user_id">아이디</label>
                    <input type="text" id="user_id" name="user_id" required>
                </div>
                <div class="form-group">
                    <label for="user_pw">비밀번호</label>
                    <input type="text" id="user_pw" name="user_pw" required>
                </div>
                <div class="form-group">
                    <label for="user_nick">닉네임</label>
                    <input type="text" id="user_nick" name="user_nick" required>
                </div>
                <div class="form-group">
                    <label for="user_birthdate">생년월일</label>
                    <input type="text" id="user_birthdate" name="user_birthdate"  required>
                </div>
                <div class="form-group">
                    <label for="user_addr">주소</label>
                    <input type="text" id="user_addr" name="user_addr" required>
                </div>
                <div class="form-group">
                    <label for="user_account">사용자 계좌번호</label>
                    <input type="text" id="user_account" name="user_account"  required>
                </div>
                <div class="form-group">
                    <label for="user_phone">연락처</label>
                    <input type="text" id="user_phone" name="user_phone"  required>
                </div>


                <button type="submit" class="signup-btn">회원가입하기</button>
            </form>
        </div>
    </div>
    <script src="resources/assets/js/join.js"></script>
</body>
</html>