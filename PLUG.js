
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const viewBtn = document.getElementById('view-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const buyButton = card.querySelector('.view-btn');
        buyButton.addEventListener('click', () => {
            const href = buyButton.getAttribute('data-href');
            window.location.href = href;
        });
    });





    // 검색 기능 (실시간 검색)
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 조회 버튼 클릭 시 검색 결과 다시 보여주기
    viewBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 필터 버튼 기능
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성화된 버튼 스타일 변경
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 제품 목록을 배열로 변환
            const productsArray = Array.from(productCards);

            if (btn.textContent === '낮은순') {
                // 가격 낮은순 정렬
                productsArray.sort((a, b) => {
                    const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                    const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                    return priceA - priceB;
                });
            } else {
                // 기본(최근순) - 여기서는 원래 순서로 가정
                productsArray.sort((a, b) => {
                    return Array.from(productCards).indexOf(a) - Array.from(productCards).indexOf(b);
                });
            }

            // 정렬된 순서로 DOM에 다시 추가
            const productList = document.querySelector('.product-list');
            productList.innerHTML = '';
            productsArray.forEach(card => productList.appendChild(card));



        });
    });
    productCards.forEach(card =>{
        card.addEventListener('click',(event)=>{
            if (event.target.classList.contains('buy')){
                return;
            }
            const buybutton = card.querySelector('.buy');
            const url = buybutton.getAttribute('href');
            if(url){
                window.location.href = url;
                
                productsArray.forEach(card => {
                   const buyButton = card.querySelector('.view-btn');
                   buyButton.addEventListener('click', () => {
                       const href = buyButton.getAttribute('data-href');
                       window.location.href = href;
                   });
               });
            }
        })
    })
});