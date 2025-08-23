// 漢堡選單 JS
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

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
