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

// スライダー用の変数を初期化
let swiperMenu = null;
const mediaQuery = window.matchMedia('(max-width: 991px)');

const initSwiper = () => {
    // Swiperがまだ生成されていない場合のみ生成
    if (!swiperMenu) {
        swiperMenu = new Swiper('.swiper-menu', {
            loop: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
};

const destroySwiper = () => {
    // Swiperが存在する場合のみ破棄
    if (swiperMenu) {
        swiperMenu.destroy(true, true); // true, trueでスタイルもリセット
        swiperMenu = null;
    }
};

// 画面幅による切り替え判定
const handleBreakpoint = (e) => {
    if (e.matches) {
        // 991px以下のとき：スライダー有効
        initSwiper();
    } else {
        // 992px以上のとき：スライダー解除
        destroySwiper();
    }
};

// 初回実行と、画面幅変更時のリスナー登録
handleBreakpoint(mediaQuery);
mediaQuery.addEventListener('change', handleBreakpoint);