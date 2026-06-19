// 画面インアニメーション
const targets = document.querySelectorAll('.js-fade-in-up');

const options = {
  root: null,
  rootMargin: '0px 0px -20% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, options);

targets.forEach(target => observer.observe(target));

// menuスライダーの初期化
document.addEventListener('DOMContentLoaded', () => {
    const featuresSwiper = new Swiper(".swiper-menu", {
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    console.log("Swiper初期化完了");
});