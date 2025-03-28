document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('USER_ID').value.trim();
        const password = document.getElementById('USER_PW').value.trim();

        // 모든 필드가 입력되었는지 검증
        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요!');
            return;
        }

        // 로컬 스토리지에서 사용자 정보 확인
        const user = JSON.parse(localStorage.getItem('user_' + USER_ID));
        if (!user || user.password !== password) {
            alert('아이디 또는 비밀번호가 올바르지 않습니다!');
            return;
        }

        // 로그인 상태 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // 로그인 성공 메시지 및 마이페이지로 이동
        alert('로그인 성공!');
        window.location.href = 'mypage.html'; // 마이페이지로 이동
    });
});