// إدارة التنقل بين الصفحات
const navigation = {
    // تحميل محتوى الصفحة
    loadPageContent: function(page) {
        // هنا يمكن إضافة منطق لتحميل المحتوى ديناميكيًا إذا لزم الأمر
        console.log(`Loading content for: ${page}`);
    },
    
    // تحديث حالة القائمة النشطة
    setActiveNavItem: function(page) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('bg-blue-50', 'text-blue-600');
            item.classList.add('text-gray-700', 'hover:bg-blue-50', 'hover:text-blue-600');
        });
        
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('bg-blue-50', 'text-blue-600');
            activeItem.classList.remove('text-gray-700', 'hover:bg-blue-50', 'hover:text-blue-600');
        }
    },
    
    // إدارة الشريط الجانبي للجوال
    initMobileSidebar: function() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const overlay = document.getElementById('overlay');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }
        
        // إغلاق الشريط الجانبي عند النقر على رابط
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                }
            });
        });
    },
    
    // تهيئة جميع وظائف التنقل
    init: function() {
        this.initMobileSidebar();
        
        // تحديث القائمة النشطة بناءً على الصفحة الحالية
        const currentPage = this.getCurrentPage();
        this.setActiveNavItem(currentPage);
        
        // إغلاق الشريط الجانبي عند تغيير حجم النافذة
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.getElementById('overlay');
                if (sidebar) sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    },
    
    // الحصول على الصفحة الحالية
    getCurrentPage: function() {
        const path = window.location.pathname;
        if (path.includes('chat.html')) return 'chat';
        if (path.includes('results.html')) return 'results';
        if (path.includes('settings.html')) return 'settings';
        if (path.includes('notifications.html')) return 'notifications';
        return 'dashboard';
    }
};

// تهيئة التنقل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    navigation.init();
});