// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지

        const username = document.getElementById('USER_ID').value.trim();
        const password = document.getElementById('USER_PW').value.trim();
        const nick = document.getElementById('USER_NICK').value.trim();
        const address = document.getElementById('USER_ADDR').value.trim();
        const account = document.getElementById('USER_ACCOUNT').value.trim();
        const phone = document.getElementById('USER_PHONE').value.trim();
        const birth = document.getElementById('USER_BIRTHDATE').value.trim();

        // 모든 필드가 입력되었는지 검증
        if (!username || !password || !nick || !address || !account || !phone || !join || !birth) {
            alert('모든 필드를 입력해주세요!');
            return;
        }
         // 아이디 중복 검사
         const existingUser = localStorage.getItem('user_' + username);
         if (existingUser) {
             alert('이미 사용 중인 아이디입니다!');
             return;
         }

        // 간단한 형식 검증
        // 이메일 형식 검증 (간단한 정규식)
        

        

        // 연락처 형식 검증 (간단한 정규식, 예: 010-0000-0000)
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            alert('연락처 형식을 확인해주세요! (예: 010-0000-0000)');
            return;
        }

        // 회원가입 성공 시 메시지 표시
        alert('회원가입이 완료되었습니다!');
        // 로컬 스토리지에 저장 (나중에 백엔드 연동 시 제거 가능)
        const user = { username, password, nick, address, account, phone , birth};
        localStorage.setItem('user_' + username, JSON.stringify(user));
        window.location.href = 'login.html';
    });
});