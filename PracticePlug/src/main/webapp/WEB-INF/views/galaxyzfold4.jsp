<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>구매페이지</title>
    <link rel="stylesheet" href="resources/assets/css/iphone15promax.css"> <!-- 공통 스타일 -->

</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="board">Plug 마켓</a>
                <a href="mypage">마이페이지</a>
                
            </div>
        </header>
        <div class="product-detail">
            <div class="product-card">
                <img src="images/re2.jpg" alt="갤럭시 Z Fold 4">
                <h3>Samsung 갤럭시 Z Fold 4</h3>
                <p>128GB</p>
                <p class="price">1,998,700원</p>
                <div class="grade-options">
                    <h4>구매하기</h4>
                    <p class="grade-price">등급별 갤럭시 Z Fold 4 128GB</p>
                    <div class="grade-buttons">
                        <button class="grade-btn" data-grade="SS">SS</button>
                        <button class="grade-btn" data-grade="S">S</button>
                        <button class="grade-btn" data-grade="A">A</button>
                        <button class="grade-btn" data-grade="B">B</button>
                    </div>
                </div>
                <div class="actions">
                    <button class="buy">구매하기</button>
                    <button class="save" id="wishlist-btn">찜하기</button>
                </div>
            </div>
            <a href="PLUG" class="back-btn">목록으로 돌아가기</a>
        </div>
    </div>
    <script src="resources/assets/js/galaxyzfold4.js"></script>
</body>
</html>

