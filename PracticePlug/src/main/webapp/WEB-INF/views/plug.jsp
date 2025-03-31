<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plug</title>
    <link rel="stylesheet" href="resources/assets/css/PLUG.css">
</head>
<body>
    <div class="container">
        <!-- 상단 헤더 -->
        <header class="header">
            <h1 class="logo">Plug</h1>
            <div class="auth-links">
                <a href="login">로그인</a>
                <a href="mypage">마이페이지</a>
                <a href="join">회원가입</a>
            </div>
        </header>

        <!-- 검색창과 조회 버튼 -->
        <div class="search-bar">
            <div class="search-wrapper">
                <span class="search-icon"></span>
                <input type="text" id="search-input">
            </div>
            <button id="view-btn">검색</button>
        </div>

        <!-- 필터 버튼 -->
        <div class="filter-buttons">
            <button class="filter-btn active">최근순(가격)</button>
            <button class="filter-btn">낮은순</button>
        </div>

        <!-- 제품 목록 -->
        <div class="product-list">
            <!-- 제품 카드 -->
            <div class="product-card" data-id="iphone15pro">
                <img src="images/iphone15pro.png" alt="아이폰 15 프로">
                <h3>Apple 아이폰15 프로</h3>
                <p>128GB</p>
                <p class="price">1,550,000원</p>
                <button class="view-btn" data-href="iphone15pro.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone15">
                <img src="images/iphone15.png" alt="아이폰 15">
                <h3>Apple 아이폰15</h3>
                <p>128GB</p>
                <p class="price">1,250,000원</p>
                <button class="view-btn" data-href="iphone15.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone15promax">
                <img src="images/iphone15promax.png" alt="아이폰 15 프로맥스">
                <h3>Apple 아이폰15 프로맥스</h3>
                <p>128GB</p>
                <p class="price">1,900,000원</p>
                <button class="view-btn" data-href="iphone15promax.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone15plus">
                <img src="images/iphone15plus.png" alt="아이폰 15 플러스">
                <h3>Apple 아이폰15 플러스</h3>
                <p>128GB</p>
                <p class="price">1,500,000원</p>
                <button class="view-btn" data-href="iphone15plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone14pro">
                <img src="images/iphone14pro.png" alt="아이폰 14 프로">
                <h3>Apple 아이폰14 프로</h3>
                <p>128GB</p>
                <p class="price">1,550,000원</p>
                <button class="view-btn" data-href="iphone14pro.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone14promax">
                <img src="images/iphone14promax.png" alt="아이폰 14프로맥스">
                <h3>Apple 아이폰14 프로맥스</h3>
                <p>128GB</p>
                <p class="price">1,800,000원</p>
                <button class="view-btn" data-href="iphone14promax.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone14plus">
                <img src="images/iphone14plus.png" alt="아이폰 14플러스">
                <h3>Apple 아이폰14 플러스</h3>
                <p>128GB</p>
                <p class="price">1,350,000원</p>
                <button class="view-btn" data-href="iphone14plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone14">
                <img src="images/iphone14.png" alt="아이폰 14">
                <h3>Apple 아이폰14 </h3>
                <p>128GB</p>
                <p class="price">1,000,000원</p>
                <button class="view-btn" data-href="iphone14.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone13promax">
                <img src="images/iphone13promax.png" alt="아이폰 13프로맥스">
                <h3>Apple 아이폰13 프로맥스</h3>
                <p>128GB</p>
                <p class="price">1,900,000원</p>
                <button class="view-btn" data-href="iphone13promax.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone13pro">
                <img src="images/iphone13pro.png" alt="아이폰 13프로">
                <h3>Apple 아이폰13 프로</h3>
                <p>128GB</p>
                <p class="price">1,350,000원</p>
                <button class="view-btn" data-href="iphone13pro.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone13">
                <img src="images/iphone13.png" alt="아이폰 13">
                <h3>Apple 아이폰13 </h3>
                <p>128GB</p>
                <p class="price">1,090,000원</p>
                <button class="view-btn" data-href="iphone13.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone13mini">
                <img src="images/iphone13mini.png" alt="아이폰 13미니">
                <h3>Apple 아이폰13 미니</h3>
                <p>128GB</p>
                <p class="price">950,000원</p>
                <button class="view-btn" data-href="iphone13mini.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone12promax">
                <img src="images/iphone12promax.jpg" alt="아이폰 12프로맥스">
                <h3>Apple 아이폰12 프로맥스</h3>
                <p>128GB</p>
                <p class="price">1,490,000원</p>
                <button class="view-btn" data-href="iphone12promax.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone12pro">
                <img src="images/iphone12pro.jpg" alt="아이폰 12프로">
                <h3>Apple 아이폰12 프로</h3>
                <p>128GB</p>
                <p class="price">1,350,000원</p>
                <button class="view-btn" data-href="iphone12pro.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone12">
                <img src="images/iphone12.png" alt="아이폰 12">
                <h3>Apple 아이폰12</h3>
                <p>128GB</p>
                <p class="price">1,090,000원</p>
                <button class="view-btn" data-href="iphone12.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone12mini">
                <img src="images/iphone12mini.png" alt="아이폰 12미니">
                <h3>Apple 아이폰12 미니</h3>
                <p>128GB</p>
                <p class="price">950,000원</p>
                <button class="view-btn" data-href="iphone12mini.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone11promax">
                <img src="images/iphone11promax.jpg" alt="아이폰 11프로맥스">
                <h3>Apple 아이폰11 프로맥스</h3>
                <p>128GB</p>
                <p class="price">1,550,000원</p>
                <button class="view-btn" data-href="iphone11promax.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone11pro">
                <img src="images/iphone11pro.jpg" alt="아이폰 11프로">
                <h3>Apple 아이폰11 프로</h3>
                <p>128GB</p>
                <p class="price">1,390,000원</p>
                <button class="view-btn" data-href="iphone11pro.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphone11">
                <img src="images/iphone11.jpg" alt="아이폰 11">
                <h3>Apple 아이폰11</h3>
                <p>128GB</p>
                <p class="price">990,000원</p>
                <button class="view-btn" data-href="iphone11.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphonese3">
                <img src="images/iphonse3.png" alt="아이폰 SE3">
                <h3>Apple 아이폰SE3</h3>
                <p>128GB</p>
                <p class="price">650,000원</p>
                <button class="view-btn" data-href="iphonese3.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphonese2">
                <img src="images/iphonese2.jpg" alt="아이폰 SE2">
                <h3>Apple 아이폰SE2</h3>
                <p>128GB</p>
                <p class="price">620,000원</p>
                <button class="view-btn" data-href="iphonese2.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphonexr">
                <img src="images/iphonexr.jpg" alt="아이폰 XR">
                <h3>Apple 아이폰XR</h3>
                <p>128GB</p>
                <p class="price">990,000원</p>
                <button class="view-btn" data-href="iphonexr.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphonex">
                <img src="images/iphonex.jpg" alt="아이폰 X">
                <h3>Apple 아이폰X</h3>
                <p>128GB</p>
                <p class="price">1,360,700원</p>
                <button class="view-btn" data-href="iphonex.html">구매하기</button>
            </div>

            <div class="product-card" data-id="iphonexs">
                <img src="images/iphonexs.jpg" alt="아이폰 XS">
                <h3>Apple 아이폰XS</h3>
                <p>128GB</p>
                <p class="price">1,580,000원</p>
                <button class="view-btn" data-href="iphonexs.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy25ultra">
                <img src="images/galaxy25ultra2.jpg" alt="갤럭시 S25 ultra">
                <h3>SAMSUNG 갤럭시 S25 ultra</h3>
                <p>128GB</p>
                <p class="price">1,850,000원</p>
                <button class="view-btn" data-href="galaxy25ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy25plus">
                <img src="images/galaxy25plus.jpg" alt="갤럭시 S25 plus">
                <h3>SAMSUNG 갤럭시 S25 plus</h3>
                <p>128GB</p>
                <p class="price">1,700,000원</p>
                <button class="view-btn" data-href="galaxy25plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy25">
                <img src="images/galaxyre.jpg" alt="갤럭시 S25 ">
                <h3>SAMSUNG 갤럭시 S25</h3>
                <p>128GB</p>
                <p class="price">1,600,000원</p>
                <button class="view-btn" data-href="galaxy25.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy24ultra">
                <img src="images/galaxy24ultra.jpg" alt="갤럭시 S24 ultra">
                <h3>SAMSUNG 갤럭시 S24 ultra</h3>
                <p>128GB</p>
                <p class="price">1,452,000원</p>
                <button class="view-btn" data-href="galaxy24ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy24plus">
                <img src="images/galaxy24plus.jpg" alt="갤럭시 S24 plus">
                <h3>SAMSUNG 갤럭시 S24 plus</h3>
                <p>128GB</p>
                <p class="price">1,352,000원</p>
                <button class="view-btn" data-href="galaxy24plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy24">
                <img src="images/re3.jpg" alt="갤럭시 S24">
                <h3>SAMSUNG 갤럭시 S24 </h3>
                <p>128GB</p>
                <p class="price">1,115,000원</p>
                <button class="view-btn" data-href="galaxy24.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy23ultra">
                <img src="images/galaxy23ultra.jpg" alt="갤럭시 S23 ultra">
                <h3>SAMSUNG 갤럭시 S23 ultra</h3>
                <p>128GB</p>
                <p class="price">1,599,000원</p>
                <button class="view-btn" data-href="galaxy23ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy23plus">
                <img src="images/galaxy23plus.jpg" alt="갤럭시 S23 plus">
                <h3>SAMSUNG 갤럭시 S23 plus</h3>
                <p>128GB</p>
                <p class="price">1,353,000원</p>
                <button class="view-btn" data-href="galaxy23plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy23">
                <img src="images/re1.jpg" alt="갤럭시 S23">
                <h3>SAMSUNG 갤럭시 S23</h3>
                <p>128GB</p>
                <p class="price">1,144,000원</p>
                <button class="view-btn" data-href="galaxy23.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy23ultra">
                <img src="images/galaxy22ultra.jpg" alt="갤럭시 S22 ultra">
                <h3>SAMSUNG 갤럭시 S22 ultra</h3>
                <p>128GB</p>
                <p class="price">1,459,000원</p>
                <button class="view-btn" data-href="galaxy22ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy22plus">
                <img src="images/galaxy22plus.jpg" alt="갤럭시 S22 plus">
                <h3>SAMSUNG 갤럭시 S22 plus</h3>
                <p>128GB</p>
                <p class="price">1,199,000원</p>
                <button class="view-btn" data-href="galaxy22plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy22">
                <img src="images/galaxy22.jpg" alt="갤럭시 S22">
                <h3>SAMSUNG 갤럭시 S22</h3>
                <p>128GB</p>
                <p class="price">999,000원</p>
                <button class="view-btn" data-href="galaxy22.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy21ultra">
                <img src="images/galaxy21ultra.jpg" alt="갤럭시 S21 ultra">
                <h3>SAMSUNG 갤럭시 S21 ultra</h3>
                <p>128GB</p>
                <p class="price">1,139,000원</p>
                <button class="view-btn" data-href="galaxy21ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy21plus">
                <img src="images/galaxy21plus.jpg" alt="갤럭시 S21 plus">
                <h3>SAMSUNG 갤럭시 S21 plus</h3>
                <p>128GB</p>
                <p class="price">1,199,000원</p>
                <button class="view-btn" data-href="galaxy21plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy21">
                <img src="images/galaxy21.jpg" alt="갤럭시 S21">
                <h3>SAMSUNG 갤럭시 S21</h3>
                <p>128GB</p>
                <p class="price">990,000원</p>
                <button class="view-btn" data-href="galaxy21.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy20ultra">
                <img src="images/galaxy20ultra.jpg" alt="갤럭시 S20 ultra">
                <h3>SAMSUNG 갤럭시 S20 ultra</h3>
                <p>128GB</p>
                <p class="price">1,593,000원</p>
                <button class="view-btn" data-href="galaxy20ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy20plus">
                <img src="images/galaxy20plus.jpg" alt="갤럭시 S20 plus">
                <h3>SAMSUNG 갤럭시 S20 plus</h3>
                <p>128GB</p>
                <p class="price">1,353,000원</p>
                <button class="view-btn" data-href="galaxy20plus.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxy20">
                <img src="images/galaxy20.jpg" alt="갤럭시 S20">
                <h3>SAMSUNG 갤럭시 S20</h3>
                <p>128GB</p>
                <p class="price">995,500원</p>
                <button class="view-btn" data-href="galaxy20.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyflip5">
                <img src="images/galaxyflip5.jpg" alt="갤럭시 Z flip 5">
                <h3>SAMSUNG 갤럭시 Z Flip 5</h3>
                <p>128GB</p>
                <p class="price">1,399,200원</p>
                <button class="view-btn" data-href="galaxyzflip5.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyflip4">
                <img src="images/galaxyflip4.jpg" alt="갤럭시 Z flip 4">
                <h3>SAMSUNG 갤럭시 Z Flip 4</h3>
                <p>128GB</p>
                <p class="price">1,353,200원</p>
                <button class="view-btn" data-href="galaxyzflip4.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyflip3">
                <img src="images/galaxyflip3.jpg" alt="갤럭시 Z flip 3">
                <h3>SAMSUNG 갤럭시 Z Flip 3</h3>
                <p>128GB</p>
                <p class="price">1,254,000원</p>
                <button class="view-btn" data-href="galaxyzflip3.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyflip">
                <img src="images/galaxyflip1.jpg" alt="갤럭시 Z flip">
                <h3>SAMSUNG 갤럭시 Z Flip </h3>
                <p>128GB</p>
                <p class="price">169,200원</p>
                <button class="view-btn" data-href="galaxyzflip.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyfold5">
                <img src="images/galaxyfold5.jpg" alt="갤럭시 Z fold 5">
                <h3>SAMSUNG 갤럭시 Z Fold 5</h3>
                <p>128GB</p>
                <p class="price">2,097,700원</p>
                <button class="view-btn" data-href="galaxyzfold5.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyfold4">
                <img src="images/re2.jpg" alt="갤럭시 Z fold 4">
                <h3>SAMSUNG 갤럭시 Z Fold 4</h3>
                <p>128GB</p>
                <p class="price">1,998,700원</p>
                <button class="view-btn" data-href="galaxyzfold4.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyfold3">
                <img src="images/galaxyfold3.jpg" alt="갤럭시 Z fold 3">
                <h3>SAMSUNG 갤럭시 Z Fold 3</h3>
                <p>128GB</p>
                <p class="price">1,998,700원</p>
                <button class="view-btn" data-href="galaxyzfold3.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyfold2">
                <img src="images/galaxyfold2.jpg" alt="갤럭시 Z fold 2">
                <h3>SAMSUNG 갤럭시 Z Fold 2</h3>
                <p>128GB</p>
                <p class="price">1,808,700원</p>
                <button class="view-btn" data-href="galaxyzfold2.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxyfold1">
                <img src="images/galaxyfold1.jpg" alt="갤럭시 Z fold 1">
                <h3>SAMSUNG 갤럭시 Z Fold 1</h3>
                <p>128GB</p>
                <p class="price">950,700원</p>
                <button class="view-btn" data-href="galaxyzfold1.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxynote20ultra">
                <img src="images/galaxynote20ultra.jpg" alt="갤럭시 note20ultra">
                <h3>SAMSUNG 갤럭시 Note20 ultra</h3>
                <p>128GB</p>
                <p class="price">1,452,000원</p>
                <button class="view-btn" data-href="galaxynote20ultra.html">구매하기</button>
            </div>

            <div class="product-card" data-id="galaxynote20">
                <img src="images/galaxynote20.jpg" alt="갤럭시 note20">
                <h3>SAMSUNG 갤럭시 Note 20</h3>
                <p>128GB</p>
                <p class="price">1,199,000원</p>
                <button class="view-btn" data-href="galaxynote20.html">구매하기</button>
            </div>
        </div>
    </div>
    <script src="resources/assets/css/PLUG.css"></script>
</body>
</html>