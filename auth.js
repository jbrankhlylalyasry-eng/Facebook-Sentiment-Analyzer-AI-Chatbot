// أحداث صفحة المصادقة
document.addEventListener('DOMContentLoaded', function() {
    // إذا كان المستخدم مسجلاً بالفعل، توجيه إلى صفحة المحادثة
    if (localStorage.getItem('currentUser') && window.location.pathname.includes('index.html')) {
        window.location.href = 'chat.html';
        return;
    }

    // أحداث التبويب في صفحة التسجيل/الدخول
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginTab && signupTab) {
        loginTab.addEventListener('click', function() {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            loginTab.classList.add('bg-white', 'shadow-lg', 'text-blue-600');
            signupTab.classList.remove('bg-white', 'shadow-lg', 'text-blue-600');
        });

        signupTab.addEventListener('click', function() {
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupTab.classList.add('bg-white', 'shadow-lg', 'text-blue-600');
            loginTab.classList.remove('bg-white', 'shadow-lg', 'text-blue-600');
        });
    }

    // حدث زر الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // محاكاة المصادقة
            const user = {
                id: 1,
                name: 'محمد أحمد',
                email: email,
                avatar: 'MA'
            };
            
            saveUserState(user);
            window.location.href = 'chat.html';
        });
    }

    // حدث زر إنشاء حساب
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (password !== confirmPassword) {
                alert('كلمات المرور غير متطابقة');
                return;
            }
            
            // محاكاة إنشاء حساب
            const user = {
                id: 1,
                name: username,
                email: email,
                avatar: username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase()
            };
            
            saveUserState(user);
            window.location.href = 'chat.html';
        });
    }

    // أحداث إظهار/إخفاء كلمة المرور
    const eyeButtons = document.querySelectorAll('button[type="button"]');
    eyeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                if (icon) {
                    icon.setAttribute('data-lucide', 'eye-off');
                    lucide.createIcons();
                }
            } else {
                input.type = 'password';
                if (icon) {
                    icon.setAttribute('data-lucide', 'eye');
                    lucide.createIcons();
                }
            }
        });
    });
});