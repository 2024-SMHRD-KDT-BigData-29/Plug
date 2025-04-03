document.addEventListener('DOMContentLoaded', function() {
    // 모달 요소
    const modal = document.getElementById('phone-model');
    const closeBtn = document.querySelector('.close-btn');
    const phoneList = document.getElementById('phone-list');

    // 필터 요소
    const brandFilter = document.getElementById('brand-filter');
    const qualityFilter = document.getElementById('quality-filter');
    const statusFilter = document.getElementById('status-filter');
    const modelFilter = document.getElementById('model-filter');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const sortBy = document.getElementById('sort-by');
    const filterBtn = document.getElementById('filter-btn');

    // 모달 닫기
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 검색 버튼 클릭 시 서버로 요청
    filterBtn.addEventListener('click', searchPhones);

    // 상품 클릭 이벤트 바인딩 (이벤트 위임)
    phoneList.addEventListener('click', function(e) {
        const phoneItem = e.target.closest('.phone-item');
        if (phoneItem) {
            const phoneId = phoneItem.getAttribute('data-id');
            showPhoneDetails(phoneId);
        }
    });

    // 검색 및 필터링
    function searchPhones() {
        const params = new URLSearchParams();
        params.append('page', 1);
        if (brandFilter.value) params.append('brand', brandFilter.value);
        if (qualityFilter.value) params.append('quality', qualityFilter.value);
        if (statusFilter.value) params.append('deal_status', statusFilter.value);
        if (modelFilter.value) params.append('model', modelFilter.value);
        if (priceMin.value) params.append('priceMin', priceMin.value);
        if (priceMax.value) params.append('priceMax', priceMax.value);
        if (sortBy.value) params.append('sortBy', sortBy.value);

        window.location.href = `${contextPath}/board?${params.toString()}`;
    }

    // 상품 상세 정보 보기
    async function showPhoneDetails(phoneId) {
        try {
            const phoneResponse = await fetch(`${contextPath}/getPhoneDetails.do?phoneId=${phoneId}`);
            if (!phoneResponse.ok) {
                throw new Error('상품 정보를 불러올 수 없습니다.');
            }
            const phone = await phoneResponse.json();

            const sellerResponse = await fetch(`${contextPath}/getUserInfo.do?userId=${phone.seller_id}`);
            if (!sellerResponse.ok) {
                throw new Error('판매자 정보를 불러올 수 없습니다.');
            }
            const seller = await sellerResponse.json();

            // 모달에 데이터 채우기
            document.getElementById('model-phone-name').textContent = `${phone.brand} ${phone.model}`;
            document.getElementById('model-phone-price').textContent = `${phone.price.toLocaleString()}원`;
            document.getElementById('model-seller-id').textContent = seller.user_nick || phone.seller_id;
            document.getElementById('model-phone-capacity').textContent = phone.capacity;
            document.getElementById('model-phone-color').textContent = phone.color;
            document.getElementById('model-phone-quality').textContent = phone.quality;
            document.getElementById('model-created-at').textContent = new Date(phone.created_at).toLocaleString();
            document.getElementById('model-deal-status').textContent = phone.deal_status === 'trading' ? '판매중' : '판매완료';
            document.getElementById('model-phone-memo').textContent = phone.memo || '없음';

            // 이미지 표시
            const imagesContainer = document.getElementById('phone-images');
            imagesContainer.innerHTML = '';
            [phone.phone_img1, phone.phone_img2, phone.phone_img3].forEach(img => {
                if (img) {
                    const imgElement = document.createElement('img');
                    imgElement.src = `${contextPath}${img}`;
                    imgElement.alt = `${phone.brand} ${phone.model} 이미지`;
                    imgElement.onerror = function() {
                        this.src = `${contextPath}/resources/images/default-phone.jpg`;
                    };
                    imagesContainer.appendChild(imgElement);
                }
            });

            // 버튼 이벤트 바인딩
            document.getElementById('add-favorite-btn').onclick = () => addToFavorite(phone.phone_idx);
            document.getElementById('start-chat-btn').onclick = () => startChat(phone.phone_idx, phone.seller_id);
            document.getElementById('buy-now-btn').onclick = () => buyNow(phone.phone_idx, phone.price);

            modal.style.display = 'block';
        } catch (error) {
            console.error('상품 상세 정보 로드 실패:', error);
            alert(error.message);
        }
    }

    // 찜하기 기능
    async function addToFavorite(phoneId) {
        if (!loginUser) {
            if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                window.location.href = `${contextPath}/login`;
            }
            return;
        }

        try {
            const response = await fetch(`${contextPath}/addFavorite.do`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `phoneId=${phoneId}&userId=${loginUser}`
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }

            const result = await response.json();

            if (result.success) {
                alert('상품을 찜 목록에 추가했습니다!');
            } else {
                throw new Error(result.message || '찜하기 실패');
            }
        } catch (error) {
            console.error('찜하기 실패:', error);
            alert(error.message);
        }
    }

    // 채팅 시작
    async function startChat(phoneId, sellerId) {
        if (!loginUser) {
            if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                window.location.href = `${contextPath}/login`;
            }
            return;
        }

        if (loginUser === sellerId) {
            alert('자신의 상품으로는 채팅을 시작할 수 없습니다.');
            return;
        }

        try {
            const title = encodeURIComponent(document.getElementById('model-phone-name').textContent + ' 거래');
            const response = await fetch(`${contextPath}/createChatroom.do`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `phoneId=${phoneId}&sellerId=${sellerId}&buyerId=${loginUser}&title=${title}`
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }

            const chatroom = await response.json();

            if (chatroom.success) {
                window.location.href = `${contextPath}/chat?roomId=${chatroom.croom_idx}`;
            } else {
                throw new Error(chatroom.message || '채팅방 생성 실패');
            }
        } catch (error) {
            console.error('채팅 시작 실패:', error);
            alert(error.message);
        }
    }

    // 바로 구매
    async function buyNow(phoneId, price) {
        if (!loginUser) {
            if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                window.location.href = `${contextPath}/login`;
            }
            return;
        }

        try {
            const payAmount = parseInt(price);
            const response = await fetch(`${contextPath}/buyPhone.do`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `phoneId=${phoneId}&userId=${loginUser}&payMethod=직거래&payAmount=${payAmount}`
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }

            const deal = await response.json();

            if (deal.success) {
                alert('구매가 완료되었습니다!');
                modal.style.display = 'none';
                window.location.reload();
            } else {
                throw new Error(deal.message || '구매 처리 실패');
            }
        } catch (error) {
            console.error('구매 실패:', error);
            alert(error.message);
        }
    }
});