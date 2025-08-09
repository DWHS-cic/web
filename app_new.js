// 頁面切換功能
document.addEventListener('DOMContentLoaded', function() {
    // 取得所有導航連結和頁面元素
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const activityItems = document.querySelectorAll('.activity-item.clickable');
    
    // 頁面切換函數
    function switchPage(targetPage) {
        // 隱藏所有頁面
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 移除所有導航連結的 active 狀態
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // 顯示目標頁面
        const targetPageElement = document.getElementById(targetPage + '-page');
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
        
        // 為對應的導航連結添加 active 狀態
        const activeLink = document.querySelector(`[data-page="${targetPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // 滾動到頁面頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // 活動詳細頁面切換函數
    function switchToActivity(activityType) {
        // 先切換到活動頁面
        switchPage('activities');
        
        // 等待頁面切換完成後滾動到對應活動
        setTimeout(() => {
            const targetCard = document.querySelector(`[data-activity="${activityType}"]`);
            if (targetCard && targetCard.classList.contains('activity-detail-card')) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // 添加突出效果
                targetCard.style.transform = 'scale(1.02)';
                targetCard.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                
                setTimeout(() => {
                    targetCard.style.transform = '';
                    targetCard.style.boxShadow = '';
                }, 2000);
            }
        }, 300);
    }
    
    // 為導航連結添加點擊事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
    
    // 為活動項目添加點擊事件
    activityItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const activityType = this.getAttribute('data-activity');
            switchToActivity(activityType);
        });
    });
    
    // 初始化：設定首頁為 active
    switchPage('home');
    
    // 統計數字動畫效果
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const targetText = number.textContent;
            const target = parseInt(targetText);
            
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                const suffix = targetText.includes('+') ? '+' : '';
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current) + suffix;
                }, 30);
            }
        });
    }
    
    // 當切換到成員頁面時啟動數字動畫
    const membersLink = document.querySelector('[data-page="members"]');
    if (membersLink) {
        membersLink.addEventListener('click', function() {
            setTimeout(animateNumbers, 500);
        });
    }
    
    // 滾動效果：導航列背景變化
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.2)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // 隱藏/顯示導航列
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 卡片懸停效果增強
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('activity-item')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('activity-item')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
    });
    
    // 技能標籤動畫效果
    const skillTags = document.querySelectorAll('.skill-tag, .topic-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // 響應式導航選單
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            let menuToggle = document.querySelector('.menu-toggle');
            
            if (!menuToggle) {
                menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: block;
                    padding: 0.5rem;
                `;
                navContainer.appendChild(menuToggle);
                
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
                });
            }
            
            // 點擊導航連結後關閉選單
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (menuToggle) {
                        menuToggle.innerHTML = '☰';
                    }
                });
            });
        } else {
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
            }
            navMenu.classList.remove('active');
        }
    }
    
    // 視窗大小改變時重新檢查
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // 添加自定義樣式
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: all 0.3s ease;
        }
        
        .menu-toggle {
            display: none;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block !important;
            }
            
            .nav-menu {
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                display: flex !important;
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .skill-tag, .topic-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .bento-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .activity-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-item, .achievement-item, .project-item, .event-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
    
    // 頁面載入完成後觸發動畫
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 實用工具函數
const utils = {
    // 防抖函數
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 節流函數
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 隨機數生成
    random: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // 線性插值
    lerp: function(start, end, factor) {
        return start + (end - start) * factor;
    }
};
