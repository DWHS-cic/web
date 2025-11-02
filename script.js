// 導覽列選單
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    // 點擊漢堡按鈕開關選單
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // 支援鍵盤使用者
    navToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
      }
    });

    // 點擊選單連結時自動關閉選單
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // 點擊選單外部時關閉選單
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }
});

// Timeline 滾動動畫
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.timeline-item .content');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.2 });
    items.forEach(item => observer.observe(item));
  } else {
    // 不支援 IntersectionObserver 時直接顯示
    items.forEach(item => item.classList.add('show'));
  }
});


const track = document.getElementById('track-multi');
let speed = 1; // 每次移動 px
let scrollPos = 0;

function animate() {
  scrollPos += speed;
  if(scrollPos >= track.scrollWidth / 2) {
    scrollPos = 0;
  }
  track.style.transform = `translateX(-${scrollPos}px)`;
  requestAnimationFrame(animate);
}

// 複製一次內容，用於無縫循環
track.innerHTML += track.innerHTML;
animate();

const tlItems = document.querySelectorAll('.timeline-item .content');

const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');     // 滾動到視窗 → 顯示
    } else {
      entry.target.classList.remove('show');  // 滾出視窗 → 隱藏
    }
  });
}, { threshold: -0.1}); // 20% 進入視窗觸發

tlItems.forEach(item => tlObserver.observe(item));
