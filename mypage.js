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
            
            // 탭별로 해당 목록 로드
            if (tabId === 'favorites-tab') {
                loadWishlist();
            } else if (tabId === 'trading-tab') {
                loadTradingItems();
            } else if (tabId === 'completed-tab') {
                loadCompletedItems();
            }
        });
    });

    // 프로필 이미지 변경 기능
    const profileImgInput = document.getElementById('profile-img-input');
    const profileImg = document.getElementById('profile-img');
    const changeProfileBtn = document.getElementById('change-profile-btn');

    changeProfileBtn.addEventListener('click', function() {
        profileImgInput.click();
    });

    profileImgInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImg.src = event.target.result;
                localStorage.setItem('profileImage', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // 저장된 프로필 이미지 로드
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
        profileImg.src = savedProfileImage;
    }

    // 사용자 정보 로드
    loadUserInfo();

    // 상품 등록 폼 처리
    document.getElementById('register-item-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerProduct();
    });

    // 초기 데이터 로드 (개인정보 탭이 기본으로 열림)
});

// 사용자 정보 불러오기
async function loadUserInfo() {
    try {
        const username = localStorage.getItem('username');
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn || !username) {
            alert('로그인이 필요합니다!');
            window.location.href = 'login.html';
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem('user_' + username)) || {};

        document.getElementById('USER_ID').value = userInfo.username || '';
        document.getElementById('USER_PW').value = userInfo.password || '';
        document.getElementById('USER_BIRTHDATE').value = userInfo.birth || '';
        document.getElementById('USER_NICK').value = userInfo.nick || '';
        document.getElementById('USER_PHONE').value = userInfo.phone || '';
        document.getElementById('USER_ADDR').value = userInfo.address || '';
        document.getElementById('USER_ACCOUNT').value = userInfo.account || '';
        document.getElementById('JOINED_AT').value = userInfo.join || '';
    } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
        alert('사용자 정보를 불러올 수 없습니다.');
    }
}

// 프로필 정보 저장
document.getElementById('profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !username) {
        alert('로그인이 필요합니다!');
        window.location.href = 'login.html';
        return;
    }

    const userInfo = {
        username: document.getElementById('USER_ID').value,
        password: document.getElementById('USER_PW').value,
        birth: document.getElementById('USER_BIRTHDATE').value,
        nick: document.getElementById('USER_NICK').value,
        phone: document.getElementById('USER_PHONE').value,
        address: document.getElementById('USER_ADDR').value,
        account: document.getElementById('USER_ACCOUNT').value,
        join: document.getElementById('JOINED_AT').value
    };

    localStorage.setItem('user_' + username, JSON.stringify(userInfo));
    alert('프로필 정보가 저장되었습니다.');
});

// 상품 등록 함수
function registerProduct() {
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !username) {
        alert('로그인이 필요합니다!');
        window.location.href = 'login.html';
        return;
    }

    const imageInput = document.getElementById('PHONE_IMG1');
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        alert('상품 이미지를 선택해주세요!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const product = {
            id: Date.now().toString(),
            image: e.target.result,
            brand: document.getElementById('BRAND').value,
            model: document.getElementById('MODEL').value,
            capacity: document.getElementById('CAPACITY').value,
            color: document.getElementById('COLOR').value,
            quality: document.getElementById('QUALITY').value,
            price: document.getElementById('PRICE').value,
            status: '거래중',
            seller: username,
            date: new Date().toLocaleDateString(),
            buyer: null
        };

        // 기존 상품 목록 가져오기
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        alert('상품이 등록되었습니다!');
        document.getElementById('register-item-form').reset();
        loadTradingItems();
    };
    reader.readAsDataURL(imageFile);
}

