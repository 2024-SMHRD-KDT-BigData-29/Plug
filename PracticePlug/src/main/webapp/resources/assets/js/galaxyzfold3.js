// iphone15promax.js
document.addEventListener('DOMContentLoaded', () => {
    // 제품 데이터 정의 (등급별 가격 포함)
    const product = {
        name: 'SAMSUNG galaxy Z Fold 4  ',
        capacity: '128GB',
        price: '1,998,700원',
        image: 'images/galaxyfold3.jpg',
        grades: {
            SS: '1,998,700원',
            S: '1,500,000원',
            A: '1,300,000원',
            B: '1,000,000원'
        }
    };

    // 등급별 가격 표시
    const gradePrice = document.querySelector('.grade-price');
    gradePrice.textContent = `등급별 ${product.name} ${product.capacity}`;

    // 등급 선택 버튼
    const gradeButtons = document.querySelectorAll('.grade-btn');
    let selectedGrade = null;

    gradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 이전 선택 해제
            gradeButtons.forEach(btn => btn.classList.remove('active'));
            // 현재 버튼 선택
            button.classList.add('active');
            selectedGrade = button.getAttribute('data-grade');
            // 선택된 등급에 따라 가격 업데이트
            document.querySelector('.price').textContent = product.grades[selectedGrade];
        });
    });

    // 구매하기 버튼 클릭
    const buyButton = document.querySelector('.buy');
    buyButton.addEventListener('click', () => {
        if (!selectedGrade) {
            alert('등급을 선택해주세요.');
            return;
        }

        // 선택된 등급에 따른 가격 (숫자만 추출)
        const selectedPrice = product.grades[selectedGrade].replace(/[^0-9]/g, '');

        // trade.html로 이동하며 상품 정보 전달
        window.location.href = `trade?sellerId=${product.sellerId}&sellerName=${product.sellerName}&productName=${encodeURIComponent(product.name)}&capacity=${product.capacity}&price=${selectedPrice}&color=블랙&condition=${selectedGrade}`;
    });
 // 찜 버튼 클릭
 const wishlistBtn = document.getElementById('wishlist-btn');
 if (wishlistBtn) {
     wishlistBtn.addEventListener('click', () => {
         const username = localStorage.getItem('username');
         const isLoggedIn = localStorage.getItem('isLoggedIn');

         console.log('addToWishlist - username:', username);
         console.log('addToWishlist - isLoggedIn:', isLoggedIn);
         console.log('addToWishlist - product:', product);

         if (!isLoggedIn || !username) {
             alert('로그인이 필요합니다!');
             window.location.href = 'login';
             return;
         }

         let wishlist = JSON.parse(localStorage.getItem('wishlist_' + username)) || [];
        // 중복 여부 확인 없이 항상 추가
        wishlist.push(product);
        alert('상품이 찜 목록에 추가되었습니다.');

        // 로컬 스토리지에 저장
        localStorage.setItem('wishlist_' + username, JSON.stringify(wishlist));
        console.log('wishlist updated:', wishlist);

       
    });
} else {
    console.error('wishlist-btn element not found');
}
});   