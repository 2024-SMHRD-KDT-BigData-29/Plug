<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="stylesheet" href="resources/assets/css/PLUG.css"> <!-- 공통 스타일 -->
    <link rel="stylesheet" href="resources/assets/css/login.css"> <!-- 로그인 페이지 전용 스타일 -->
</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="PLUG">로그인</a>
                <a href="mypage.html">마이페이지</a>
                <a href="join">회원가입</a>
            </div>
        </header>

        <!-- 로그인 폼 -->
        <div class="login-form">
            <h1 class="logo">Plug</h1>
            <h2>개인 간 신뢰할 수 있는 중고 스마트폰 거래 플랫폼</h2>
            <form action="login2" method="post" id="login-form">
                <div class="form-group">
                    <label for="user_id">아이디</label>
                    <input type="text" id="user_id" name="user_id" required>
                </div>
                <div class="form-group">
                    <label for="user_pw">비밀번호</label>
                    <input type="password" id="user_pw" name="user_pw" required>
                </div>
                <button type="submit" value="Login" class="login-btn">로그인</button>
            </form>
            <button class="signup-btn" onclick="window.location.href='join'">회원가입</button>
        </div>
    </div>
    <script src="resources/assets/js/login.js"></script>
</body>
</html>
