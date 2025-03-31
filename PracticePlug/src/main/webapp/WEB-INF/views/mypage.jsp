<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지</title>
    <link rel="stylesheet" href="resources/assets/css/PLUG.css">
    <link rel="stylesheet" href="resources/assets/css/mypage.css">
</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="board">Plug 마켓</a>
                <a href="login">로그인</a>
                <a href="#">마이페이지</a>
                <a href="join">회원가입</a>
                <a href="PLUG">홈</a>
                
            </div>
        </header>

        <!-- 탭 메뉴 -->
        <div class="tab-menu">
            <button class="tab-btn active" data-tab="profile">개인정보 수정</button>
            <button class="tab-btn" data-tab="favorites">찜</button>
            <button class="tab-btn" data-tab="trading">거래중</button>
            <button class="tab-btn" data-tab="completed">거래완료</button>
        </div>

        <!-- 탭 콘텐츠 -->
        <div class="tab-content" id="profile-tab">
            <!-- 개인정보 수정 섹션 -->
            <section class="profile-section">
                <div class="profile-image">
                    <img id="profile-img" src="images/이채영1.png" alt="프로필 사진">
                    <input type="file" id="profile-img-input" accept="image/*" style="display: none;">
                    <br>
                    <button id="change-profile-btn">프로필 사진 변경하기</button>
                </div>
                <form id="profile-form" action="profiles" >
                    <div class="info-item">
                        <label>아이디</label>
                        <input type="text" id="user_id" readonly>
                    </div>
                    <div class="info-item">
                        <label>비밀번호</label>
                        <input type="password" id="user_pw">
                    </div>
                    <div class="info-item">
                        <label>생년월일</label>
                        <input type="text" id="user_birthdate">
                    </div>
                    <div class="info-item">
                        <label>닉네임</label>
                        <input type="text" id="user_nick">
                    </div>
                    <div class="info-item">
                        <label>연락처</label>
                        <input type="text" id="user_phone">
                    </div>
                    <div class="info-item">
                        <label>주소</label>
                        <input type="text" id="user_addr">
                    </div>
                   
                    <div class="info-item">
                        <label>계좌번호</label>
                        <input type="text" id="user_account">
                    </div>
                    <div class="info-item">
                        <label>가입날짜</label>
                        <input type="text" id="joined_at">
                    </div>


                    <button type="submit" class="save-btn">저장하기</button>
                </form>
            </section>
        </div>

        <div class="tab-content" id="favorites-tab" style="display: none;">
            <!-- 찜 목록 섹션 -->
            <section class="favorites-section">
                <h2>찜 목록</h2>
                <div class="favorites-grid" id="favorites-list"></div>
            </section>
        </div>

        <div class="tab-content" id="trading-tab" style="display: none;">
            <!-- 물건 등록 섹션 -->
            <section class="register-item-section">
                    <h2>상품 등록</h2> 
                <form id="register-item-form">
                    <div class="form-group">
                        <label for="phone_img1">물건 이미지</label>
                        <input type="file" id="phone_img1" name="phone_img1" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label for="brand">브랜드</label>
                        <input type="text" id="brand" name="brand" required>
                    </div>
                    <div class="form-group">
                        <label for="model">기종</label>
                        <input type="text" id="model" name="model" required>
                    </div>
                    <div class="form-group">
                        <label for="capacity">용량</label>
                        <input type="text" id="capacity" name="capacity" required>
                    </div>
                    <div class="form-group">
                        <label for="color">색상</label>
                        <input type="text" id="color" name="color" required>
                    </div>
                    <div class="form-group">
                        <label for="quality">품질상태</label>
                        <select id="quality" name="quality" required>
                            <option value="SS급">SS급</option>
                            <option value="S급">S급</option>
                            <option value="A급">A급</option>
                            <option value="B급">B급</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price">가격</label>
                        <input type="text" id="price" name="price" required>
                    </div>
                    
                    <button type="submit" class="register-btn">등록하기</button>
                </form>
            </section>

            <!-- 거래중인 품목 -->
            <section class="trading-items-section">
                <h2>거래중인 품목</h2>
                <div id="trading-items-list"></div>
            </section>
        </div>

        <div class="tab-content" id="completed-tab" style="display: none;">
            <!-- 거래완료 품목 -->
            <section class="completed-items-section">
                <h2>거래완료 품목</h2>
                <div id="completed-items-list" class="product-grid"></div>
            </section>
        </div>
    </div>
    <script src="resources/assets/js/mypage.js"></script>
</body>
</html>