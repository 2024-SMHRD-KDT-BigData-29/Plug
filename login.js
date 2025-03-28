document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        console.log('login-form found');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userId = document.getElementById('USER_ID').value.trim();
            const userPw = document.getElementById('USER_PW').value.trim();

            console.log('userId:', userId);
            console.log('userPw:', userPw);

            if (!userId || !userPw) {
                alert('아이디와 비밀번호를 모두 입력해주세요.');
                return;
            }

            // 로컬 스토리지 키를 'user_' + userId로 조회
            const storedUser = localStorage.getItem('user_' + userId);
            console.log('Stored user:', storedUser);

            if (!storedUser) {
                alert('존재하지 않는 사용자입니다. 회원가입을 먼저 진행해주세요.');
                return;
            }

            const userData = JSON.parse(storedUser);
            console.log('Parsed userData:', userData);

            // userData에서 password 필드 사용
            if (userData.password !== userPw) {
                alert('비밀번호가 틀렸습니다. 다시 확인해주세요.');
                return;
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', userId);

            alert('로그인 성공!');
            window.location.href = 'mypage.html';
        });
    } else {
        console.error('login-form not found');
    }
});