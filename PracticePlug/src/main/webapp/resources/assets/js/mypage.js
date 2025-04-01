document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 구현
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).style.display = 'block';
            
            if (tabId === 'favorites-tab') {
                loadFavorite();
            } else if (tabId === 'trading-tab') {
                loadTradingItems();
            } else if (tabId === 'completed-tab') {
                loadCompletedItems();
            } else if (tabId === 'profile-tab') {
                loadUserInfo();
            }
        });
    });

    // 프로필 이미지 변경 기능
    const profileImgInput = document.getElementById('profile-img-input');
    const changeProfileBtn = document.getElementById('change-profile-btn');
    if (changeProfileBtn && profileImgInput) {
        changeProfileBtn.addEventListener('click', function() {
            profileImgInput.click();
        });

        profileImgInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-img').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 상품 등록 폼 처리
    document.getElementById('register-item-form')?.addEventListener('submit', function(e) {
        const imageFile = document.getElementById('phone_img1')?.files[0];
        if (!imageFile) {
            e.preventDefault();
            alert('상품 이미지를 선택해주세요!');
        }
    });

    // 프로필 정보 저장
    document.getElementById('profile-form')?.addEventListener('submit', function(e) {
        const userPw = document.getElementById('user_pw')?.value;
        if (userPw && userPw.length < 6) {
            e.preventDefault();
            alert('비밀번호는 6자 이상이어야 합니다.');
        }
    });
});

// 사용자 정보 불러오기
function loadUserInfo() {
    if (!userData || !userData.user_id) {
        console.error('세션 데이터가 없습니다.');
        window.location.href = '/login';
        return;
    }

    console.log('사용자 정보 로드:', userData);

    document.getElementById('user_id').value = userData.user_id || '';
    document.getElementById('user_pw').value = '';
    document.getElementById('user_birthdate').value = userData.user_birthdate || '';
    document.getElementById('user_nick').value = userData.user_nick || '';
    document.getElementById('user_phone').value = userData.user_phone || '';
    document.getElementById('user_addr').value = userData.user_addr || '';
    document.getElementById('user_account').value = userData.user_account || '';
}

// 거래중인 상품 목록 로드
function loadTradingItems() {
    const container = document.getElementById('trading-items-list');
    
    if (!tradingItems || tradingItems.length === 0) {
        container.innerHTML = '<p>거래중인 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = tradingItems.map(product => `
        <div class="product-item" data-id="${product.phone_idx}">
            <img src="${product.phone_img1}" alt="${product.brand} ${product.model}">
            <div class="product-info">
                <h3>${product.brand} ${product.model}</h3>
                <p>용량: ${product.capacity}</p>
                <p>색상: ${product.color}</p>
                <p>품질: ${product.quality}</p>
                <p class="price">${product.price.toLocaleString()}원</p>
                <p>등록일: ${new Date(product.created_at).toLocaleDateString()}</p>
                <form action="/updateProductStatus.do" method="post" style="display: inline;">
                    <input type="hidden" name="productId" value="${product.phone_idx}">
                    <input type="hidden" name="status" value="completed">
                    <button type="submit" class="complete-btn">거래완료</button>
                </form>
                <form action="/deleteProduct.do" method="post" style="display: inline;">
                    <input type="hidden" name="productId" value="${product.phone_idx}">
                    <button type="submit" class="delete-btn" onclick="return confirm('정말로 이 상품을 삭제하시겠습니까?')">삭제</button>
                </form>
            </div>
        </div>
    `).join('');
}

// 찜 목록 불러오기
function loadFavorite() {
    const container = document.getElementById('favorites-list');

    if (!favorite || favorite.length === 0) {
        container.innerHTML = '<p>찜한 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = favorite.map(item => `
        <div class="favorite-item" data-id="${item.phone_idx}">
            <img src="${item.phone_img1}" alt="${item.brand} ${item.model}">
            <div class="favorite-info">
                <h3>${item.brand} ${item.model}</h3>
                <p>${item.capacity}</p>
                <p class="price">${item.price.toLocaleString()}원</p>
                <form action="/removeFromWishlist.do" method="post" style="display: inline;">
                    <input type="hidden" name="productId" value="${item.phone_idx}">
                    <button type="submit" class="remove-btn">삭제</button>
                </form>
            </div>
        </div>
    `).join('');
}

// 거래완료 상품 목록 로드
function loadCompletedItems() {
    const container = document.getElementById('completed-items-list');
    
    if (!completedItems || completedItems.length === 0) {
        container.innerHTML = '<p>거래완료된 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = completedItems.map(product => `
        <div class="product-item" data-id="${product.phone_idx}">
            <img src="${product.phone_img1}" alt="${product.brand} ${product.model}">
            <div class="product-info">
                <h3>${product.brand} ${product.model}</h3>
                <p>용량: ${product.capacity}</p>
                <p>색상: ${product.color}</p>
                <p>품질: ${product.quality}</p>
                <p class="price">${product.price.toLocaleString()}원</p>
                <p>등록일: ${new Date(product.created_at).toLocaleDateString()}</p>
                <form action="/deleteProduct.do" method="post" style="display: inline;">
                    <input type="hidden" name="productId" value="${product.phone_idx}">
                    <button type="submit" class="delete-btn" onclick="return confirm('정말로 이 상품을 삭제하시겠습니까?')">삭제</button>
                </form>
            </div>
        </div>
    `).join('');
}