// 거래중인 상품 목록 로드
function loadTradingItems() {
    const username = localStorage.getItem('username');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const tradingItems = products.filter(
        product => product.seller === username && product.status === '거래중'
    );

    const container = document.getElementById('trading-items-list');
    
    if (tradingItems.length === 0) {
        container.innerHTML = '<p>거래중인 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = tradingItems.map(item => `
        <div class="product-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.brand} ${item.model}">
            <div class="product-info">
                <h3>${item.brand} ${item.model}</h3>
                <p>용량: ${item.capacity}</p>
                <p>색상: ${item.color}</p>
                <p>품질: ${item.quality}</p>
                <p class="price">가격: ${item.price}</p>
                <p>등록일: ${item.date}</p>
                <button class="complete-btn" data-id="${item.id}">거래완료</button>
                <button class="delete-btn" data-id="${item.id}">삭제</button>
            </div>
        </div>
    `).join('');

    // 거래완료 버튼 이벤트
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            updateProductStatus(productId, '거래완료');
        });
    });

    // 삭제 버튼 이벤트
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            }
        });
    });
}

// 거래완료 상품 목록 로드
function loadCompletedItems() {
    const username = localStorage.getItem('username');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const completedItems = products.filter(
        product => product.seller === username && product.status === '거래완료'
    );

    const container = document.getElementById('completed-items-list');
    
    if (completedItems.length === 0) {
        container.innerHTML = '<p>거래완료된 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = completedItems.map(item => `
        <div class="product-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.brand} ${item.model}">
            <div class="product-info">
                <h3>${item.brand} ${item.model}</h3>
                <p>용량: ${item.capacity}</p>
                <p>색상: ${item.color}</p>
                <p>품질: ${item.quality}</p>
                <p class="price">가격: ${item.price}</p>
                <p>등록일: ${item.date}</p>
                <button class="delete-btn" data-id="${item.id}">삭제</button>
            </div>
        </div>
    `).join('');
         // 삭제 버튼 이벤트 바인딩 (기존 deleteProduct 함수 재사용)
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            }
        });
    });





}

// 상품 상태 업데이트 (거래중 -> 거래완료)
function updateProductStatus(productId, newStatus) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        products[productIndex].status = newStatus;
        // 거래완료일 경우 날짜도 업데이트
        if (newStatus === '거래완료') {
            products[productIndex].completedDate = new Date().toLocaleDateString();
        }
        localStorage.setItem('products', JSON.stringify(products));
        
        // 목록 갱신
        loadTradingItems();
        loadCompletedItems();
    }
}

// 상품 삭제
function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    
    // 목록 갱신
    loadTradingItems();
    loadCompletedItems();
}

// 찜 목록 불러오기
async function loadWishlist() {
    try {
        const username = localStorage.getItem('username');
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn || !username) {
            alert('로그인이 필요합니다!');
            window.location.href = 'login.html';
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem('wishlist_' + username)) || [];
        const container = document.getElementById('favorites-list');

        if (wishlist.length === 0) {
            container.innerHTML = '<p>찜한 상품이 없습니다.</p>';
            return;
        }

        container.innerHTML = wishlist.map((item, index) => `
            <div class="favorite-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150'">
                <div class="favorite-info">
                    <h3>${item.name}</h3>
                    <p>${item.capacity}</p>
                    <p class="price">${item.price}</p>
                    <button class="remove-btn">삭제</button>
                </div>
            </div>
        `).join('');

        // 삭제 버튼 이벤트 리스너 추가
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemIndex = this.closest('.favorite-item').getAttribute('data-index');
                removeFromWishlist(itemIndex);
            });
        });
    } catch (error) {
        console.error('찜 목록 불러오기 실패:', error);
        alert('찜 목록을 불러올 수 없습니다.');
    }
}

// 찜 목록에서 제거
async function removeFromWishlist(itemIndex) {
    try {
        const username = localStorage.getItem('username');
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn || !username) {
            alert('로그인이 필요합니다!');
            window.location.href = 'login.html';
            return;
        }

        let wishlist = JSON.parse(localStorage.getItem('wishlist_' + username)) || [];
        wishlist.splice(itemIndex, 1);
        localStorage.setItem('wishlist_' + username, JSON.stringify(wishlist));
        loadWishlist();
    } catch (error) {
        console.error('찜 목록에서 상품 삭제 실패:', error);
    }
}