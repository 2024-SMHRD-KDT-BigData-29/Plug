<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plug - 중고폰 거래</title>
    <link rel="stylesheet" href="resources/assets/css/PLUG.css">
    <link rel="stylesheet" href="resources/assets/css/board.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="plug">홈</a>
                <a href="mypage">마이페이지</a>
                <a href="login">로그인</a>
                <a href="join">회원가입</a>
            </div>
        </header>

        <h2>Plug 마켓 - 중고폰 거래</h2>
        <div class="filter-options">
            <select id="brand-filter">
                <option value="">모든 브랜드</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
            </select>
            <select id="quality-filter">
                <option value="">모든 품질</option>
                <option value="SS급">SS급</option>
                <option value="S급">S급</option>
            </select>
            <button id="filter-btn">필터 적용</button>
        </div>

        <div class="phone-list" id="phone-list">
            <!-- 상품 목록이 여기에 동적으로 로드됩니다 -->
        </div>

        <!-- 상품 상세 모달 -->
        <div id="phone-model" class="model">
            <div class="model-content">
                <span class="close-btn"></span>
                <div class="model-header">
                    <h3 id="model-phone-name"></h3>
                    <p id="model-phone-price"></p>
                </div>
                <div class="model-body">
                    <div class="phone-images" id="phone-images"></div>
                    <div class="phone-details">
                        <p><strong>판매자:</strong> <span id="model-seller-id"></span></p>
                        <p><strong>용량:</strong> <span id="model-phone-capacity"></span></p>
                        <p><strong>색상:</strong> <span id="model-phone-color"></span></p>
                        <p><strong>품질:</strong> <span id="model-phone-quality"></span></p>
                        <p><strong>등록일:</strong> <span id="model-created-at"></span></p>
                        <p><strong>상태:</strong> <span id="model-deal-status"></span></p>
                        <p><strong>비고:</strong> <span id="model-phone-memo"></span></p>
                    </div>
                </div>
                <div class="model-footer">
                    <button id="add-favorite-btn">찜하기</button>
                    <button id="start-chat-btn">채팅하기</button>
                    <button id="buy-now-btn">구매하기</button>
                </div>
            </div>
        </div>
    </div>

    <script src="resources/assets/js/board.js"></script>
</body>
</html>