

// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 간단한 검증
        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요!');
            return;
        }

        // 로그인 성공 시 plug.jsp로 이동
        alert('로그인 성공!');
        window.location.href = 'PLUG.jsp'; 
    });
});

