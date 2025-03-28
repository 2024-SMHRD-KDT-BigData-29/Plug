document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('', (event) => {
        event.preventDefault();

        const user_id = document.getElementById('user_id').value.trim();
        const user_pw = document.getElementById('user_pw').value.trim();

        // 모든 필드가 입력되었는지 검증
        if (!user_id || !user_pw) {
            alert('아이디와 비밀번호를 모두 입력해주세요!');
            return;
        }

        // 로컬 스토리지에서 사용자 정보 확인
        const user = JSON.parse(localStorage.getItem('user_' + user_id));
        if (!user || user.user_pw !== user_pw) {
            alert('아이디 또는 비밀번호가 올바르지 않습니다!');
            return;
        }

        // 로그인 상태 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_id', user_id);

        // 로그인 성공 메시지 및 마이페이지로 이동
        alert('로그인 성공!');
        window.location.href = 'mypage.jsp'; // 마이페이지로 이동
    });
});