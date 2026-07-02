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

// お知らせ一覧の「さらに見る」
document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;

    const listItems = newsList.querySelectorAll(':scope > li');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // 5件以下の場合はボタンを非表示にする
    if (listItems.length <= 5) {
        if (loadMoreBtn) loadMoreBtn.parentElement.style.display = 'none';
        return;
    }

    // 初期化実行（ボタンにも collapsed を付ける）
    const hideItems = () => {
        listItems.forEach((item, index) => {
            if (index >= 5) item.classList.add('d-none');
        });
        loadMoreBtn.innerHTML = 'さらに見る';
        loadMoreBtn.classList.add('collapsed'); // アイコンを下向きに
    };
    hideItems();

    // ボタンクリック時の挙動
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // collapsedクラスを持っているか（閉じているか）で判定
        const isCollapsed = loadMoreBtn.classList.contains('collapsed');

        if (isCollapsed) {
            // 開く処理
            listItems.forEach(item => item.classList.remove('d-none'));
            loadMoreBtn.innerHTML = 'もとに戻す';
            loadMoreBtn.classList.remove('collapsed'); // アイコンを上向きに
        } else {
            // 閉じる処理
            hideItems();
        }
    });
});

// ===============================
// Swiper管理
// ===============================
const swipers = {
    mobile: [],
    report: []
  };
  
  // ===============================
  // swiper-mobile初期化（スマホのみ）
  // ===============================
  const initMobileSwiper = () => {
  
    document.querySelectorAll('.swiper-mobile').forEach(el => {
  
      if (el.swiper) return;
  
      const area = el.closest('.swiper-area');
      if (!area) return;
  
      const swiper = new Swiper(el, {
  
        loop: true,
        spaceBetween: 30,
  
        navigation: {
          nextEl: area.querySelector('.swiper-button-next'),
          prevEl: area.querySelector('.swiper-button-prev'),
        },
  
        pagination: {
          el: area.querySelector('.swiper-pagination'),
          clickable: true,
        }
  
      });
  
      swipers.mobile.push(swiper);
  
    });
  
  };
  
  
  // ===============================
  // swiper-report初期化（常時有効）
  // ===============================
  const initReportSwiper = () => {
  
    document.querySelectorAll('.swiper-report').forEach(el => {
  
      if (el.swiper) return;
  
      const area = el.closest('.swiper-area');
      if (!area) return;
  
      const swiper = new Swiper(el, {
  
        slidesPerView: 1,
        spaceBetween: 24,
        watchOverflow: true,
  
        navigation: {
          nextEl: area.querySelector('.swiper-button-next'),
          prevEl: area.querySelector('.swiper-button-prev'),
        },
  
        pagination: {
          el: area.querySelector('.swiper-pagination'),
          clickable: true,
        }
  
      });
  
      swipers.report.push(swiper);
  
    });
  
  };
  
  
  // ===============================
  // swiper-mobile破棄（PC表示時）
  // ===============================
  const destroyMobileSwiper = () => {
  
    swipers.mobile.forEach(swiper => {
  
      const slides = swiper.el.querySelectorAll('.swiper-slide');
      const wrapper = swiper.el.querySelector('.swiper-wrapper');
  
      swiper.destroy(true, true);
  
      slides.forEach(slide => {
        slide.removeAttribute('style');
  
        slide.classList.remove(
          'swiper-slide-active',
          'swiper-slide-next',
          'swiper-slide-prev',
          'swiper-slide-visible',
          'swiper-slide-fully-visible'
        );
      });
  
      wrapper?.removeAttribute('style');
  
      swiper.el.classList.remove(
        'swiper-initialized',
        'swiper-horizontal',
        'swiper-backface-hidden'
      );
  
    });
  
    swipers.mobile.length = 0;
  
  };
  
  
  // ===============================
  // ブレークポイント処理
  // ===============================
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  
  const handleBreakpoint = (e) => {
  
    if (e.matches) {
  
      // スマホ
      initMobileSwiper();
      initReportSwiper();
  
    } else {
  
      // PC
      destroyMobileSwiper();
      initReportSwiper();
  
    }
  
  };
  
  
  // ===============================
  // 初期化
  // ===============================
  window.addEventListener('load', () => {
  
    handleBreakpoint(mediaQuery);
  
    mediaQuery.addEventListener('change', handleBreakpoint);
  
  });