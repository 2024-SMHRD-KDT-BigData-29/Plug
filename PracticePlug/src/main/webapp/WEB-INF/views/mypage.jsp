<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/assets/css/PLUG.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/assets/css/mypage.css">
</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="${pageContext.request.contextPath}/board">Plug 마켓</a>
                <a href="${pageContext.request.contextPath}/login">로그인</a>
                <a href="${pageContext.request.contextPath}/mypage">마이페이지</a>
                <a href="${pageContext.request.contextPath}/join">회원가입</a>
                <a href="${pageContext.request.contextPath}/">홈</a>
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
                    <img id="profile-img" src="${pageContext.request.contextPath}/images/default-profile.jpg" alt="프로필 사진">
                    <input type="file" id="profile-img-input" accept="image/*" style="display: none;">
                    <br>
                    <button id="change-profile-btn">프로필 사진 변경하기</button>
                </div>

                <form id="profile-form" action="${pageContext.request.contextPath}/updateUserInfo.do" method="post">
                    <div class="info-item">
                        <label>아이디</label>
                        <input type="text" id="user_id" name="user_id" readonly>
                    </div>
                    <div class="info-item">
                        <label>비밀번호</label>
                        <input type="password" id="user_pw" name="user_pw">
                    </div>
                    <div class="info-item">
                        <label>생년월일</label>
                        <input type="text" id="user_birthdate" name="user_birthdate">
                    </div>
                    <div class="info-item">
                        <label>닉네임</label>
                        <input type="text" id="user_nick" name="user_nick">
                    </div>
                    <div class="info-item">
                        <label>연락처</label>
                        <input type="text" id="user_phone" name="user_phone">
                    </div>
                    <div class="info-item">
                        <label>주소</label>
                        <input type="text" id="user_addr" name="user_addr">
                    </div>
                    <div class="info-item">
                        <label>계좌번호</label>
                        <input type="text" id="user_account" name="user_account">
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
                <form id="register-item-form" action="${pageContext.request.contextPath}/registerProduct" method="post" enctype="multipart/form-data" onsubmit="return validateForm()">
                    <div class="form-group">
                        <label for="phone_img1">상품 이미지</label>
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

    <!-- 데이터 주입 -->
    <script>
        // 컨텍스트 경로를 JavaScript 변수로 전달
        const contextPath = "${pageContext.request.contextPath}";

        // 사용자 데이터
        const userData = {
            user_id: "${loginUser.user_id != null ? loginUser.user_id : ''}",
            user_nick: "${loginUser.user_nick != null ? loginUser.user_nick : ''}",
            user_birthdate: "${loginUser.user_birthdate != null ? loginUser.user_birthdate : ''}",
            user_phone: "${loginUser.user_phone != null ? loginUser.user_phone : ''}",
            user_addr: "${loginUser.user_addr != null ? loginUser.user_addr : ''}",
            user_account: "${loginUser.user_account != null ? loginUser.user_account : ''}"
        };
        console.log("JSP에서 전달된 userData:", userData);

        // 거래중인 상품 목록
        const tradingItems = [
            <c:forEach var="item" items="${tradingItems}" varStatus="loop">
                {
                    phone_idx: ${item.phone_idx},
                    phone_img1: "${item.phone_img1 != null ? item.phone_img1 : 'images/default-phone.jpg'}",
                    brand: "${item.brand != null ? item.brand : ''}",
                    model: "${item.model != null ? item.model : ''}",
                    capacity: "${item.capacity != null ? item.capacity : ''}",
                    color: "${item.color != null ? item.color : ''}",
                    quality: "${item.quality != null ? item.quality : ''}",
                    price: ${item.price != null ? item.price : 0},
                    created_at: "${item.created_at != null ? item.created_at : ''}"
                }${!loop.last ? ',' : ''}
            </c:forEach>
        ];
        console.log("JSP에서 전달된 tradingItems:", tradingItems);

        // 찜 목록
        const favorite = [
            <c:forEach var="item" items="${favorite}" varStatus="loop">
                {
                    phone_idx: ${item.phone_idx},
                    phone_img1: "${item.phone_img1 != null ? item.phone_img1 : 'images/default-phone.jpg'}",
                    brand: "${item.brand != null ? item.brand : ''}",
                    model: "${item.model != null ? item.model : ''}",
                    capacity: "${item.capacity != null ? item.capacity : ''}",
                    price: ${item.price != null ? item.price : 0}
                }${!loop.last ? ',' : ''}
            </c:forEach>
        ];
        console.log("JSP에서 전달된 favorite:", favorite);

        // 거래완료 상품 목록
        const completedItems = [
            <c:forEach var="item" items="${completedItems}" varStatus="loop">
                {
                    phone_idx: ${item.phone_idx},
                    phone_img1: "${item.phone_img1 != null ? item.phone_img1 : 'images/default-phone.jpg'}",
                    brand: "${item.brand != null ? item.brand : ''}",
                    model: "${item.model != null ? item.model : ''}",
                    capacity: "${item.capacity != null ? item.capacity : ''}",
                    color: "${item.color != null ? item.color : ''}",
                    quality: "${item.quality != null ? item.quality : ''}",
                    price: ${item.price != null ? item.price : 0},
                    created_at: "${item.created_at != null ? item.created_at : ''}"
                }${!loop.last ? ',' : ''}
            </c:forEach>
        ];
        console.log("JSP에서 전달된 completedItems:", completedItems);
    </script>

    <!-- mypage.js 로드 후 초기화 -->
    <script src="${pageContext.request.contextPath}/resources/assets/js/mypage.js"></script>
    <script>
        // 페이지 로드 완료 시 사용자 정보 즉시 표시
        document.addEventListener('DOMContentLoaded', function() {
            loadUserInfo(); // 개인정보 탭이 기본이므로 즉시 로드

            // URL 파라미터에 따라 탭 활성화
            const urlParams = new URLSearchParams(window.location.search);
            const activeTab = urlParams.get('tab');
            if (activeTab) {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
                const targetBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
                if (targetBtn) {
                    targetBtn.classList.add('active');
                    document.getElementById(`${activeTab}-tab`).style.display = 'block';
                    if (activeTab === 'favorites') loadFavorite();
                    else if (activeTab === 'trading') loadTradingItems();
                    else if (activeTab === 'completed') loadCompletedItems();
                }
            }
        });

        function validateForm() {
            const price = document.getElementById("price").value;
            const file = document.getElementById("phone_img1").files;

            // 파일 선택 여부 확인
            if (file.length === 0) {
                alert("상품 이미지를 선택해주세요.");
                return false;
            }

            // 가격이 숫자인지 확인
            if (!/^\d+$/.test(price)) {
                alert("가격은 숫자만 입력해주세요.");
                return false;
            }

            return true;
        }
    </script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        const message = urlParams.get('message');
        if (error) {
            let errorMsg = '알 수 없는 오류가 발생했습니다.';
            if (error === 'empty_file') {
                errorMsg = '상품 이미지를 선택해주세요.';
            } else if (error === 'dir_creation_failed') {
                errorMsg = '서버에서 업로드 디렉토리를 생성할 수 없습니다.';
            } else if (error === 'upload_failed' && message) {
                errorMsg = '업로드 실패: ' + decodeURIComponent(message);
            }
            alert(errorMsg);
        }
    });
</script>
</body>
</html>