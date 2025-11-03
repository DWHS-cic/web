document.addEventListener("DOMContentLoaded", function () {
  /* ===== 導覽列選單 ===== */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navToggle.click();
      }
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      }
    });
  }

  /* ===== Timeline 滾動動畫 ===== */
  const items = document.querySelectorAll(".timeline-item .content");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("show"));
  }

  /* ===== 無縫跑馬燈 ===== */
  const track = document.getElementById("track-multi");
  if (track) {
    let speed = 1;
    let scrollPos = 0;
    track.innerHTML += track.innerHTML;

    function animate() {
      scrollPos += speed;
      if (scrollPos >= track.scrollWidth / 2) scrollPos = 0;
      track.style.transform = `translateX(-${scrollPos}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ===== 課程照片互動：滑鼠到照片上在原地輪播，離開回到預設（不顯示浮動預覽） ===== */
  document.querySelectorAll(".course_img").forEach((container) => {
    const slidesRaw = container.dataset.slides || "";
    const slides = slidesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!slides.length) return; // 無 slides 時跳過

    // 找到主要顯示的 <img>（帶 .main-img 或第一個 img）
    const mainImg =
      container.querySelector(".main-img") || container.querySelector("img");
    if (!mainImg) return;

    const defaultSrc = mainImg.getAttribute("src");
    // 嘗試找出 default 在 slides 的索引，否則預設為 0
    let defaultIndex = slides.indexOf(defaultSrc);
    if (defaultIndex === -1) defaultIndex = 0;

    // 當滑鼠進入：開始在原地輪播 slides
    let hoverInterval = null;
    let currentIndex = defaultIndex;

    const startHoverCycle = () => {
      if (hoverInterval) return;
      // 從下一張開始輪播
      currentIndex = (defaultIndex + 1) % slides.length;
      mainImg.src = slides[currentIndex];
      // 每 1500ms 換下一張
      hoverInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        mainImg.src = slides[currentIndex];
      }, 1500);
    };

    const stopHoverCycle = () => {
      if (hoverInterval) {
        clearInterval(hoverInterval);
        hoverInterval = null;
      }
      // 還原到預設圖片
      mainImg.src = defaultSrc;
    };

    // 綁定事件（桌面）
    container.addEventListener("mouseenter", startHoverCycle);
    container.addEventListener("mouseleave", stopHoverCycle);

    // 支援觸控：按住啟動輪播，放開停止還原
    container.addEventListener(
      "touchstart",
      (e) => {
        startHoverCycle();
      },
      { passive: true }
    );
    container.addEventListener("touchend", stopHoverCycle);
    container.addEventListener("touchcancel", stopHoverCycle);
  });
});
