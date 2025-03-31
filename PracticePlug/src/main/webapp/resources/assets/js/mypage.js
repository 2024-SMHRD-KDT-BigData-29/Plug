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

    if (changeProfileBtn && profileImgInput) {
        changeProfileBtn.addEventListener('click', function() {
            profileImgInput.click();
        });

        profileImgInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('profile_image', file);

                fetch('http://localhost:8080/myapp/updateProfileImage.do', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                })
                .then(response => {
                    if (!response.ok) throw new Error('프로필 이미지 업데이트 실패');
                    return response.json();
                })
                .then(data => {
                    if (data.status === "success") {
                        profileImg.src = data.imageUrl;
                        profileImg.style.display = 'block';
                        alert('프로필 이미지가 업데이트되었습니다.');
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message);
                    window.location.href = 'http://localhost:8080/myapp/login.do';
                });
            }
        });
    }

    // 사용자 정보 로드
    loadUserInfo();

    // 상품 등록 폼 처리
    document.getElementById('register-item-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerProduct();
    });

    // 프로필 정보 저장
    document.getElementById('profile-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        try {
            const updatedUserData = {
                user_pw: document.getElementById('user_pw').value,
                user_birthdate: document.getElementById('user_birthdate').value,
                user_nick: document.getElementById('user_nick').value,
                user_phone: document.getElementById('user_phone').value,
                user_addr: document.getElementById('user_addr').value,
                user_account: document.getElementById('user_account').value
            };
            const response = await fetch('http://localhost:8080/myapp/updateUserInfo.do', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData),
                credentials: 'include'
            });
            const result = await response.text();
            if (result === "success") {
                alert('프로필 정보가 성공적으로 업데이트되었습니다.');
                window.location.reload(); // 세션 데이터 갱신을 위해 새로고침
            } else {
                throw new Error('프로필 업데이트 실패: ' + result);
            }
        } catch (error) {
            console.error('프로필 저장 실패:', error);
            alert(error.message);
            window.location.href = 'http://localhost:8080/myapp/login.do';
        }
    });
});

// 사용자 정보 불러오기
function loadUserInfo() {
    // JSP에서 전달된 userData 사용
    if (!userData || !userData.user_id) {
        console.error('세션 데이터가 없습니다.');
        window.location.href = 'http://localhost:8080/myapp/login.do';
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

    // 프로필 이미지가 있다면 (필요 시)
    // if (userData.profile_img) {
    //     document.getElementById('profile-img').src = userData.profile_img;
    //     document.getElementById('profile-img').style.display = 'block';
    // }
}

// 상품 등록 함수
function registerProduct() {
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

    fetch('http://localhost:8080/myapp/registerProduct.do', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })
    .then(response => response.text())
    .then(result => {
        if (result === "success") {
            alert('상품이 성공적으로 등록되었습니다!');
            document.getElementById('register-item-form').reset();
            window.location.reload(); // 데이터 갱신
        } else {
            throw new Error('상품 등록 실패: ' + result);
        }
    })
    .catch(error => {
        console.error('상품 등록 실패:', error);
        alert(error.message);
        window.location.href = 'http://localhost:8080/myapp/login.do';
    });
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
            <img src="${product.phone_mag1}" alt="${product.brand} ${product.model}">
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
}

// 상품 상태 업데이트
function updateProductStatus(productId, newStatus) {
    fetch(`http://localhost:8080/myapp/updateProductStatus.do?productId=${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
    })
    .then(response => response.text())
    .then(result => {
        if (result === "success") {
            alert('상품 상태가 업데이트되었습니다.');
            window.location.reload(); // 데이터 갱신
        } else {
            throw new Error('상품 상태 업데이트 실패: ' + result);
        }
    })
    .catch(error => {
        console.error('상품 상태 업데이트 실패:', error);
        alert(error.message);
        window.location.href = 'http://localhost:8080/myapp/mypage.do';
    });
}

// 상품 삭제
function deleteProduct(productId) {
    fetch(`http://localhost:8080/myapp/deleteProduct.do?productId=${productId}`, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(result => {
        if (result === "success") {
            alert('상품이 삭제되었습니다.');
            window.location.reload(); // 데이터 갱신
        } else {
            throw new Error('상품 삭제 실패: ' + result);
        }
    })
    .catch(error => {
        console.error('상품 삭제 실패:', error);
        alert(error.message);
        window.location.href = 'http://localhost:8080/myapp/mypage.do';
    });
}

// 찜 목록 불러오기
function loadWishlist() {
    const container = document.getElementById('favorites-list');

    if (!wishlist || wishlist.length === 0) {
        container.innerHTML = '<p>찜한 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="favorite-item" data-id="${item.phone_idx}">
            <img src="${item.phone_mag1}" alt="${item.brand} ${item.model}">
            <div class="favorite-info">
                <h3>${item.brand} ${item.model}</h3>
                <p>${item.capacity}</p>
                <p class="price">${item.price.toLocaleString()}원</p>
                <button class="remove-btn" data-id="${item.phone_idx}">삭제</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromWishlist(productId);
        });
    });
}

// 찜 목록에서 제거
function removeFromWishlist(productId) {
    fetch(`http://localhost:8080/myapp/removeFromWishlist.do?productId=${productId}`, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(result => {
        if (result === "success") {
            alert('찜 목록에서 상품이 제거되었습니다.');
            window.location.reload(); // 데이터 갱신
        } else {
            throw new Error('찜 목록에서 제거 실패: ' + result);
        }
    })
    .catch(error => {
        console.error('찜 목록에서 상품 제거 실패:', error);
        alert(error.message);
        window.location.href = 'http://localhost:8080/myapp/mypage.do';
    });
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
            <img src="${product.phone_mag1}" alt="${product.brand} ${product.model}">
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

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            }
        });
    });
}
