// 漢堡選單 JS
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}


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