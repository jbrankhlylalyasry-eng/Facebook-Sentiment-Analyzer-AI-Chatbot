// تهيئة أيقونات Lucide
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// إدارة حالة التطبيق
const appState = {
    currentUser: null,
    isSidebarOpen: false,
    currentPage: 'auth'
};

// حفظ حالة المستخدم في localStorage
function saveUserState(user) {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        appState.currentUser = user;
        updateUserInfo();
    }
}

// تحميل حالة المستخدم من localStorage
function loadUserState() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        appState.currentUser = JSON.parse(userData);
        updateUserInfo();
        return appState.currentUser;
    }
    return null;
}

// تحديث معلومات المستخدم في الواجهة
function updateUserInfo() {
    const user = appState.currentUser;
    if (user) {
        const userElements = document.querySelectorAll('.user-name, .user-email, .user-avatar');
        userElements.forEach(element => {
            if (element.classList.contains('user-name')) {
                element.textContent = user.name;
            } else if (element.classList.contains('user-email')) {
                element.textContent = user.email;
            } else if (element.classList.contains('user-avatar')) {
                element.textContent = user.avatar;
            }
        });
    }
}

// التحقق من تسجيل الدخول
function checkAuth() {
    const user = loadUserState();
    const currentPage = window.location.pathname;
    
    // إذا لم يكن المستخدم مسجلاً وكان يحاول الوصول إلى صفحة محمية
    if (!user && !currentPage.includes('index.html') && currentPage !== '/') {
        window.location.href = 'index.html';
        return false;
    }
    
    // إذا كان المستخدم مسجلاً وكان في صفحة المصادقة، توجيه إلى الصفحة الرئيسية
    if (user && currentPage.includes('index.html')) {
        window.location.href = 'chat.html';
        return false;
    }
    
    return true;
}

// تسجيل الخروج
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        appState.currentUser = null;
        window.location.href = 'index.html';
    }
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initIcons();
    
    // إذا لم تكن في صفحة المصادقة، تحقق من حالة المصادقة
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
    
    // تحديث معلومات المستخدم إذا كان مسجلاً
    updateUserInfo();
});
