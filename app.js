// 頁面切換功能
document.addEventListener('DOMContentLoaded', function() {
    // 取得所有導航連結和頁面元素
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
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
    
    // 為導航連結添加點擊事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
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
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // 技能標籤動畫效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Intersection Observer 用於頁面元素動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 如果是統計數字，啟動動畫
                if (entry.target.classList.contains('stat-item')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.classList.contains('animated')) {
                        statNumber.classList.add('animated');
                        animateStatNumber(statNumber);
                    }
                }
            }
        });
    }, observerOptions);
    
    // 觀察所有 bento 卡片
    document.querySelectorAll('.bento-card, .stat-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 單個統計數字動畫
    function animateStatNumber(element) {
        const targetText = element.textContent;
        const target = parseInt(targetText);
        
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 40;
            const suffix = targetText.includes('+') ? '+' : '';
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + suffix;
            }, 40);
        }
    }
    
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
    
    // 平滑滾動到元素
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // 滑鼠移動時的視差效果
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const background = document.querySelector('.background');
        if (background) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            background.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
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
        
        .skill-tag {
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
