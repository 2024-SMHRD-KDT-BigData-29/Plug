document.addEventListener('DOMContentLoaded', function() {
    // 모달 요소
    const model = document.getElementById('phone-model');
    const closeBtn = document.querySelector('.close-btn');
    const phoneList = document.getElementById('phone-list');
    
    // 필터 요소
    const brandFilter = document.getElementById('brand-filter');
    const qualityFilter = document.getElementById('quality-filter');
    const filterBtn = document.getElementById('filter-btn');
    
    // 모달 닫기
    closeBtn.addEventListener('click', () => {
        model.style.display = 'none';
    });
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === model) {
            model.style.display = 'none';
        }
    });
    
    // 필터 적용
    filterBtn.addEventListener('click', loadPhones);
    
    // 초기 상품 목록 로드
    loadPhones();
    
    // 상품 목록 불러오기 (AJAX)
    async function loadPhones() {
        try {
            const brand = brandFilter.value;
            const quality = qualityFilter.value;
            
            // 필터 파라미터 생성
            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (quality) params.append('quality', quality);
            
            const response = await fetch(`/api/phones?${params.toString()}`);
            const phones = await response.json();
            
            if (!response.ok) {
                throw new Error(phones.message || '상품 목록을 불러올 수 없습니다.');
            }
            
            renderPhoneList(phones);
        } catch (error) {
            console.error('상품 목록 로드 실패:', error);
            phoneList.innerHTML = '<p>상품 목록을 불러오는 중 오류가 발생했습니다.</p>';
        }
    }
    
    // 상품 목록 렌더링
    function renderPhoneList(phones) {
        if (phones.length === 0) {
            phoneList.innerHTML = '<p>등록된 상품이 없습니다.</p>';
            return;
        }
        
        phoneList.innerHTML = phones.map(phone => `
            <div class="phone-item" data-id="${phone.PHONE_IDX}">
                <div class="phone-image">
                    <img src="${phone.PHONE_MAG1 || 'images/default-phone.jpg'}" alt="${phone.BRAND} ${phone.MODEL}">
                </div>
                <div class="phone-info">
                    <h3>${phone.BRAND} ${phone.MODEL}</h3>
                    <p>용량: ${phone.CAPACITY}</p>
                    <p>색상: ${phone.COLOR}</p>
                    <p>품질: ${phone.QUALITY}</p>
                    <p class="price">${phone.PRICE.toLocaleString()}원</p>
                    <p>상태: ${phone.DEAL_STATUS}</p>
                </div>
            </div>
        `).join('');
        
        // 상품 클릭 이벤트 바인딩
        document.querySelectorAll('.phone-item').forEach(item => {
            item.addEventListener('click', function() {
                const phoneId = this.getAttribute('data-id');
                showPhoneDetails(phoneId);
            });
        });
    }
    
    // 상품 상세 정보 보기
    async function showPhoneDetails(phoneId) {
        try {
            // 상품 정보 가져오기
            const phoneResponse = await fetch(`/api/phones/${phoneId}`);
            const phone = await phoneResponse.json();
            
            if (!phoneResponse.ok) {
                throw new Error(phone.message || '상품 정보를 불러올 수 없습니다.');
            }
            
            // 판매자 정보 가져오기
            const sellerResponse = await fetch(`/api/users/${phone.SELLER_ID}`);
            const seller = await sellerResponse.json();
            
            if (!sellerResponse.ok) {
                throw new Error(seller.message || '판매자 정보를 불러올 수 없습니다.');
            }
            
            // 모달에 정보 채우기
            document.getElementById('model-phone-name').textContent = `${phone.BRAND} ${phone.MODEL}`;
            document.getElementById('model-phone-price').textContent = `${phone.PRICE.toLocaleString()}원`;
            document.getElementById('model-seller-id').textContent = seller.USER_NICK || phone.SELLER_ID;
            document.getElementById('model-phone-capacity').textContent = phone.CAPACITY;
            document.getElementById('model-phone-color').textContent = phone.COLOR;
            document.getElementById('model-phone-quality').textContent = phone.QUALITY;
            document.getElementById('model-created-at').textContent = new Date(phone.CREATED_AT).toLocaleString();
            document.getElementById('model-deal-status').textContent = phone.DEAL_STATUS;
            document.getElementById('model-phone-memo').textContent = phone.MEMO || '없음';
            
            // 이미지 영역 초기화 및 이미지 추가
            const imagesContainer = document.getElementById('phone-images');
            imagesContainer.innerHTML = '';
            
            [phone.PHONE_MAG1, phone.PHONE_MAG2, phone.PHONE_MAG3].forEach(img => {
                if (img) {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    imgElement.alt = `${phone.BRAND} ${phone.MODEL} 이미지`;
                    imagesContainer.appendChild(imgElement);
                }
            });
            
            // 버튼 이벤트 설정
            document.getElementById('add-favorite-btn').onclick = () => addToFavorite(phone.PHONE_IDX);
            document.getElementById('start-chat-btn').onclick = () => startChat(phone.PHONE_IDX, phone.SELLER_ID);
            document.getElementById('buy-now-btn').onclick = () => buyNow(phone.PHONE_IDX);
            
            // 모달 표시
            model.style.display = 'block';
        } catch (error) {
            console.error('상품 상세 정보 로드 실패:', error);
            alert(error.message);
        }
    }
    
    // 찜하기 기능
    async function addToFavorite(phoneId) {
        try {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    PHONE_IDX: phoneId,
                    USER_ID: localStorage.getItem('userId')
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '찜하기 실패');
            }
            
            alert('상품을 찜 목록에 추가했습니다!');
        } catch (error) {
            console.error('찜하기 실패:', error);
            alert(error.message);
        }
    }
    
    // 채팅 시작
    async function startChat(phoneId, sellerId) {
        try {
            // 채팅방 생성 또는 기존 채팅방 확인
            const response = await fetch('/api/chatrooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    PHONE_IDX: phoneId,
                    SELLER_ID: sellerId,
                    BUYER_ID: localStorage.getItem('userId'),
                    CROOM_TITLE: `${document.getElementById('model-phone-name').textContent} 거래`
                })
            });
            
            const chatroom = await response.json();
            
            if (!response.ok) {
                throw new Error(chatroom.message || '채팅방 생성 실패');
            }
            
            // 채팅 페이지로 이동
            window.location.href = `chat.html?roomId=${chatroom.CROOM_IDX}`;
        } catch (error) {
            console.error('채팅 시작 실패:', error);
            alert(error.message);
        }
    }
    
    // 바로 구매
    async function buyNow(phoneId) {
        try {
            const response = await fetch('/api/deals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    PHONE_IDX: phoneId,
                    USER_ID: localStorage.getItem('userId'),
                    PAY_METHOD: '직거래',
                    PAY_AMOUNT: parseInt(document.getElementById('model-phone-price').textContent.replace(/[^0-9]/g, ''))
                })
            });
            
            const deal = await response.json();
            
            if (!response.ok) {
                throw new Error(deal.message || '구매 처리 실패');
            }
            
            // 상품 상태 업데이트
            const updateResponse = await fetch(`/api/phones/${phoneId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ DEAL_STATUS: '거래완료' })
            });
            
            if (!updateResponse.ok) {
                throw new Error('상품 상태 업데이트 실패');
            }
            
            alert('구매가 완료되었습니다!');
            model.style.display = 'none';
            loadPhones(); // 목록 새로고침
        } catch (error) {
            console.error('구매 실패:', error);
            alert(error.message);
        }
    }
});