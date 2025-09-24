// بيانات المحادثة
const chatData = {
    messages: [
        {
            id: 1,
            content: '🎉 أهلاً وسهلاً! أنا مساعدك الذكي لتحليل مشاعر فيسبوك.\n\nاختر أحد الخيارات:\n\n1️⃣ تحليل صفحة فيسبوك\n2️⃣ تحليل منشور محدد\n3️⃣ عرض التقارير السابقة',
            sender: 'bot',
            timestamp: new Date()
        }
    ]
};

// إضافة رسالة جديدة
function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageId = Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex justify-${sender === 'user' ? 'end' : 'start'}`;
    
    messageDiv.innerHTML = `
        <div class="flex items-start space-x-3 space-x-reverse max-w-2xl ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}">
            <div class="w-8 h-8 rounded-full flex items-center justify-center ${sender === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}">
                ${sender === 'user' ? 
                    '<i data-lucide="user" class="text-white w-4 h-4"></i>' : 
                    '<i data-lucide="bot" class="text-white w-4 h-4"></i>'
                }
            </div>
            <div class="${sender === 'user' ? 'bg-blue-500 text-white message-user' : 'bg-white border border-gray-200 message-bot'} p-3 md:p-4">
                <p class="whitespace-pre-line text-sm md:text-base">${content}</p>
                <span class="text-xs mt-2 block ${sender === 'user' ? 'text-blue-100' : 'text-gray-500'}">
                    ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // التمرير إلى الأسفل
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // تحديث الأيقونات
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// معالجة إدخال المحادثة
function handleChatInput(message) {
    addMessage(message, 'user');
    
    // محاكاة استجابة البوت
    setTimeout(() => {
        let response = '';
        
        if (message.includes('1')) {
            response = 'ممتاز! 🌟\n\n• أدخل رابط الصفحة:\n• حدد الفترة الزمنية:\n• عدد المنشورات للتحليل:';
        } else if (message.includes('2')) {
            response = 'رائع! 📱\n\n• أدخل رابط المنشور:\n• حدد عدد التعليقات للتحليل:';
        } else if (message.includes('3')) {
            response = 'ها هي تقاريرك السابقة: 📊\n\n1. تحليل صفحة متجر إلكتروني\n2. تحليل حملة تسويقية\n3. تحليل ردود العملاء';
        } else {
            response = 'أحتاج إلى مزيد من المعلومات لمساعدتك. 🧐\n\nاختر من الخيارات السابقة أو اطرح سؤالك المحدد.';
        }
        
        addMessage(response, 'bot');
    }, 1000);
}

// أحداث صفحة المحادثة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الرسائل السابقة
    chatData.messages.forEach(msg => {
        addMessage(msg.content, msg.sender);
    });
    
    // حدث إرسال الرسالة
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('message-input');
            const message = input.value.trim();
            
            if (message) {
                handleChatInput(message);
                input.value = '';
            }
        });
    }
    
    // أحداث الشريط الجانبي للجوال
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('overlay');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            } else {
                sidebar.classList.add('open');
                overlay.classList.add('active');
            }
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
    
    // تحديث معلومات المستخدم في الشريط الجانبي
    const user = loadUserState();
    if (user) {
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-name');
        const userEmail = document.querySelector('.user-email');
        
        if (userAvatar) userAvatar.textContent = user.avatar;
        if (userName) userName.textContent = user.name;
        if (userEmail) userEmail.textContent = user.email;
    }
    
    // إغلاق الشريط الجانبي عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        }
    });
});
