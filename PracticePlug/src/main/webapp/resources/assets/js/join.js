// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지

        const user_id = document.getElementById('user_id').value.trim();
        const user_pw = document.getElementById('user_pw').value.trim();
        const user_nick = document.getElementById('user_nick').value.trim();
        const user_birthdate = document.getElementById('user_birthdate').value.trim();
        const user_phone = document.getElementById('user_phone').value.trim();
        const user_account = document.getElementById('user_account').value.trim();        
        const user_address = document.getElementById('user_address').value.trim();

        // 모든 필드가 입력되었는지 검증
        if (!user_nick || !user_pw || !user_id || !user_address || !user_birthdate || !user_phone) {
            alert('모든 필드를 입력해주세요!');
            return;
        }
         // 아이디 중복 검사
         const existingUser = localStorage.getItem('user_' + user_id);
         if (existingUser) {
             alert('이미 사용 중인 아이디입니다!');
             return;
         }

        // 간단한 형식 검증

        // 주민등록번호 형식 검증 (간단한 정규식, 예: 010123-1234567)
        const ssnRegex = /^\d{6}-\d{7}$/;
        if (!ssnRegex.test(user_birthDate)) {
            alert('주민등록번호 형식을 확인해주세요! (예: 010123-1234567)');
            return;
        }

        // 연락처 형식 검증 (간단한 정규식, 예: 010-0000-0000)
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
        if (!phoneRegex.test(user_phone)) {
            alert('연락처 형식을 확인해주세요! (예: 010-0000-0000)');
            return;
        }

        // 회원가입 성공 시 메시지 표시
        alert('회원가입이 완료되었습니다!');
        // 로컬 스토리지에 저장 (나중에 백엔드 연동 시 제거 가능)
        const user = { user_nick, user_pw, user_id, user_address, user_birthdate, user_phone };
        localStorage.setItem('user_' + user_nick, JSON.stringify(user));
        window.location.href = 'login.jsp';
    });
});