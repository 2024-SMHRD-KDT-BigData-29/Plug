document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 구현 (변경 없음)
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
            const formData = new FormData();
            formData.append('profile_image', file);

            fetch('/updateProfileImage.do', {  // .do 엔드포인트로 변경
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            .then(response => {
                if (!response.ok) throw new Error('프로필 이미지 업데이트 실패');
                return response.json();
            })
            .then(data => {
                if(data.status === "success") {
                    profileImg.src = data.imageUrl;
                    alert('프로필 이미지가 업데이트되었습니다.');
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
                window.location.href = 'login.do';  // .do로 변경
            });
        }
    });

    // 사용자 정보 로드
    loadUserInfo();

    // 상품 등록 폼 처리
    document.getElementById('register-item-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerProduct();
    });
});

// 사용자 정보 불러오기
async function loadUserInfo() {
    try {
        const response = await fetch('/getUserInfo.do', {  // .do 엔드포인트로 변경
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = 'login.do';  // .do로 변경
            return;
        }

        if (!response.ok) throw new Error('사용자 정보를 불러올 수 없습니다.');

        const loginUser = await response.json();
        console.log(loginUser);

        // TB_User 필드명에 맞춰 수정
        document.getElementById('user_id').value = loginUser.user_id || '';
        document.getElementById('user_pw').value = '';
        document.getElementById('user_birthdate').value = loginUser.user_birthdate || '';
        document.getElementById('user_nick').value = loginUser.user_nick || '';
        document.getElementById('user_phone').value = loginUser.user_phone || '';
        document.getElementById('user_addr').value = loginUser.user_addr || '';
        document.getElementById('user_account').value = loginUser.user_account || '';
        
        
        
        
        if (userData.profile_img) {
            document.getElementById('profile-img').src = userData.profile_img;
        }

    } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
        alert(error.message);
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 프로필 정보 저장
document.getElementById('profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        const userData = {
            user_pw: document.getElementById('user_pw').value,
            user_birthdate: document.getElementById('user_birthdate').value,  // 필드명 일치
            user_nick: document.getElementById('user_nick').value,
            user_phone: document.getElementById('user_phone').value,
            user_addr: document.getElementById('user_addr').value,
            user_account: document.getElementById('user_account').value
        };

        const response = await fetch('/updateUserInfo.do', {  // .do 엔드포인트로 변경
            method: 'POST',  // 전자정부프레임워크에서 PUT 대신 POST 사용
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        const result = await response.text();
        if(result === "success") {
            alert('프로필 정보가 성공적으로 업데이트되었습니다.');
        } else {
            throw new Error('프로필 업데이트 실패: ' + result);
        }
    } catch (error) {
        console.error('프로필 저장 실패:', error);
        alert(error.message);
        window.location.href = 'login.do';  // .do로 변경
    }
});

// 상품 등록 함수
async function registerProduct() {
    try {
        const formData = new FormData();
        const imageFile = document.getElementById('PHONE_IMG1').files[0];
        
        if (!imageFile) {
            alert('상품 이미지를 선택해주세요!');
            return;
        }

        formData.append('phone_img1', imageFile);
        formData.append('brand', document.getElementById('brand').value);
        formData.append('model', document.getElementById('model').value);
        formData.append('capacity', document.getElementById('capacity').value);
        formData.append('color', document.getElementById('color').value);
        formData.append('quality', document.getElementById('quality').value);
        formData.append('price', document.getElementById('price').value);

        const response = await fetch('/registerProduct.do', {  // .do 엔드포인트로 변경
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.text();
        if(result === "success") {
            alert('상품이 성공적으로 등록되었습니다!');
            document.getElementById('register-item-form').reset();
            loadTradingItems();
        } else {
            throw new Error('상품 등록 실패: ' + result);
        }
    } catch (error) {
        console.error('상품 등록 실패:', error);
        alert(error.message);
        window.location.href = 'login.do';  // .do로 변경
    }
}

// 거래중인 상품 목록 로드
async function loadTradingItems() {
    try {
        const response = await fetch('/getTradingItems.do', {  // .do 엔드포인트로 변경
            credentials: 'include'
        });

        if (!response.ok) throw new Error('거래중인 상품 목록을 불러올 수 없습니다.');

        const products = await response.json();
        const container = document.getElementById('trading-items-list');
        
        if (products.length === 0) {
            container.innerHTML = '<p>거래중인 상품이 없습니다.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="product-item" data-id="${product.phone_idx}">
                <img src="${product.phone_mag1 || 'images/default-phone.jpg'}" alt="${product.brand} ${product.model}">
                <div class="product-info">
                    <h3>${product.brand} ${product.model}</h3>
                    <p>용량: ${product.capacity}</p>
                    <p>색상: ${product.color}</p>
                    <p>품질: ${product.quality}</p>
                    <p class="price">${product.price.toLocaleString()}원</p>
                    <p>등록일: ${new Date(product.created_at).toLocaleDateString()}</p>
                    <button class="complete-btn" data-id="${product.phone_idx}">거래완료</button>
                    <button class="delete-btn" data-id="${product.phone_idx}">삭제</button>
                </div>
            </div>
        `).join('');

        // 버튼 이벤트 바인딩 (변경 없음)
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                updateProductStatus(productId, 'completed');
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                    const productId = this.getAttribute('data-id');
                    deleteProduct(productId);
                }
            });
        });
    } catch (error) {
        console.error('거래중인 상품 목록 불러오기 실패:', error);
        document.getElementById('trading-items-list').innerHTML = 
            '<p>상품 목록을 불러오는 중 오류가 발생했습니다.</p>';
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 상품 상태 업데이트
async function updateProductStatus(productId, newStatus) {
    try {
        const response = await fetch(`/updateProductStatus.do?productId=${productId}`, {  // .do 엔드포인트로 변경
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus }),
            credentials: 'include'
        });

        const result = await response.text();
        if(result === "success") {
            alert('상품 상태가 업데이트되었습니다.');
            loadTradingItems();
            loadCompletedItems();
        } else {
            throw new Error('상품 상태 업데이트 실패: ' + result);
        }
    } catch (error) {
        console.error('상품 상태 업데이트 실패:', error);
        alert(error.message);
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 상품 삭제
async function deleteProduct(productId) {
    try {
        const response = await fetch(`/deleteProduct.do?productId=${productId}`, {  // .do 엔드포인트로 변경
            method: 'POST',  // 전자정부프레임워크에서 DELETE 대신 POST 사용
            credentials: 'include'
        });

        const result = await response.text();
        if(result === "success") {
            alert('상품이 삭제되었습니다.');
            loadTradingItems();
            loadCompletedItems();
        } else {
            throw new Error('상품 삭제 실패: ' + result);
        }
    } catch (error) {
        console.error('상품 삭제 실패:', error);
        alert(error.message);
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 찜 목록 불러오기
async function loadWishlist() {
    try {
        const response = await fetch('/getWishlist.do', {  // .do 엔드포인트로 변경
            credentials: 'include'
        });

        if (!response.ok) throw new Error('찜 목록을 불러올 수 없습니다.');

        const wishlist = await response.json();
        const container = document.getElementById('favorites-list');

        if (wishlist.length === 0) {
            container.innerHTML = '<p>찜한 상품이 없습니다.</p>';
            return;
        }

        container.innerHTML = wishlist.map(item => `
            <div class="favorite-item" data-id="${item.phone_idx}">
                <img src="${item.phone_mag1 || 'https://via.placeholder.com/150'}" alt="${item.brand} ${item.model}">
                <div class="favorite-info">
                    <h3>${item.brand} ${item.model}</h3>
                    <p>${item.capacity}</p>
                    <p class="price">${item.price.toLocaleString()}원</p>
                    <button class="remove-btn" data-id="${item.phone_idx}">삭제</button>
                </div>
            </div>
        `).join('');

        // 삭제 버튼 이벤트 (변경 없음)
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                removeFromWishlist(productId);
            });
        });
    } catch (error) {
        console.error('찜 목록 불러오기 실패:', error);
        document.getElementById('favorites-list').innerHTML = 
            '<p>찜 목록을 불러오는 중 오류가 발생했습니다.</p>';
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 찜 목록에서 제거
async function removeFromWishlist(productId) {
    try {
        const response = await fetch(`/removeFromWishlist.do?productId=${productId}`, {  // .do 엔드포인트로 변경
            method: 'POST',  // 전자정부프레임워크에서 DELETE 대신 POST 사용
            credentials: 'include'
        });

        const result = await response.text();
        if(result === "success") {
            alert('찜 목록에서 상품이 제거되었습니다.');
            loadWishlist();
        } else {
            throw new Error('찜 목록에서 제거 실패: ' + result);
        }
    } catch (error) {
        console.error('찜 목록에서 상품 제거 실패:', error);
        alert(error.message);
        window.location.href = 'mypage.do';  // .do로 변경
    }
}

// 거래완료 상품 목록 로드
async function loadCompletedItems() {
    try {
        const response = await fetch('/getCompletedItems.do', {  // .do 엔드포인트로 변경
            credentials: 'include'
        });

        if (!response.ok) throw new Error('거래완료 상품 목록을 불러올 수 없습니다.');

        const products = await response.json();
        const container = document.getElementById('completed-items-list');
        
        if (products.length === 0) {
            container.innerHTML = '<p>거래완료된 상품이 없습니다.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="product-item" data-id="${product.phone_idx}">
                <img src="${product.phone_mag1 || 'images/default-phone.jpg'}" alt="${product.brand} ${product.model}">
                <div class="product-info">
                    <h3>${product.brand} ${product.model}</h3>
                    <p>용량: ${product.capacity}</p>
                    <p>색상: ${product.color}</p>
                    <p>품질: ${product.quality}</p>
                    <p class="price">${product.price.toLocaleString()}원</p>
                    <p>등록일: ${new Date(product.created_at).toLocaleDateString()}</p>
                    <button class="delete-btn" data-id="${product.phone_idx}">삭제</button>
                </div>
            </div>
        `).join('');

        // 삭제 버튼 이벤트 (변경 없음)
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                    const productId = this.getAttribute('data-id');
                    deleteProduct(productId);
                }
            });
        });
    } catch (error) {
        console.error('거래완료 상품 목록 불러오기 실패:', error);
        document.getElementById('completed-items-list').innerHTML = 
            '<p>상품 목록을 불러오는 중 오류가 발생했습니다.</p>';
        window.location.href = 'mypage.do';  // .do로 변경
    }
}