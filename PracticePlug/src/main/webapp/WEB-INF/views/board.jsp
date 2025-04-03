<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plug 마켓</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/assets/css/PLUG.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/assets/css/board.css">
</head>
<body>
    <div class="container">
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

        <h2>Plug 마켓</h2>
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
                <option value="A급">A급</option>
                <option value="B급">B급</option>
            </select>
            <select id="status-filter">
                <option value="">모든 상태</option>
                <option value="trading">판매중</option>
                <option value="completed">판매완료</option>
            </select>
            <input type="text" id="model-filter" placeholder="모델 검색">
            <input type="number" id="price-min" placeholder="최소 가격">
            <input type="number" id="price-max" placeholder="최대 가격">
            <select id="sort-by">
                <option value="created_at_desc">최신순</option>
                <option value="price_asc">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
            </select>
            <button id="filter-btn">검색</button>
        </div>

       <div class="phone-list" id="phone-list">
    	<c:choose>
        <c:when test="${empty phoneList}">
            <p class="no-items">등록된 상품이 없습니다.</p>
        </c:when>
        <c:otherwise>
            <c:forEach var="phone" items="${phoneList}">
                <div class="phone-item" data-id="${phone.phone_idx}">
                    <img src="${pageContext.request.contextPath}${phone.phone_img1}" 
                         onerror="this.src='${pageContext.request.contextPath}/resources/images/default-phone.jpg'"
                         alt="${phone.brand} ${phone.model}">
                    <div class="phone-info">
                        <h3>${phone.brand} ${phone.model}</h3>
                        <p class="price">${phone.price}원</p>
                        <p class="quality">${phone.quality}</p>
                        <p class="status">${phone.deal_status eq 'trading' ? '판매중' : '판매완료'}</p>
                    </div>
                </div>
            </c:forEach>
        </c:otherwise>
    </c:choose>
	</div>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <c:if test="${currentPage > 1}">
                <a href="${pageContext.request.contextPath}/board?page=${currentPage - 1}&${filterParams}">이전</a>
            </c:if>
            <c:forEach begin="1" end="${totalPages}" var="i">
                <c:choose>
                    <c:when test="${i == currentPage}">
                        <span class="current">${i}</span>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageContext.request.contextPath}/board?page=${i}&${filterParams}">${i}</a>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
            <c:if test="${currentPage < totalPages}">
                <a href="${pageContext.request.contextPath}/board?page=${currentPage + 1}&${filterParams}">다음</a>
            </c:if>
        </div>

        <!-- 상품 상세 모달 -->
        <div id="phone-model" class="model">
            <div class="model-content">
                <span class="close-btn">×</span>
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
                    <button id="start-chat-btn">대화하기</button>
                    <button id="buy-now-btn">구매하기</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script>
    const contextPath = "${pageContext.request.contextPath}";
    const loginUser = "${sessionScope.loginUser != null ? sessionScope.loginUser.user_id : ''}";
	</script>
    <script src="${pageContext.request.contextPath}/resources/assets/js/board.js"></script>
</body>
</html>